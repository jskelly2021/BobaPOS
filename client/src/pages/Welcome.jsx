import React from 'react';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';
import AccessibilityBar from '../components/accessibility/AccessiblityBar';

function Welcome() {
    const nav = useNavigate();

    const handleToggleMode = () => {
        localStorage.setItem("userMode", "employee");
        nav('/login');
    }

    return (
        <div className='WelcomeModule'>
            <AccessibilityBar />
                <div className='ButtonContainer'>
                    <button className='UserModeBtn' onClick={handleToggleMode}>
                        Toggle User Mode
                    </button>
                </div>

            <div className='WelcomeWrapper'>

                <h1 className='WelcomeText'>Welcome</h1>

                <div className='StartOrderContainer'>
                    <button className='StartBtn' onClick={() => nav('/menu/customer')}>
                        Start Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;

