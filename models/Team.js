// models/Team.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  department: { type: String, required: true },
  division: { type: String, enum: ['A', 'B', 'C'], required: true }
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  members: {
    type: [studentSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4']
  },
  selectedProblem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProblemStatement'
  }
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 4 && val.length >= 1;
}

module.exports = mongoose.models.Team || mongoose.model('Team', teamSchema);
