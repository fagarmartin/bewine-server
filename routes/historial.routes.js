const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Compras = require("../models/Compras.model");
const User = require("../models/User.model");

//GET "/api/historial" => devuelve todos los productos comprados del usuario
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;

  try {
    const response = await Compras.find({ user: userId }) //busca en la coleccion compras los productos que tengan esa ID de usuario
      .populate("productId", "name image price");

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//POST "/api/historial/add" añade compras del usuario al historial una vez pagadas
router.post("/add", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id;

  try {
    const foundUser = await User.findById(idUser).populate("cart.productId"); //coge el carrito del usuario y lo inserta en Compras

    const cloneCartArr = JSON.parse(JSON.stringify(foundUser.cart)); //clonar array del carrito

    cloneCartArr.map((eachProduct) => {
      //recorrer array y agregar nuevo campo user con la id del usuario

      eachProduct.totalPrice =
        eachProduct.productId.price * eachProduct.quantity;
      eachProduct.user = idUser;
      return eachProduct;
    });

    await Compras.insertMany(cloneCartArr); // insertar en Compras todo el carrito

    res.json("Carrito insertado en compras");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
