const { Schema, model, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
  },
});
const Category = model("Category", categorySchema);

module.exports = Category;
