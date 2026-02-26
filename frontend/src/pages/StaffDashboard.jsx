import React, { useState } from 'react';

const StaffDashboard = () => {
    const [report, setReport] = useState({
        department: '',
        category: '',
        subject: '',
        details: '',
        priority: 'Normal'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Staff Report Submitted:', report);
        alert('Internal report filed successfully!');
    };

    return (
        <div className="dashboard staff-dashboard">
            <h1>Staff Dashboard</h1>
            <p>Welcome, Staff Member! Use this portal to report departmental issues or administrative grievances.</p>

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

                    <button type="submit" className="submit-btn" style={{ backgroundColor: '#2c3e50' }}>Submit Report</button>
                </form>
            </section>
        </div>
    );
};

export default StaffDashboard;

