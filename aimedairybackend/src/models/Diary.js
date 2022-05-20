const mongoose = require("mongoose");

const DiarySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    diary: {
      type: String,
      required: true,
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    views: {
      type: Number,
      default: 0,
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Diary = mongoose.model("diary", DiarySchema);
