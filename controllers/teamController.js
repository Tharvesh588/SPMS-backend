const asyncHandler = require('express-async-handler');
const Team = require('../models/Team');
const User = require('../models/user');

const createTeam = asyncHandler(async (req, res) => {
  // Only admin can create/edit/delete teams (per requirements)
  const { name, memberIds = [], projectTitle, problemStatementId } = req.body;
  // Validate members are students
  const members = await User.find({ _id: { $in: memberIds }, role: 'student' });
  const team = await Team.create({
    name, members: members.map(m=>m._id), projectTitle, problemStatement: problemStatementId, createdBy: req.user._id
  });
  // update users team field
  await User.updateMany({ _id: { $in: members.map(m=>m._id) } }, { team: team._id });
  res.status(201).json(team);
});

const listTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find().populate('members','name email batch').populate('problemStatement','title');
  res.json(teams);
});

const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members','name email').populate('problemStatement','title');
  if(!team) return res.status(404).json({ message: 'Not found' });
  res.json(team);
});

const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if(!team) return res.status(404).json({ message: 'Not found' });
  // remove team ref from members
  await User.updateMany({ _id: { $in: team.members } }, { $unset: { team: "" } });
  await team.remove();
  res.json({ message: 'Deleted' });
});

module.exports = { createTeam, listTeams, getTeam, deleteTeam };
