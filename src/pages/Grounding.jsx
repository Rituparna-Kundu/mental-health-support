import React, { useState } from 'react';
import { ArrowLeft, Eye, Hand, Ear, Sparkles, Smile, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Grounding = () => {
    const [step, setStep] = useState('intro'); // intro, 5, 4, 3, 2, 1, finish

    const renderContent = () => {
        switch (step) {
            case 'intro':
                return (
                    <>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: '#E8F5E9', color: '#2E7D32',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Sparkles size={40} />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>5-4-3-2-1 Technique</h2>
                        <p style={{ marginBottom: '2rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                            This exercise helps you connect with the present moment by using your five senses.
                            It enables you to move through difficult or stressful moments.
                        </p>
                        <button
                            onClick={() => setStep('5')}
                            className="btn-primary"
                            style={{
                                width: '100%', maxWidth: '200px', padding: '12px 24px',
                                fontSize: '1.1rem', cursor: 'pointer', border: 'none',
                                borderRadius: '30px', background: 'var(--color-primary)', color: 'white',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            Start Exercise <ArrowRight size={20} />
                        </button>
                    </>
                );
            case '5':
                return (
                    <StepCard
                        icon={<Eye size={32} />}
                        number="5"
                        title="Things you can see"
                        instruction="Look around you. Notice 5 things you can see right now."
                        onNext={() => setStep('4')}
                        color="#81C784"
                    />
                );
            case '4':
                return (
                    <StepCard
                        icon={<Hand size={32} />}
                        number="4"
                        title="Things you can feel"
                        instruction="Notice 4 things you can feel. The fabric of your clothes, the chair, or the air on your skin."
                        onNext={() => setStep('3')}
                        color="#64B5F6"
                    />
                );
            case '3':
                return (
                    <StepCard
                        icon={<Ear size={32} />}
                        number="3"
                        title="Things you can hear"
                        instruction="Listen carefully. Name 3 things you can hear in your environment."
                        onNext={() => setStep('2')}
                        color="#FFB74D"
                    />
                );
            case '2':
                return (
                    <StepCard
                        icon={<Sparkles size={32} />} // Using Sparkles as generic smell icon or Flower/Wind if available
                        number="2"
                        title="Things you can smell"
                        instruction="Notice 2 things you can smell. Or, name 2 smells you enjoy."
                        onNext={() => setStep('1')}
                        color="#BA68C8"
                    />
                );
            case '1':
                return (
                    <StepCard
                        icon={<Smile size={32} />} // Using Smile for taste/positive
                        number="1"
                        title="Thing you can taste"
                        instruction="Notice 1 thing you can taste. Or, think of 1 thing you like about yourself."
                        onNext={() => setStep('finish')}
                        color="#F06292"
                    />
                );
            case 'finish':
                return (
                    <>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: '#E0F2F1', color: '#00695C',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Smile size={40} />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Well done</h2>
                        <p style={{ marginBottom: '2rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                            Take a deep breath. You are here, and you are safe.
                        </p>
                        <button
                            onClick={() => setStep('intro')}
                            style={{
                                background: 'transparent',
                                border: '2px solid var(--color-primary)',
                                color: 'var(--color-primary)',
                                padding: '10px 24px',
                                borderRadius: '30px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <RotateCcw size={18} /> Repeat
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container page-enter" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontWeight: 500, textDecoration: 'none' }}>
                <ArrowLeft size={20} />
                Back to Home
            </Link>

            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Focus System</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Reconnect with the present moment.</p>
            </header>

            <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                padding: '3rem 2rem',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center',
                transition: 'all 0.3s ease'
            }}>
                {renderContent()}
            </div>
        </div>
    );
};

const StepCard = ({ icon, number, title, instruction, onNext, color }) => (
    <div className="step-card fade-in">
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: `${color}20`, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative'
            }}>
                {icon}
                <span style={{
                    position: 'absolute', top: -5, right: -5,
                    background: color, color: 'white',
                    width: '24px', height: '24px', borderRadius: '50%',
                    fontSize: '0.8rem', fontWeight: 'bold',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{number}</span>
            </div>
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>{title}</h2>
        <p style={{ marginBottom: '2.5rem', lineHeight: '1.6', fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
            {instruction}
        </p>
        <button
            onClick={onNext}
            style={{
                width: '100%', maxWidth: '160px', padding: '12px',
                fontSize: '1rem', cursor: 'pointer', border: 'none',
                borderRadius: '30px', background: color, color: 'white',
                fontWeight: 600,
                boxShadow: `0 4px 14px ${color}40`,
                transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            Next
        </button>
    </div>
);

export default Grounding;
