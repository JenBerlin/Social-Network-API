// Define Mongoose
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema for what makes up a user
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (date) {
      return date.toISOString();
    },
  },
  username: {
    // Is this correct?
    type: String,
    ref: "User",
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize the Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
