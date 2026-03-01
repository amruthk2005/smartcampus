import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        fetchAllComplaints();
    }, []);

    const fetchAllComplaints = async () => {
        try {
            setLoading(true);
            const response = await API.get('/admin/complaints');
            setComplaints(response.data);
        } catch (error) {
            console.error('Error fetching all complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsDone = async (id) => {
        try {
            await API.put(`/admin/complaints/${id}/status`, { status: 'Done' });
            fetchAllComplaints();
        } catch (error) {
            console.error('Error updating complaint status:', error);
            alert('Failed to update status.');
        }
    };

    if (loading) return <div className="dashboard">Loading dashboard...</div>;

    return (
        <div className="dashboard admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user.name}! You have {complaints.filter(c => c.status === "Pending").length} pending grievances to address.</p>

            <section className="complaints-container">
                <h2>All Grievances & Complaints</h2>
                <table className="complaints-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Type</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No grievances found.</td></tr>
                        ) : (
                            complaints.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.userName}</td>
                                    <td>{item.type}</td>
                                    <td>{item.subject}</td>
                                    <td className={item.urgency === 'High' || item.urgency === 'Urgent' || item.urgency === 'Critical' ? 'priority-high' : ''}>
                                        {item.urgency}
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>
                                        {item.status === "Pending" ? (
                                            <button
                                                className="done-btn"
                                                onClick={() => markAsDone(item._id)}
                                            >
                                                Mark as Done
                                            </button>
                                        ) : (
                                            <span style={{ color: '#28a745', fontWeight: 600 }}>✓ Resolved</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminDashboard;
