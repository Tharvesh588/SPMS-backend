// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, default: 'Admin' },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
