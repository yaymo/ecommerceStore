const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

require("./models/User");
require("./models/Item");
require("./routes/userRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
