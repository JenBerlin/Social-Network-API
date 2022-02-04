// Define Mongoose
const { Schema, model } = require("mongoose");

// Schema for what makes up a username
const userNameSchema = new Schema({
  type: String,
  unique: true,
  required: true,
  trim: true,
});

// Schema for what makes up a email
const emailSchema = new Schema({
  ttype: String,
  unique: true,
  required: true,
  validate: [validateEmail, "Please fill a valid email address"],
  match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please fill a valid email address",
  ],
});

// Initialize the Comment model
const User = model("user", userNameSchema, emailSchema);

module.exports = User;
