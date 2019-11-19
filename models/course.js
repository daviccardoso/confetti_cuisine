const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
  'title': {
    type: String,
    required: true,
    unique: true
  },
  'description': {
    type: String,
    required: true
  },
  'maxStudents': {
    type: Number,
    default: 0,
    min: [0, 'Course cannot have a negative number of students']
  },
  'cost': {
    type: Number,
    default: 0,
    min: [0, 'Course cannot have a negative cost']
  },
  'subscribers': [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscriber' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
