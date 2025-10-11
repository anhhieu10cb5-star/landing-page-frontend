const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  completedAt: Date
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  projectCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  projectType: {
    type: String,
    enum: ['landing-page', 'website', 'web-app', 'mobile-app', 'backend', 'ecommerce'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'review', 'completed', 'cancelled'],
    default: 'pending'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  estimatedEndDate: Date,
  actualEndDate: Date,
  milestones: [milestoneSchema],
  technologies: [String],
  budget: Number,
  notes: String,
  dailyUpdates: [{
    date: {
      type: Date,
      default: Date.now
    },
    update: String,
    progress: Number
  }]
}, { 
  timestamps: true 
});

// Generate unique project code
projectSchema.statics.generateProjectCode = async function() {
  const prefix = 'PRJ';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const code = `${prefix}${randomNum}`;
  
  const exists = await this.findOne({ projectCode: code });
  if (exists) {
    return this.generateProjectCode();
  }
  return code;
};

// Method to add daily update
projectSchema.methods.addDailyUpdate = function(updateText, progressValue) {
  this.dailyUpdates.push({
    update: updateText,
    progress: progressValue
  });
  this.progress = progressValue;
  return this.save();
};

module.exports = mongoose.model('Project', projectSchema);