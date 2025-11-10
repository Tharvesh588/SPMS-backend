const mongoose = require('mongoose');

const problemStatementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // uploader
  driveLinks: [{ type: String }], // drive links to docs
  allowedBatches: [{ type: String }], // batches allowed to take this PS (max 2 per staff rule enforced)
  academicYear: { type: String }, // "2025-2026"
  maxPerBatch: { type: Number, default: 999 }, // optional limit per batch
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Team || mongoose.model('Team', problemStatementSchema);
