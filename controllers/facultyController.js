const asyncHandler = require('express-async-handler');
const ProblemStatement = require('../models/ProblemStatement');

// Faculty creates problem statement
const createPS = asyncHandler(async (req, res) => {
  const { title, description, driveLinks = [], allowedBatches = [], academicYear } = req.body;
  if (allowedBatches.length > 2)
    return res.status(400).json({ message: 'Max 2 batches allowed per faculty PS' });

  const ps = await ProblemStatement.create({
    title,
    description,
    driveLinks,
    allowedBatches,
    academicYear,
    faculty: req.user._id,
  });
  res.status(201).json(ps);
});

// View own PS
const listMyPS = asyncHandler(async (req, res) => {
  const list = await ProblemStatement.find({ faculty: req.user._id });
  res.json(list);
});

module.exports = { createPS, listMyPS };
