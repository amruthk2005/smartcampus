const express = require('express');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/admin/complaints
// @desc    Get all complaints (Admin only)
// @access  Private/Admin
router.get('/complaints', protect, adminOnly, async (req, res) => {
    try {
        const complaints = await Complaint.find({}).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/admin/complaints/:id/status
// @desc    Update complaint status (Mark as Done/Resolved)
// @access  Private/Admin
router.put('/complaints/:id/status', protect, adminOnly, async (req, res) => {
    try {
        const { status } = req.body;

        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.status = status || 'Done';
        await complaint.save();

        res.json({
            message: `Complaint marked as ${complaint.status}`,
            complaint
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
    try {
        const totalComplaints = await Complaint.countDocuments();
        const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
        const resolvedComplaints = await Complaint.countDocuments({ status: { $in: ['Done', 'Resolved'] } });
        const totalUsers = await User.countDocuments();
        const totalStudents = await User.countDocuments({ role: 'Student' });
        const totalStaff = await User.countDocuments({ role: 'Staff' });

        res.json({
            totalComplaints,
            pendingComplaints,
            resolvedComplaints,
            inProgressComplaints: totalComplaints - pendingComplaints - resolvedComplaints,
            totalUsers,
            totalStudents,
            totalStaff
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/admin/users
// @desc    Get all registered users
// @access  Private/Admin
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
