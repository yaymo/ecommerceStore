const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const requireAdmin = require("../middlewares/requireAdmin");

const User = mongoose.model("user");

module.exports = app => {
  app.post("/api/auth", async (req, res) => {
    let { firstName, lastName, email, password, isAdmin } = req.body;

    if (!email) {
      return res.status(422).send({ message: "Missing field: email" });
    }
    if (typeof email !== "string") {
      return res.status(422).send({ message: "Incorrect field type: email" });
    }
    email = email.trim();
    if (email === "") {
      return res.status(422).send({ message: "Incorrect field length: email" });
    }
    if (!password) {
      return res.status(422).send({ message: "Missing field: password" });
    }
    if (typeof password !== "string") {
      return re.status(422).send({ message: "Incorrect field type: password" });
    }
    password = password.trim();
    if (password === "") {
      return res
        .status(422)
        .send({ message: "Incorrect field length: password" });
    }

    return User.find({ email })
      .count()
      .exec()
      .then(count => {
        if (count > 0) {
          return Promise.reject({
            name: "auth_error",
            message: "username already taken"
          });
        }
        return User.hashPassword(password);
      })
      .then(hash => {
        return User.create({
          email,
          password: hash,
          firstName,
          lastName,
          isAdmin
        });
      })
      .then(user => {
        return res.status(201).send(user);
      })
      .catch(err => {
        if (err.name === "auth_err") {
          return res.status(422).send({ message: err.message });
        }
        res.status(500).send(err);
      });
  });

  app.post("/api/login", (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "No request body" });
    }
    if (!("email" in req.body)) {
      return res.status(422).send({ message: "Missing field: email" });
    }
    if (!("password" in req.body)) {
      return res.status(422).send({ message: "Missing field: password" });
    }

    let { email, password } = req.body;

    if (typeof email !== "string") {
      return res.status(422).send({ message: "Invalid field type: email" });
    }
    if (typeof password !== "string") {
      return res.status(422).send({ message: "Invalid field type: password" });
    }

    email = email.trim();
    password = password.trim();

    if (email === "") {
      return res.status(422).send({ message: "Incorrect field length: email" });
    }
    if (password === "") {
      return res
        .status(422)
        .send({ message: "Incorrect field length: password" });
    }
    return User.find({ email })
      .exec()
      .then(async users => {
        const isValid = await users[0].validatePassword(
          password,
          users[0].password
        );
        if (isValid) {
          return res.status(200).send(users[0]);
        } else {
          return res.status(500).send("Username or password is incorrect");
        }
      })
      .catch(err => {
        console.log(err) && res.status(500).send({ message: err.message });
      });
  });
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

  app.delete("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      await User.findByIdAndRemove({ _id: req.params.id }).exec();
      res.status(200).send({});
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
