// Define Mongoose
const { Schema, model } = require("mongoose");
const { thoughtSchema } = require("./Thought");

// Schema for what makes up a user
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
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [this],
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize the User model
const User = model("user", userSchema);

module.exports = User;
