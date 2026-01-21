import React, { useState, useMemo, useEffect } from 'react';
import { Smile, Meh, Frown, CloudRain, Sun, Zap, Save, Calendar, BarChart2, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './Journal.css';

const MOODS = [
    { id: 'happy', label: 'Happy', icon: Smile, color: '#FFD54F' },
    { id: 'calm', label: 'Calm', icon: Sun, color: '#81C784' },
    { id: 'neutral', label: 'Okay', icon: Meh, color: '#90A4AE' },
    { id: 'sad', label: 'Sad', icon: CloudRain, color: '#9FA8DA' },
    { id: 'stressed', label: 'Stressed', icon: Zap, color: '#E57373' },
    { id: 'upset', label: 'Upset', icon: Frown, color: '#FF8A65' },
];

const Journal = () => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [entry, setEntry] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    // Load from local storage on initial render
    const [savedEntries, setSavedEntries] = useState(() => {
        try {
            const saved = localStorage.getItem('journal_entries');
            if (saved) {
                return JSON.parse(saved).map(e => ({ ...e, date: new Date(e.date) }));
            }
        } catch (error) {
            console.error('Failed to parse journal entries:', error);
        }
        return [];
    });

    // Save to local storage whenever entries change
    useEffect(() => {
        localStorage.setItem('journal_entries', JSON.stringify(savedEntries));
    }, [savedEntries]);

    const handleSave = () => {
        if (!selectedMood && !entry.trim()) return;

        const newEntry = {
            id: Date.now(),
            mood: selectedMood,
            text: entry,
            date: new Date(),
        };

        setSavedEntries([newEntry, ...savedEntries]);
        setEntry('');
        setSelectedMood(null);

        // Show saved feedback
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const chartData = useMemo(() => {
        const counts = {};
        MOODS.forEach(m => counts[m.label] = 0);
        savedEntries.forEach(e => {
            const moodDef = MOODS.find(m => m.id === e.mood);
            if (moodDef) counts[moodDef.label] += 1;
        });
        return MOODS.map(m => ({
            name: m.label,
            count: counts[m.label],
            color: m.color
        })).filter(d => d.count > 0);
    }, [savedEntries]);

    return (
        <div className="journal-page container">
            <header className="journal-header">
                <h1>Mood Journal</h1>
                <p className="subtitle">How are you feeling right now?</p>
            </header>

            <section className="mood-selector">
                {MOODS.map((mood) => {
                    const Icon = mood.icon;
                    const isSelected = selectedMood === mood.id;
                    return (
                        <button
                            key={mood.id}
                            className={`mood-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedMood(mood.id)}
                            style={{ '--mood-color': mood.color }}
                        >
                            <div className="icon-wrapper">
                                <Icon size={32} />
                            </div>
                            <span className="mood-label">{mood.label}</span>
                        </button>
                    );
                })}
            </section>

            <section className="entry-section">
                <textarea
                    className="journal-textarea"
                    placeholder="Write down your thoughts... (What made you feel this way?)"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                />
                <button
                    className={`btn-primary save-btn ${isSaved ? 'saved' : ''}`}
                    onClick={handleSave}
                    disabled={(!selectedMood && !entry.trim()) || isSaved}
                >
                    {isSaved ? <Check size={20} /> : <Save size={20} />}
                    {isSaved ? 'Saved!' : 'Save Entry'}
                </button>
            </section>

            {savedEntries.length > 0 && (
                <>
                    <section className="insights-section">
                        <h2><BarChart2 size={20} /> Mood Insights</h2>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <section className="history-section">
                        <h2>Recent Entries</h2>
                        <div className="entries-list">
                            {savedEntries.map((item) => {
                                const moodDef = MOODS.find(m => m.id === item.mood);
                                const MoodIcon = moodDef ? moodDef.icon : Meh;

                                return (
                                    <div key={item.id} className="entry-card">
                                        <div className="entry-header">
                                            <div className="entry-meta">
                                                <Calendar size={14} />
                                                <span>{item.date.toLocaleDateString()} • {item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            {moodDef && (
                                                <div className="entry-mood" style={{ color: moodDef.color }}>
                                                    <MoodIcon size={16} />
                                                    <span>{moodDef.label}</span>
                                                </div>
                                            )}
                                        </div>
                                        {item.text && <p className="entry-text">{item.text}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default Journal;
