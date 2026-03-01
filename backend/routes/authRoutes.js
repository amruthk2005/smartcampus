const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'smartcampus_secret_key_2026', {
        expiresIn: '7d'
    });
};

// @route   POST /api/auth/register
// @desc    Register a new user (Student/Staff/Admin)
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, userId, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or ID already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({
            name,
            email,
            phone,
            userId,
            password: hashedPassword,
            role: role || 'Student'
        });

        res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                userId: user.userId
            },
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
});

// @route   POST /api/auth/login
// @desc    Login user and return JWT
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if role matches
        if (role && user.role !== role) {
            return res.status(401).json({ message: `This account is not registered as ${role}` });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                userId: user.userId
            },
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

// @route   GET /api/auth/me
// @desc    Get current logged-in user profile
// @access  Private
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
