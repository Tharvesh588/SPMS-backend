const express = require('express');
const { createFaculty, listFaculties, createTeam } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin controls
router.post('/faculty', protect, adminOnly, createFaculty);
router.get('/faculty', protect, adminOnly, listFaculties);
router.post('/team', protect, adminOnly, createTeam);

console.log({
  createFaculty,
  listFaculties,
  createTeam
});


module.exports = router;
