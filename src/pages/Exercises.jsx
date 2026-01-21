import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Wind } from 'lucide-react';
import './Exercises.css';

const Exercises = () => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('Ready'); // Ready, Inhale, Hold, Exhale
    const [timeLeft, setTimeLeft] = useState(4);
    const [cycles, setCycles] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 1) {
                        handlePhaseChange();
                        return 4;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, phase]);

    const handlePhaseChange = () => {
        setPhase((current) => {
            switch (current) {
                case 'Ready': return 'Inhale';
                case 'Inhale': return 'Hold';
                case 'Hold': return 'Exhale';
                case 'Exhale':
                    setCycles(c => c + 1);
                    return 'Hold (Empty)';
                case 'Hold (Empty)': return 'Inhale';
                default: return 'Inhale';
            }
        });
    };

    const toggleExercise = () => {
        if (!isActive && phase === 'Ready') {
            setPhase('Inhale');
            setTimeLeft(4);
        }
        setIsActive(!isActive);
    };

    const resetExercise = () => {
        setIsActive(false);
        setPhase('Ready');
        setTimeLeft(4);
        setCycles(0);
    };

    const getInstruction = () => {
        switch (phase) {
            case 'Ready': return 'Press Play to Begin';
            case 'Inhale': return 'Breathe In...';
            case 'Hold': return 'Hold...';
            case 'Exhale': return 'Breathe Out...';
            case 'Hold (Empty)': return 'Hold Empty...';
            default: return '';
        }
    };

    return (
        <div className="exercises-page container">
            <header className="exercises-header">
                <h1>Breathing Details</h1>
                <p className="subtitle">Box Breathing (4-4-4-4) to calm your nervous system.</p>
            </header>

            <div className="breathing-container">
                <div className={`breathing-circle ${isActive ? phase.toLowerCase().replace(/ [(]/g, '-').replace(/[)]/g, '') : ''}`}>
                    <div className="circle-content">
                        <span className="phase-text">{getInstruction()}</span>
                        {isActive && <span className="timer-text">{timeLeft}</span>}
                    </div>
                </div>
            </div>

            <div className="stats-display">
                <p>Cycles Completed: {cycles}</p>
            </div>

            <div className="controls">
                <button
                    className={`control-btn ${isActive ? 'active' : ''}`}
                    onClick={toggleExercise}
                >
                    {isActive ? <Pause size={32} /> : <Play size={32} />}
                </button>

                <button className="control-btn secondary" onClick={resetExercise}>
                    <RefreshCw size={24} />
                </button>
            </div>

            <div className="info-box">
                <Wind size={20} className="info-icon" />
                <p>Focus on your breath. If your mind wanders, gently bring it back to the counting.</p>
            </div>
        </div>
    );
};

export default Exercises;
