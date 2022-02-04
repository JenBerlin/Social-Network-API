const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  assignmentName: {
    type: String,
    required: true,
    maxlength: 280,
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
});

module.exports = reactionSchema;
