import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li><NavLink to="/student-dashboard">Student Dashboard</NavLink></li>
                <li><NavLink to="/staff-dashboard">Staff Dashboard</NavLink></li>
                <li><NavLink to="/admin-dashboard">Admin Dashboard</NavLink></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
