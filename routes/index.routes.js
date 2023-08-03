const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth",require("./auth.routes"))
router.use("/upload",require("./upload.routes")) //cloudinary route
router.use("/admin",require("./admin.routes")) // administrator route
router.use("/cart",require("./cart.routes")) //rcart route
router.use("/products",require("./products.routes")) //products route
router.use("/wishlist", require("./wishList.routes")) // wishlist route
router.use("/historial", require("./historial.routes")) // historial purchase route
router.use("/payment", require("./payment.routes"))// payment gateway route
router.use("/comentario", require("./comentario.routes")) //  commments route
router.use("/category", require("./category.routes")) // category route
router.use("/platform", require("./platform.routes")) // platform route
module.exports = router;
