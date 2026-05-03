const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    min: Number,
    max: Number,
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'temporary'],
    default: 'full-time',
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'intermediate', 'senior'],
    default: 'intermediate',
  },
  skills: [String],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applications: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);