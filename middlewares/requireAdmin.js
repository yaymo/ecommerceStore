module.exports = (req, res, next) => {
  const { user } = req.body;

  if (!(user && user.isAdmin)) {
    return res.status(401).send({ error: "You must be an admin" });
  }

  next();
};
