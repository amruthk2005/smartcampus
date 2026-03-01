import React, { useState, useEffect } from 'react';
import API from '../services/api';

const StaffDashboard = () => {
    const [report, setReport] = useState({
        department: '',
        category: '',
        subject: '',
        details: '',
        priority: 'Normal'
    });
    const [loading, setLoading] = useState(false);
    const [myReports, setMyReports] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        fetchMyReports();
    }, []);

    const fetchMyReports = async () => {
        try {
            const response = await API.get('/complaints/my');
            setMyReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post('/complaints', {
                type: 'Internal Staff Report',
                department: report.department,
                category: report.category,
                subject: report.subject,
                description: report.details,
                urgency: report.priority === 'Normal' ? 'Medium' : report.priority === 'Urgent' ? 'High' : 'Critical'
            });
            alert('Internal report filed successfully!');
            setReport({
                department: '',
                category: '',
                subject: '',
                details: '',
                priority: 'Normal'
            });
            fetchMyReports();
        } catch (error) {
            console.error('Error submitting report:', error);
            alert('Failed to submit report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard staff-dashboard">
            <h1>Staff Dashboard</h1>
            <p>Welcome, {user.name}! Use this portal to report departmental issues or administrative grievances.</p>

            <section className="grievance-section">
                <h2>File Internal Report / Grievance</h2>
                <form className="grievance-form" onSubmit={handleSubmit}>
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <select
                                id="department"
                                value={report.department}
                                onChange={(e) => setReport({ ...report, department: e.target.value })}
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="Academic">Academic Affairs</option>
                                <option value="HR">Human Resources</option>
                                <option value="IT">IT Support</option>
                                <option value="Maintenance">Maintenance & Estate</option>
                                <option value="Administration">Administration</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Issue Category</label>
                            <select
                                id="category"
                                value={report.category}
                                onChange={(e) => setReport({ ...report, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Infrastructure">Infrastructure Issue</option>
                                <option value="Resource">Lack of Resources</option>
                                <option value="Conflict">Workplace Conflict</option>
                                <option value="Policy">Policy Clarification</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="priority">Priority Level</label>
                            <select
                                id="priority"
                                value={report.priority}
                                onChange={(e) => setReport({ ...report, priority: e.target.value })}
                            >
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject / Title</label>
                            <input
                                type="text"
                                id="subject"
                                placeholder="Summary of the report"
                                value={report.subject}
                                onChange={(e) => setReport({ ...report, subject: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="details">Detailed Explanation</label>
                        <textarea
                            id="details"
                            placeholder="Please provide comprehensive details about the issue..."
                            value={report.details}
                            onChange={(e) => setReport({ ...report, details: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" style={{ backgroundColor: '#2c3e50' }} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
            </section>

            <section className="my-reports" style={{ marginTop: '40px' }}>
                <h2>My Recent Reports</h2>
                {myReports.length === 0 ? (
                    <p>You haven't filed any reports yet.</p>
                ) : (
                    <table className="complaints-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Subject</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myReports.map((r) => (
                                <tr key={r._id}>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{r.subject}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                        <span className={`status-badge status-${r.status.toLowerCase()}`}>
                                            {r.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                        {new Date(r.createdAt).toLocaleDateString()}
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

export default StaffDashboard;
