const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  title: { type: String, require: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  img: {
    src: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true }
  },
  sizes: {
    xs: { type: Number, default: 0 },
    sm: { type: Number, default: 0 },
    md: { type: Number, default: 0 },
    lg: { type: Number, default: 0 },
    xl: { type: Number, default: 0 },
    xxl: { type: Number, default: 0 }
  }
});
mongoose.model("items", ItemSchema);
