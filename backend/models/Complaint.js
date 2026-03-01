const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        enum: ['Student', 'Staff'],
        required: true
    },
    type: {
        type: String,
        required: [true, 'Complaint type is required'],
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    urgency: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Normal', 'Urgent', 'Critical'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Done', 'Resolved'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
