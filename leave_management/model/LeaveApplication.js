const mongoose = require('mongoose');

const leaveApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  appliedAt: { type: Date, default: Date.now },
  reviewedAt: Date,
  reviewedBy: String
});

module.exports = mongoose.model('LeaveApplication', leaveApplicationSchema);
