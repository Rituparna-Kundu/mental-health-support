import React from 'react';
import { Phone, Heart, Globe, ShieldAlert, ExternalLink, ArrowRight } from 'lucide-react';
import './Resources.css';

const Resources = () => {
    return (
        <div className="resources-page container page-enter">
            <header className="resources-header">
                <div className="header-icon-box">
                    <ShieldAlert size={32} />
                </div>
                <h1>Crisis Support</h1>
                <p className="subtitle">You are not alone. Professional help is available 24/7.</p>
            </header>

            <div className="emergency-banner">
                <div className="banner-icon">
                    <ShieldAlert size={24} />
                </div>
                <div className="banner-content">
                    <h2>Immediate Danger?</h2>
                    <p>If you or someone else is in immediate danger, please call emergency services (<strong>911</strong> in US) or go to the nearest emergency room immediately.</p>
                </div>
            </div>

            <section className="resource-grid">
                <div className="resource-card primary">
                    <div className="card-top">
                        <div className="card-icon">
                            <Phone size={24} />
                        </div>
                        <h2>988 Lifeline</h2>
                    </div>
                    <p>Suicide & Crisis Lifeline providing 24/7, free and confidential support.</p>
                    <a href="tel:988" className="contact-btn">
                        Call 988
                        <ArrowRight size={18} />
                    </a>
                </div>

                <div className="resource-card">
                    <div className="card-top">
                        <div className="card-icon blue">
                            <Heart size={24} />
                        </div>
                        <h2>Crisis Text Line</h2>
                    </div>
                    <p>Text HOME to 741741 to connect with a crisis counselor.</p>
                    <a href="sms:741741&body=HOME" className="contact-btn secondary">
                        Text 741741
                        <ArrowRight size={18} />
                    </a>
                </div>

                <div className="resource-card">
                    <div className="card-top">
                        <div className="card-icon purple">
                            <Globe size={24} />
                        </div>
                        <h2>Find A Helpline</h2>
                    </div>
                    <p>Directory of international mental health helplines.</p>
                    <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className="contact-btn outline">
                        Visit Website
                        <ExternalLink size={16} />
                    </a>
                </div>
            </section>

            <section className="safety-disclaimer">
                <h3>Important Note</h3>
                <p>
                    This application is an AI-powered support tool, <strong>not a replacement for professional mental health care</strong>.
                    The AI cannot diagnose or treat mental health conditions.
                </p>
            </section>
        </div>
    );
};

export default Resources;
