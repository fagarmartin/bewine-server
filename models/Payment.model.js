const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  price: Number,
  paymentIntentId: String,
  clientSecret: String,
  status: {
    type: String,
    enum: ["incomplete", "succeeded"],
    default: "incomplete",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
