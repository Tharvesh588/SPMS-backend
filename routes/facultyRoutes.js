const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getFacultyProfile,
    updateFacultyProfile
} = require('../controllers/facultyController');

// Faculty routes
router.get('/profile', protect, getFacultyProfile);
router.put('/profile', protect, updateFacultyProfile);

module.exports = router;
