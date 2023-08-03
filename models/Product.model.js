const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://volmesbol.com/wp-content/uploads/2018/08/botella-vino.jpg",
  },
  price: {
    type: Number,
    required: true,
  }, 
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }
  ],
  platform: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
    }
  ],
  company: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  }
  ,year: String
});

const Product = model("Product", productSchema);

module.exports = Product;
