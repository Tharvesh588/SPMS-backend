// models/User.js
const mongoose = require('mongoose');

const selectedPSSchema = new mongoose.Schema({
  ps: { type: mongoose.Schema.Types.ObjectId, ref: 'ProblemStatement' },
  academicYear: { type: String }, // e.g. "2025-2026"
  chosenAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  department: { type: String },
  division: { type: String, enum: ['A', 'B', 'C'] },
  batch: { type: String }, // e.g. "2025"
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  selectedPS: selectedPSSchema,
  role: { type: String, enum: ['student'], default: 'student' }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
