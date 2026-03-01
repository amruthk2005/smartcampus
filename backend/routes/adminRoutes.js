const express = require('express');
const { getAllComplaints, updateComplaintStatus, getAdminStats } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/complaints', getAllComplaints);
router.put('/complaints/:id/status', updateComplaintStatus);
router.get('/stats', getAdminStats);

module.exports = router;
