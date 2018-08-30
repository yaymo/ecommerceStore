const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
});
mongoose.model("users", userSchema);
