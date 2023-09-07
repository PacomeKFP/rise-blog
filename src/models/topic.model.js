const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  articles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Articles",
    },
  ],
  landing: {
    type: String,
    default: "/public/images/topics/environment.png",
  },
});

const TopicModel = new mongoose.model("Topics", topicSchema);

module.exports = { TopicModel };
