const mongoose = require('mongoose');

const selectedPSSchema = new mongoose.Schema({
  ps: { type: mongoose.Schema.Types.ObjectId, ref: 'ProblemStatement' },
  academicYear: { type: String }, // e.g. "2025-2026"
  chosenAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','faculty','student'], default: 'student' },
  department: { type: String },
  batch: { type: String }, // e.g. "A", "B" or year
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  selectedPS: selectedPSSchema, // one selection per academic year enforced in logic
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
