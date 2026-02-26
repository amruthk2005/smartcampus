import React, { useState } from 'react';

const Login = () => {
    const [activeTab, setActiveTab] = useState('Student');

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-tabs-vertical">
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
                <div className="login-form-section">
                    <h1>{activeTab} Login</h1>
                    <form className="login-form">
                        <input type="email" placeholder="Email Address" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

