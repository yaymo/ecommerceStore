const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  });

  app.post("/api/users", async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const user = new User({
      name: { firstName: name.firstName, lastName: name.lastName },
      email,
      password,
      isAdmin
    });

    try {
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      await User.findByIdAndRemove({ _id: req.params.id }).exec();
      res.send(200);
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
