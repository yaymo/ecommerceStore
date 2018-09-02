const mongoose = require("mongoose");
const User = mongoose.model("users");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = app => {
  app.get("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send(user);
    } catch (err) {
      res.status(401).send("User not found");
    }
  });

  app.post("/api/users", requireAdmin, async (req, res) => {
    const { searchParams } = req.body;
    const users = await User.find(searchParams);
    res.status(200).send(users);
  });

  app.post("/api/users/new", requireAdmin, async (req, res) => {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      isAdmin
    });

    try {
      await user.save();
      res.status(201).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.delete("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      await User.findByIdAndRemove({ _id: req.params.id }).exec();
      res.status(200).send({});
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
