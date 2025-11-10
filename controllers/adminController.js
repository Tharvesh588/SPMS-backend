const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Team = require('../models/Team');

// Admin creates Faculty account
const createFaculty = asyncHandler(async (req, res) => {
  const { name, email, password, department } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const faculty = await User.create({ name, email, passwordHash, department, role: 'faculty' });

  res.status(201).json({ id: faculty._id, name: faculty.name, email: faculty.email });
});

// Admin creates a team
const createTeam = asyncHandler(async (req, res) => {
  const { teamName, students, problemStatementId } = req.body;

  if (!teamName || !students?.length)
    return res.status(400).json({ message: 'Team name and students required' });
  if (students.length > 4)
    return res.status(400).json({ message: 'Max 4 members allowed per team' });

  const team = await Team.create({
    name: teamName,
    members: students,
    problemStatement: problemStatementId,
    createdBy: req.user._id,
  });

  await User.updateMany({ _id: { $in: students } }, { team: team._id });

  res.status(201).json(team);
});

const listFaculties = asyncHandler(async (req, res) => {
  const faculties = await User.find({ role: 'faculty' }).select('-passwordHash');
  res.json(faculties);
});

module.exports = { createFaculty, createTeam, listFaculties };
