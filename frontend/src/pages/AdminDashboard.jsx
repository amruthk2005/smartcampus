import React, { useState } from 'react';

const AdminDashboard = () => {
    // Mock data for initial state
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            user: "Rahul S. (Student)",
            type: "Hostel",
            subject: "Water Shortage in Hostel B",
            priority: "High",
            status: "Pending",
            date: "2026-02-25"
        },
        {
            id: 2,
            user: "Prof. Anuj (Staff)",
            type: "Facility",
            subject: "Library Projector Broken",
            priority: "Medium",
            status: "Pending",
            date: "2026-02-26"
        },
        {
            id: 3,
            user: "Sneha K. (Student)",
            type: "Financial",
            subject: "Scholarship Disbursement Delay",
            priority: "High",
            status: "Pending",
            date: "2026-02-26"
        },
        {
            id: 4,
            user: "Dr. Murali (Staff)",
            type: "Resource",
            subject: "Server Overload in IT Lab",
            priority: "Urgent",
            status: "Pending",
            date: "2026-02-26"
        }
    ]);

    const markAsDone = (id) => {
        setComplaints(complaints.map(item =>
            item.id === id ? { ...item, status: "Done" } : item
        ));
    };

    return (
        <div className="dashboard admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome, Administrator! You have {complaints.filter(c => c.status === "Pending").length} pending grievances to address.</p>

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
                        {complaints.map((item) => (
                            <tr key={item.id}>
                                <td>{item.user}</td>
                                <td>{item.type}</td>
                                <td>{item.subject}</td>
                                <td className={item.priority === 'High' || item.priority === 'Urgent' ? 'priority-high' : ''}>
                                    {item.priority}
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
                                            onClick={() => markAsDone(item.id)}
                                        >
                                            Mark as Done
                                        </button>
                                    ) : (
                                        <span style={{ color: '#28a745', fontWeight: 600 }}>✓ Resolved</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminDashboard;

