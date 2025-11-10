const asyncHandler = require('express-async-handler');
const ProblemStatement = require('../models/ProblemStatement');
const User = require('../models/User');

const choosePS = asyncHandler(async (req, res) => {
  const { psId, academicYear } = req.body;
  const student = await User.findById(req.user._id);
  if (!student) return res.status(404).json({ message: 'User not found' });

  if (student.selectedPS && student.selectedPS.academicYear === academicYear)
    return res.status(400).json({ message: 'Already selected PS this academic year' });

  const ps = await ProblemStatement.findById(psId);
  if (!ps) return res.status(404).json({ message: 'PS not found' });

  if (!ps.allowedBatches.includes(student.batch))
    return res.status(400).json({ message: 'Not allowed for your batch' });

  student.selectedPS = { ps: ps._id, academicYear };
  await student.save();
  ps.assignedStudents.push(student._id);
  await ps.save();

  res.json({ message: 'Problem Statement selected successfully', psId: ps._id });
});

const viewMyPS = asyncHandler(async (req, res) => {
  const student = await User.findById(req.user._id).populate('selectedPS.ps');
  res.json(student.selectedPS.ps);
});

module.exports = { choosePS, viewMyPS };
