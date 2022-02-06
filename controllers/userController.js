const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      // userId kommt daher, da wir das in routes so benannt haben.
      const user = await User.findById(req.params.userId).select("-__v");
      if (!user) {
        res.status(404).json({ message: "User with this ID cannot be found." });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const userCount = await User.deleteOne({ _id: req.params.userId });
      if (userCount !== 1) {
        res.status(404).json({ message: "User cannot be found." });
      } else {
        res.status(200);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const userUpdate = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        { $set: req.body },
        { runValidators: true, new: true }
      ).select("-__v");

      if (!userUpdate) {
        res.status(404).json({ message: "User cannot be found." });
      } else {
        res.json(userUpdate);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
