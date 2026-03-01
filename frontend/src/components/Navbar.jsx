import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">OCC App</div>
            <div className="nav-links">
                {user ? (
                    <>
                        <span style={{ color: 'white', marginRight: '15px' }}>Hello, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
