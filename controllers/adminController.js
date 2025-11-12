// controllers/adminController.js
const Faculty = require('../models/Faculty');
const Team = require('../models/Team');

// ✅ Create Faculty (only Admin can do)
exports.createFaculty = async (req, res) => {
  try {
    const { name, department, email, password } = req.body;

    if (!name || !department || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Faculty.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Faculty already exists' });
    }

    const faculty = await Faculty.create({
      name,
      department,
      email,
      password, // 🔒 ideally hash this later
    });

    res.status(201).json({
      message: 'Faculty created successfully',
      faculty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ List all faculties
exports.listFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().sort({ createdAt: -1 });
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create team (Admin-level)
exports.createTeam = async (req, res) => {
  try {
    const { teamName, members, selectedProblem } = req.body;

    if (!teamName || !members?.length) {
      return res.status(400).json({ message: 'Team name and members required' });
    }

    const teamExists = await Team.findOne({ teamName });
    if (teamExists) {
      return res.status(400).json({ message: 'Team already exists' });
    }

    const team = await Team.create({
      teamName,
      members,
      selectedProblem,
    });

    res.status(201).json({
      message: 'Team created successfully',
      team,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
