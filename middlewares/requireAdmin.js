module.exports = (req, res, next) => {
  const { User } = req.body;

  if (!(User && User.isAdmin)) {
    return res.status(401).send({ error: "You must be an admin" });
  }

  next();
};
