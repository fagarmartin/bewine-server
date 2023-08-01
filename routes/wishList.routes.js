const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Product = require("../models/Product.model");
const User = require("../models/User.model");

//GET "/api/wishlist" devuelve todos los productos de la lista de deseos
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const response = await User.findById(userId)
      .populate("wishList", "name image price")
      .select({ wishlist: 1 });

    res.json(response.wishList);
  } catch (error) {
    next(error);
  }
});

//GET "/api/wishlist/in/:productId" devuelve si ese usuario tiene ese producto en su lista de deseos
router.get("/in/:productId", isAuthenticated, async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const userId = req.payload._id;
    const response = await User.findOne({
      $and: [{ _id: userId }, { wishList: { $in: [productId] } }],
    });

    // { favouriteFoods: { "$in" : ["sushi"]} }
    if (response) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    next(error);
  }
});
//GET "/api/wishlist" devuelve todos los productos de la lista de deseos
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const response = await User.findById(userId)
      .populate("wishList.", "name image price")
      .select({ wishlist: 1 });

    res.json(response.wishList);
  } catch (error) {
    next(error);
  }
});

//PATH "/api/wishlist/:productId/add" añade un producto a la lista de deseos del usuario
router.patch("/:productId/add", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id;
  const { productId } = req.params;

  try {
    await User.findByIdAndUpdate(
      idUser,
      {
        $addToSet: { wishList: productId },
      },
      { new: true }
    );

    res.json("Deseo Añadido");
  } catch (error) {
    next(error);
  }
});

//PATH "/api/wishlist/:productId/pull" quita un producto del array de la lista de deseos del usuario
router.patch("/:productId/pull", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id;
  const { productId } = req.params;
  try {
    const response = await User.findByIdAndUpdate(
      idUser,
      {
        $pull: { wishList: productId },
      },
      { new: true }
    );
    res.json("deseo eliminado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
