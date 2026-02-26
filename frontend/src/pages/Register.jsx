import React, { useState } from 'react';

const Register = () => {
    const [activeTab, setActiveTab] = useState('Student');

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-tabs-vertical">
                    <button
                        className={activeTab === 'Student' ? 'active' : ''}
                        onClick={() => setActiveTab('Student')}
                    >
                        Student
                    </button>
                    <button
                        className={activeTab === 'Staff' ? 'active' : ''}
                        onClick={() => setActiveTab('Staff')}
                    >
                        Staff
                    </button>
                    <button
                        className={activeTab === 'Admin' ? 'active' : ''}
                        onClick={() => setActiveTab('Admin')}
                    >
                        Admin
                    </button>
                </div>
                <div className="auth-form-section">
                    <h1>{activeTab} Registration</h1>
                    <form className="auth-form">
                        <input type="text" placeholder="Full Name" required />
                        <input type="email" placeholder="Email Address" required />
                        <input type="tel" placeholder="Phone Number" required />
                        <input type="text" placeholder={activeTab + " ID"} required />
                        <input type="password" placeholder="Password" required />
                        <input type="password" placeholder="Confirm Password" required />
                        <button type="submit">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

