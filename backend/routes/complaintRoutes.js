const express = require('express');
const { createComplaint, getMyComplaints, getComplaintById } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createComplaint);

router.route('/my')
    .get(protect, getMyComplaints);

router.route('/:id')
    .get(protect, getComplaintById);

module.exports = router;
