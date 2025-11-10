// models/Faculty.js
const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // created by admin
  role: { type: String, default: 'faculty' }
}, { timestamps: true });

module.exports = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);
