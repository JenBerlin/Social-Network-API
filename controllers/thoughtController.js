const { json } = require("express");
const { Thought } = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).select(
        "-__v"
      );
      if (!thought) {
        res
          .status(404)
          .json({ message: "Though with this ID cannot be found." });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({
          message: "Thought created, but found no user with that ID.",
        });
      } else {
        res.json("Thought is created.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      ).select("-__v");
      if (!thought) {
        res.status(404).json({ message: "Thought with this ID is not found." });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: "Thought with this ID is not found." });
      } else {
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $unset: { thoughts: thought } },
          { new: true }
        );
        if (!user) {
          res.status(404).json({
            message: "Thought created but nu user found with this ID.",
          });
        } else {
          res.json({ message: "Thought has been succussfully deleted." });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res
          .status(404)
          .json({ message: "Thought with this ID has not been found." });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { responses: req.params.reactionId } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res
          .status(404)
          .json({ message: "Thought with this ID has not been found." });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
