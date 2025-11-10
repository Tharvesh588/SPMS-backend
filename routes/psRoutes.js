const express = require('express');
const router = express.Router();
const { protect, permit } = require('../middleware/authMiddleware');
const {
  createPS, listPS, getPS, updatePS, deletePS, choosePS, myPS
} = require('../controllers/psController');

// public listing
router.get('/', listPS);
router.get('/:id', getPS);

// protected routes
router.post('/', protect, permit('faculty','admin'), createPS);
router.put('/:id', protect, permit('faculty','admin'), updatePS);
router.delete('/:id', protect, permit('faculty','admin'), deletePS);

// student chooses PS
router.post('/:id/choose', protect, permit('student'), choosePS);
router.get('/my', protect, permit('student'), myPS);

module.exports = router;
