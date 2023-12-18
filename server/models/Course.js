const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tutor',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function(tutorId) {
  const obj = await this.aggregate([
    {
      $match: { tutor: tutorId }
    },
    {
      $group: {
        _id: '$tutor',
        averageCost: { $avg: '$tuition' }
      }
    }
  ]);

  try {
    await this.model('Tutor').findByIdAndUpdate(tutorId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
CourseSchema.post('save', function() {
  this.constructor.getAverageCost(this.tutor);
});

// Call getAverageCost before remove
CourseSchema.pre('remove', function() {
  this.constructor.getAverageCost(this.tutor);
});

module.exports = mongoose.model('Course', CourseSchema);
