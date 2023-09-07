const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  landing: {
    type: String,
    default: "/public/images/topics/environment.png",
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comments",
    },
  ],
  topics: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Topics",
    },
  ],
});

const ArticleModel = new mongoose.model("Articles", articleSchema);

module.exports = { ArticleModel };
