const mongoose = require("mongoose");


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: props => `${props.value} is not a valid email`
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  content: {
    type: String,
    required: true,
  },
  articles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Articles",
    },
  ],
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Articles",
    },
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Articles",
    },
  ],
  
});

const UserModel = new mongoose.model("Users", userSchema);

module.exports = { UserModel };
