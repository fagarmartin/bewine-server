const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");

//GET  "/api/cart" devuelve todos los productos del carrito
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;

  try {
    const response = await User.findById(userId).populate(
      "cart.productId", // hay que ponerla propiedad dentro del carrito
      "_id name image price"
    ); //* retorna solo los campos especificados dentro del string, separados por espacios

    res.json(response.cart); // retorna el carrito de ese usuario
  } catch (err) {
    next(err);
  }
});

//PATCH "/api/:productId/add"  añade un producto a la compra en el array del carrito del usuario
router.patch("/:productId/add", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token
  if (!idUser) {
    res.json(null);
  }
  const { productId } = req.params; //id del producto a añadir
  let updatedUser = null;
  try {
    const foundUser = await User.findOne({
      $and: [{ _id: idUser }, { "cart.productId": productId }],
    });

    if (!foundUser) {
      // si no existe ese producto en el carrito del usuario

      updatedUser = await User.findByIdAndUpdate(
        idUser,
        {
          $push: { cart: { productId } }, //añade un producto al array de carrito
        },
        { new: true }
      ).populate("cart.productId", "_id name image price");
    } else {
      updatedUser = await User.findOneAndUpdate(
        // para encontrar el elemento a actualizar y el indice del carrito
        { $and: [{ _id: idUser }, { "cart.productId": productId }] },
        { $inc: { "cart.$.quantity": 1 } }, // el $ es usado para saber cual es el indice a actualizar
        // incrementa en uno la cantidad de ese produccto
        { new: true }
      )
        .populate("cart.productId", "_id name image price")
        .select({ cart: 1 });
    }

    const productFound = updatedUser.cart.find((eachProduct) => {
      return eachProduct.productId._id.toString() === productId;
    });
    res.json(productFound);
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/cart/:productId/pull" disminute cantidad del producto del array del carrito del usuario y si es 0 lo elimina
router.patch("/:productId/pull", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token
  const { productId } = req.params; //id del producto a añadir
  let updatedUser = null;
  try {
    const foundUser = await User.findOne(
      {
        $and: [{ _id: idUser }, { "cart.productId": productId }],
      },
      { "cart.$": 1 }
    ); // para que devuelva solo ese producto dentro del array

    if (foundUser.cart[0].quantity > 1) {
      //si encuentra el producto que es mayor a cantidad 1, resta, y si no lo borra porque tiene cantidad 1 y va a ser 0

      updatedUser = await User.findOneAndUpdate(
        { $and: [{ _id: idUser }, { "cart.productId": productId }] },
        { $inc: { "cart.$.quantity": -1 } },
        { new: true }

        // incrementa en uno la cantidad de ese produccto
      )
        .populate("cart.productId", "_id name image price")
        .select({ cart: 1 });
    } else {
      updatedUser = await User.findByIdAndUpdate(
        idUser,
        {
          $pull: { cart: { productId: productId } },
        },
        { new: true }
      )
        .populate("cart.productId", "_id name image price")
        .select({ cart: 1 });
    }

    const productFound = updatedUser.cart.find((eachProduct) => {
      return eachProduct.productId._id.toString() === productId;
    });

    res.json(productFound);
  } catch (err) {
    next(err);
  }
});

// PUT "/api/cart/deleteall" vacía carrito
router.put("/deleteall", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token

  try {
    await User.findByIdAndUpdate(idUser, { cart: [] }); // quita todos los elementos del array de ese usuario

    res.json([]);
  } catch (err) {
    next(err);
  }
});

//GET  "/api/cart/total" devuelve la cantidad total del carrito
router.get("/total", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const response = await User.findById(userId).populate(
      "cart.productId", // hay que ponerla propiedad dentro del carrito
      "_id name image price"
    ); //* retorna solo los campos especificados dentro del string, separados por espacios

    const total = response.cart.reduce((accumulator, eachProduct) => {
      return accumulator + eachProduct.quantity * eachProduct.productId.price;
    }, 0);

    res.json(total); // retorna el total del carrito de ese usuario
  } catch (err) {
    next(err);
  }
});
module.exports = router;
