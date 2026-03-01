import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
    const [activeTab, setActiveTab] = useState('Student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        userId: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);

        try {
            const response = await API.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                userId: formData.userId,
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
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                </div>
                <div className="auth-form-section">
                    <h1>{activeTab} Registration</h1>
                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input name="name" type="text" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
                        <input name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
                        <input name="phone" type="tel" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
                        <input name="userId" type="text" placeholder={activeTab + " ID"} required value={formData.userId} onChange={handleChange} />
                        <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
                        <input name="confirmPassword" type="password" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
