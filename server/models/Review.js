const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: "Tutor",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Prevent user from submitting more than one review per tutor
ReviewSchema.index({ tutor: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (tutorId) {
  const obj = await this.aggregate([
    {
      $match: { tutor: tutorId },
    },
    {
      $group: {
        _id: "$tutor",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Tutor").findByIdAndUpdate(tutorId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.tutor);
});

// Call getAverageCost before remove
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.tutor);
});

module.exports = mongoose.model("Review", ReviewSchema);
