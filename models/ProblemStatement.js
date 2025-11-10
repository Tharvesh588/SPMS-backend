// models/ProblemStatement.js
const mongoose = require('mongoose');

const problemStatementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true }, // uploader
  driveLinks: [{ type: String }], // array of Drive links
  allowedBatches: {
    type: [String],
    validate: [val => val.length <= 2, 'Only 2 batches allowed per faculty']
  },
  academicYear: { type: String, required: true }, // e.g. "2025-2026"
  maxPerBatch: { type: Number, default: 2 }, // optional max 2 teams
  assignedTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
}, { timestamps: true });

module.exports = mongoose.models.ProblemStatement || mongoose.model('ProblemStatement', problemStatementSchema);
