// Define Mongoose
const { Schema, model } = require("mongoose");

// Schema for what makes up a username
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  assignments: [thoughtSchema],
});

// Initialize the Comment model
const User = model("user", userSchema);

module.exports = User;
