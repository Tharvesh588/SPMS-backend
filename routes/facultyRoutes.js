const express = require('express');
const { createPS, listMyPS } = require('../controllers/facultyController');
const { protect, facultyOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Faculty routes
router.post('/ps', protect, facultyOnly, createPS);
router.get('/ps', protect, facultyOnly, listMyPS);

module.exports = router;
