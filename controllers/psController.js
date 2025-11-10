const asyncHandler = require('express-async-handler');
const ProblemStatement = require('../models/ProblemStatement');
const User = require('../models/user');

/**
 * Faculty creates PS (public)
 * Admin can also create/edit/delete
 */
const createPS = asyncHandler(async (req, res) => {
  const { title, description, driveLinks = [], allowedBatches = [], academicYear, maxPerBatch } = req.body;
  // rule: allowedBatches length should be <= 2 if uploader is faculty
  if (req.user.role === 'faculty' && allowedBatches.length > 2) {
    return res.status(400).json({ message: 'Faculty can assign maximum 2 batches per problem statement' });
  }
  const ps = await ProblemStatement.create({
    title, description, driveLinks, allowedBatches, faculty: req.user._id, academicYear, maxPerBatch
  });
  res.status(201).json(ps);
});

const listPS = asyncHandler(async (req, res) => {
  // public listing
  const { academicYear } = req.query;
  const q = academicYear ? { academicYear } : {};
  const list = await ProblemStatement.find(q).populate('faculty', 'name email');
  res.json(list);
});

const getPS = asyncHandler(async (req, res) => {
  const ps = await ProblemStatement.findById(req.params.id).populate('faculty','name email');
  if (!ps) return res.status(404).json({ message: 'PS not found' });
  res.json(ps);
});

const updatePS = asyncHandler(async (req, res) => {
  const ps = await ProblemStatement.findById(req.params.id);
  if (!ps) return res.status(404).json({ message: 'PS not found' });

  // Only admin or owner faculty can update
  if (req.user.role !== 'admin' && ps.faculty.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  Object.assign(ps, req.body);
  await ps.save();
  res.json(ps);
});

const deletePS = asyncHandler(async (req, res) => {
  const ps = await ProblemStatement.findById(req.params.id);
  if (!ps) return res.status(404).json({ message: 'PS not found' });
  if (req.user.role !== 'admin' && ps.faculty.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  await ps.remove();
  res.json({ message: 'Deleted' });
});

// Student selects a PS (once per academic year)
const choosePS = asyncHandler(async (req, res) => {
  const psId = req.params.id;
  const student = await User.findById(req.user._id);
  if (!student) return res.status(404).json({ message: 'User not found' });
  if (student.role !== 'student') return res.status(403).json({ message: 'Only students can choose PS' });

  // Check student's current academic year - one simple way: client sends academicYear in body
  const { academicYear } = req.body;
  if (!academicYear) return res.status(400).json({ message: 'academicYear required' });

  // If already selected for same year, block
  if (student.selectedPS && student.selectedPS.academicYear === academicYear) {
    return res.status(400).json({ message: 'You have already selected a problem statement this academic year' });
  }

  const ps = await ProblemStatement.findById(psId);
  if (!ps) return res.status(404).json({ message: 'PS not found' });

  // Check batch allowed
  if (ps.allowedBatches.length && student.batch && !ps.allowedBatches.includes(student.batch)) {
    return res.status(400).json({ message: 'Your batch is not allowed for this PS' });
  }

  // Optionally check maxPerBatch:
  if (ps.maxPerBatch) {
    // count assigned students from same batch
    const assignedInBatch = await User.countDocuments({ 'selectedPS.ps': ps._id, 'batch': student.batch, 'selectedPS.academicYear': academicYear });
    if (assignedInBatch >= ps.maxPerBatch) {
      return res.status(400).json({ message: 'Maximum students already assigned for your batch' });
    }
  }

  // Save selection to student
  student.selectedPS = { ps: ps._id, academicYear, chosenAt: new Date() };
  await student.save();

  // Add to PS assigned list
  ps.assignedStudents.push(student._id);
  await ps.save();

  res.json({ message: 'PS selected', psId: ps._id });
});

// Endpoint for student to view their chosen PS for academic year
const myPS = asyncHandler(async (req, res) => {
  const academicYear = req.query.academicYear;
  if (!academicYear) return res.status(400).json({ message: 'academicYear query required' });
  const user = await User.findById(req.user._id).populate('selectedPS.ps');
  if (!user.selectedPS || user.selectedPS.academicYear !== academicYear) {
    return res.status(404).json({ message: 'No PS chosen for this academic year' });
  }
  res.json(user.selectedPS.ps);
});

module.exports = { createPS, listPS, getPS, updatePS, deletePS, choosePS, myPS };
