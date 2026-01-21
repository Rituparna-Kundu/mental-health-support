import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello. I'm here for you. How are you feeling right now?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setIsListening(false);
                handleSend(transcript, 'voice');
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Local Logic for Safety High-Priority Checks
    const checkSafety = (input) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('die') || lowerInput.includes('kill') || lowerInput.includes('suicide') || lowerInput.includes('hurt myself')) {
            return {
                isCrisis: true,
                text: "I hear that you're in a lot of pain right now. Please know that you're not alone. If you're safe to do so, could you call 988 or reach out to someone you trust? I'm here to listen, but I want to make sure you're safe."
            };
        }
        return null;
    };

    const handleSend = async (e, source = 'text') => {
        if (e && typeof e !== 'string') e.preventDefault();
        const textToSend = source === 'voice' ? e : inputText;

        if (!textToSend.trim()) return;

        // Add User Message
        const newUserMsg = {
            id: Date.now(),
            text: textToSend,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');
        setIsLoading(true);

        // Safety Check First
        const safetyResult = checkSafety(textToSend);
        if (safetyResult) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: safetyResult.text,
                    sender: 'ai',
                    isCrisis: true,
                    timestamp: new Date()
                }]);
                setIsLoading(false);
            }, 500);
            return;
        }

        // Call Gemini API (New SDK)
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error("Missing API Key");
            }

            // New SDK Setup
            const ai = new GoogleGenAI({ apiKey: apiKey });

            const prompt = `You are a compassionate, empathetic mental health support companion context aware. 
            Do not offer medical advice. Keep responses warm, conversational, and short (max 2 sentences).
            The user said: "${textToSend}"`;

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
            });

            // Note: response.text might be a getter or response.text() depending on SDK version. 
            // The user's snippet showed: console.log(response.text);
            // I will inspect if it's .text() (legacy/standard) or .text property.
            // The snippet snippet says: console.log(response.text); -> implies property.

            const aiText = response.text || (typeof response.text === 'function' ? response.text() : JSON.stringify(response));

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: aiText,
                sender: 'ai',
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error("Gemini 3 Error:", error);

            let errorMsg = "I'm having a little trouble connecting to the new model right now.";
            if (error.message.includes("API Key")) {
                errorMsg = "Configuration Error: API Key is missing.";
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: errorMsg + " (Check console for details)",
                sender: 'ai',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-page container page-enter">
            <div className="chat-history">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-row ${msg.sender}`}>
                        {msg.sender === 'ai' && (
                            <div className="avatar ai">
                                <Bot size={20} />
                            </div>
                        )}

                        <div className={`message-bubble ${msg.sender} ${msg.isCrisis ? 'crisis' : ''}`}>
                            <div className="bubble-content">{msg.text}</div>
                            <span className="timestamp">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        {msg.sender === 'user' && (
                            <div className="avatar user">
                                <User size={20} />
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="message-row ai">
                        <div className="avatar ai"><Bot size={20} /></div>
                        <div className="message-bubble ai typing-indicator">
                            <span>...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <form onSubmit={handleSend} className="input-form">
                    <button
                        type="button"
                        className={`mic-btn ${isListening ? 'listening' : ''}`}
                        onClick={toggleListening}
                        title="Press to speak"
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>

                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type or say how you feel..."
                        className="text-input"
                        disabled={isLoading}
                    />

                    <button type="submit" className="send-btn" disabled={!inputText.trim() || isLoading}>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
