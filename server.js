const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

require("./models/User");

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
