const { Schema, model, default: mongoose } = require("mongoose");

const compraSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Compras = model("Compras", compraSchema);

module.exports = Compras;
