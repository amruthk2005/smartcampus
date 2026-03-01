const asyncHandler = require('express-async-handler');
const Complaint = require('../models/Complaint');

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
const createComplaint = asyncHandler(async (req, res) => {
    const { type, category, department, subject, description, urgency } = req.body;

    const complaint = await Complaint.create({
        user: req.user._id,
        userName: `${req.user.name} (${req.user.role})`,
        userRole: req.user.role,
        type,
        category,
        department,
        subject,
        description,
        urgency: urgency || 'Medium'
    });

    res.status(201).json(complaint);
});

// @desc    Get current user complaints
// @route   GET /api/complaints/my
// @access  Private
const getMyComplaints = asyncHandler(async (req, res) => {
    const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
});

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
const getComplaintById = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);

    if (complaint) {
        if (complaint.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
            res.status(401);
            throw new Error('User not authorized');
        }
        res.json(complaint);
    } else {
        res.status(404);
        throw new Error('Complaint not found');
    }
});

module.exports = {
    createComplaint,
    getMyComplaints,
    getComplaintById
};
