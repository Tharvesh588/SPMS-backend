const express = require('express');
const router = express.Router();
const { protect, permit } = require('../middleware/authMiddleware');
const { createTeam, listTeams, getTeam, deleteTeam } = require('../controllers/teamController');

router.get('/', protect, permit('admin','faculty'), listTeams);
router.get('/:id', protect, permit('admin','faculty'), getTeam);
router.post('/', protect, permit('admin'), createTeam);
router.delete('/:id', protect, permit('admin'), deleteTeam);

module.exports = router;
