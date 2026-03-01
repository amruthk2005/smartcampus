const express = require('express');
const Complaint = require('../models/Complaint');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/complaints
// @desc    Submit a new complaint/grievance
// @access  Private (Student or Staff)
router.post('/', protect, async (req, res) => {
    try {
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

        res.status(201).json({
            message: 'Complaint submitted successfully',
            complaint
        });
    } catch (error) {
        console.error('Complaint submission error:', error.message);
        res.status(500).json({ message: 'Server error while submitting complaint', error: error.message });
    }
});

// @route   GET /api/complaints/my
// @desc    Get complaints filed by the logged-in user
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/complaints/:id
// @desc    Get a single complaint by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Only the owner or admin can view
        if (complaint.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Not authorized to view this complaint' });
        }

        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
