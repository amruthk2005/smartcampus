import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="main-layout">
                    <Sidebar />
                    <main className="content">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/student-dashboard" element={<StudentDashboard />} />
                            <Route path="/staff-dashboard" element={<StaffDashboard />} />
                            <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
