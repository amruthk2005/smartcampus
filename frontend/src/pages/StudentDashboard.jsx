import React, { useState } from 'react';

const StudentDashboard = () => {
    const [grievance, setGrievance] = useState({
        type: '',
        subject: '',
        description: '',
        urgency: 'Medium'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Grievance Submitted:', grievance);
        alert('Complaint submitted successfully!');
    };

    return (
        <div className="dashboard student-dashboard">
            <h1>Student Dashboard</h1>
            <p>Welcome back, Student! Use the form below to voice your concerns.</p>

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

                    <button type="submit" className="submit-btn">Submit Complaint</button>
                </form>
            </section>
        </div>
    );
};

export default StudentDashboard;

