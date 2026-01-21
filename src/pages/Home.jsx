import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Wind, BookHeart, Zap, ArrowRight, Anchor } from 'lucide-react';
import './Home.css';

const Home = () => {
    const [greeting, setGreeting] = useState('Hello');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    return (
        <div className="home-page container page-enter">
            <section className="hero">
                <span className="greeting-pill fade-in">{greeting}, Friend</span>
                <h1 className="hero-title fade-in" style={{ animationDelay: '0.1s' }}>
                    How are you feeling right now?
                </h1>
                <p className="subtitle fade-in" style={{ animationDelay: '0.2s' }}>
                    It's okay to not be okay. I'm here to listen and support you, without judgment.
                </p>

                <div className="hero-buttons fade-in" style={{ animationDelay: '0.3s' }}>
                    <Link to="/chat" className="btn-primary hero-btn">
                        <MessageCircle size={20} />
                        Chat with AI
                    </Link>

                    <Link to="/exercises" className="panic-btn">
                        Panic Attack Support
                    </Link>
                </div>
            </section>

            <section className="quick-actions fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="section-header">
                    <h2>Quick Support</h2>
                </div>

                <div className="action-grid">
                    <Link to="/exercises" className="card action-card">
                        <div className="icon-box calm">
                            <Wind size={24} />
                        </div>
                        <div className="card-content">
                            <h3>Breathe</h3>
                            <p>2-min grounding exercise</p>
                        </div>
                        <div className="card-arrow">
                            <ArrowRight size={16} />
                        </div>
                    </Link>

                    <Link to="/journal" className="card action-card">
                        <div className="icon-box warm">
                            <BookHeart size={24} />
                        </div>
                        <div className="card-content">
                            <h3>Journal</h3>
                            <p>Write your thoughts</p>
                        </div>
                        <div className="card-arrow">
                            <ArrowRight size={16} />
                        </div>
                    </Link>

                    <Link to="/grounding" className="card action-card">
                        <div className="icon-box grounding">
                            <Anchor size={24} />
                        </div>
                        <div className="card-content">
                            <h3>Focus</h3>
                            <p>Find your center</p>
                        </div>
                        <div className="card-arrow">
                            <ArrowRight size={16} />
                        </div>
                    </Link>
                </div>
            </section>

            <section className="quote-section fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="quote-card">
                    <blockquote>
                        "You don't have to control your thoughts. You just have to stop letting them control you."
                    </blockquote>
                </div>
            </section>
        </div>
    );
};

export default Home;
