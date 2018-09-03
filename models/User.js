const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
});

userSchema.methods.validatePassword = (password, hash) => {
  return bcrypt.compare(password, hash).then(isValid => isValid);
};

userSchema.statics.hashPassword = password => {
  return bcrypt.hash(password, 10).then(hash => hash);
};
mongoose.model("user", userSchema);
