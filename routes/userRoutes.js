const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send(user);
    } catch (err) {
      res.status(401).send("User not found");
    }
  });

  app.get("/api/users", async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users);
  });

  app.post("/api/users", async (req, res) => {
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

  app.delete("/api/users/:id", async (req, res) => {
    try {
      await User.findByIdAndRemove({ _id: req.params.id }).exec();
      res.status(200).send({});
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
