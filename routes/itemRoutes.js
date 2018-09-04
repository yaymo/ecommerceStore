const mongoose = require("mongoose");
const Item = mongoose.model("item");
const querystring = require("querystring");

module.exports = app => {
  app.get("/api/items/:id", (req, res) => {
    const item = Item.findById(req.params.id);

    res.status(200).send(item);
  });

  app.get("/api/items/:category", (req, res) => {
    const itemsByCategory = Item.find({ category: req.params.category });

    res.status(200).send(itemsByCategory);
  });

  app.get("/api/items/:size", (req, res) => {
    const itemsBySize = Item.find({ size: req.params.size });

    res.status(200).send(itemsBySize);
  });

  app.get("/api/items?limit");
};
