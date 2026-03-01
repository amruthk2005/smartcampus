const asyncHandler = require('express-async-handler');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

// @desc    Get all complaints
// @route   GET /api/admin/complaints
// @access  Private/Admin
const getAllComplaints = asyncHandler(async (req, res) => {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });
    res.json(complaints);
});

// @desc    Update complaint status
// @route   PUT /api/admin/complaints/:id/status
// @access  Private/Admin
const updateComplaintStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (complaint) {
        complaint.status = status || 'Done';
        const updatedComplaint = await complaint.save();
        res.json(updatedComplaint);
    } else {
        res.status(404);
        throw new Error('Complaint not found');
    }
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const resolvedComplaints = await Complaint.countDocuments({ status: { $in: ['Done', 'Resolved'] } });
    const totalUsers = await User.countDocuments();

    res.json({
        totalComplaints,
        pendingComplaints,
        resolvedComplaints,
        totalUsers
    });
});

module.exports = {
    getAllComplaints,
    updateComplaintStatus,
    getAdminStats
};
