const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const Payment = require("../models/Payment.model");

//POST "/payment/create-payment-intent" recibe los datos del formulario de pago
router.post(
  "/create-payment-intent",
  isAuthenticated,
  async (req, res, next) => {
    const userId = req.payload._id;

    try {
      const response = await User.findById(userId).populate(
        "cart.productId", // hay que ponerla propiedad dentro del carrito
        "price"
      );

      const total = response.cart.reduce((accumulator, eachProduct) => {
        return accumulator + eachProduct.quantity * eachProduct.productId.price;
      }, 0);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100, // le pasamos el precio total calculado del carrito,convertido de centavo a eur
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      const createPayment = async (element) => {
        try {
          await Payment.create({
            price: element.quantity * element.productId.price,
            product: element.productId._id,
            status: "incomplete",
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            // buyer: req.payload // example to add who bought the product (not done in this example)
          });
        } catch (error) {
          next(error);
        }
      };
      response.cart.map((e) => createPayment(e));
      res.send({
        clientSecret: paymentIntent.client_secret, // el cliente secreto se enviará al FE despues de la creacion de la intencion de pago en stripe
      });
    } catch (error) {
      next(error);
    }
  }
);
router.patch("/update-payment-intent", async (req, res, next) => {
  const { clientSecret, paymentIntentId } = req.body;

  try {
    await Payment.findOneAndUpdate(
      {
        clientSecret: clientSecret,
        paymentIntentId: paymentIntentId,
      },
      {
        status: "succeeded",
      }
    );

    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
