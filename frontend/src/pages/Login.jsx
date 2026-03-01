import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
    const [activeTab, setActiveTab] = useState('Student');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.type === 'email' ? 'email' : 'password']: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await API.post('/auth/login', {
                email: formData.email,
                password: formData.password,
                role: activeTab
            });

            // Save user data and token to localStorage
            localStorage.setItem('user', JSON.stringify(response.data));

            // Redirect based on role
            if (response.data.role === 'Student') {
                navigate('/student-dashboard');
            } else if (response.data.role === 'Staff') {
                navigate('/staff-dashboard');
            } else if (response.data.role === 'Admin') {
                navigate('/admin-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

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
                    <h1>{activeTab} Login</h1>
                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
