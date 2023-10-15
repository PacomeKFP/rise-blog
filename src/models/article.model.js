const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const articleSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // slug: { type: String, slug: ["title"], slug_padding_size: 4, unique: true },
    // landing: {
    //   type: String,
    //   default: "/public/images/topics/environment.png",
    // },
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
  }
);

const ArticleModel = new mongoose.model("Articles", articleSchema);

module.exports = { ArticleModel };
