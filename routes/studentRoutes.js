const express = require('express');
const router = express.Router();
const { protect, permit } = require('../middleware/authMiddleware');

// extra student endpoints if needed (profile, list own team etc.)
router.get('/me', protect, permit('student','faculty','admin'), async (req,res) => {
  res.json(req.user);
});

module.exports = router;
