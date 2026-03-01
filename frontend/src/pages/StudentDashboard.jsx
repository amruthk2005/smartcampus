import React, { useState, useEffect } from 'react';
import API from '../services/api';

const StudentDashboard = () => {
    const [grievance, setGrievance] = useState({
        type: '',
        subject: '',
        description: '',
        urgency: 'Medium'
    });
    const [loading, setLoading] = useState(false);
    const [myComplaints, setMyComplaints] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        fetchMyComplaints();
    }, []);

    const fetchMyComplaints = async () => {
        try {
            const response = await API.get('/complaints/my');
            setMyComplaints(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post('/complaints', grievance);
            alert('Complaint submitted successfully!');
            setGrievance({
                type: '',
                subject: '',
                description: '',
                urgency: 'Medium'
            });
            fetchMyComplaints();
        } catch (error) {
            console.error('Error submitting grievance:', error);
            alert('Failed to submit complaint. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard student-dashboard">
            <h1>Student Dashboard</h1>
            <p>Welcome back, {user.name}! Use the form below to voice your concerns.</p>

            <section className="grievance-section">
                <h2>File a New Grievance</h2>
                <form className="grievance-form" onSubmit={handleSubmit}>
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="type">Complaint Type</label>
                            <select
                                id="type"
                                value={grievance.type}
                                onChange={(e) => setGrievance({ ...grievance, type: e.target.value })}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Academic">Academic</option>
                                <option value="Facility">Facility/Infrastructure</option>
                                <option value="Hostel">Hostel/Accommodation</option>
                                <option value="Financial">Financial/Fees</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="urgency">Urgency Level</label>
                            <select
                                id="urgency"
                                value={grievance.urgency}
                                onChange={(e) => setGrievance({ ...grievance, urgency: e.target.value })}
                            >
                                <option value="Low">Low (General Feedback)</option>
                                <option value="Medium">Medium (Standard Issue)</option>
                                <option value="High">High (Immediate Attention)</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            placeholder="Enter a brief summary of the issue"
                            value={grievance.subject}
                            onChange={(e) => setGrievance({ ...grievance, subject: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Detailed Description</label>
                        <textarea
                            id="description"
                            placeholder="Please provide full details of your grievance..."
                            value={grievance.description}
                            onChange={(e) => setGrievance({ ...grievance, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                </form>
            </section>

            <section className="my-complaints" style={{ marginTop: '40px' }}>
                <h2>My Recent Complaints</h2>
                {myComplaints.length === 0 ? (
                    <p>You haven't filed any complaints yet.</p>
                ) : (
                    <table className="complaints-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Subject</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myComplaints.map((c) => (
                                <tr key={c._id}>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{c.subject}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{c.type}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                        <span className={`status-badge status-${c.status.toLowerCase()}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};

export default StudentDashboard;
