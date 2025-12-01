const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required!"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category is required!"],
      enum: ["tech", "news", "sports", "lifestyle", "business"],
    },
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
