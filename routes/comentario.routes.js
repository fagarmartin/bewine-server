const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Comentario = require("../models/Comentario.model");

//POST "/api/comentario/:productId/create" recoge los datos del formulario de crear comentario
router.post("/:productId/create", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id;
  const { productId } = req.params;
  try {
    const checkComentario = await Comentario.find({
      product: productId,
      user: idUser,
    });

    const createComentario = await Comentario.create({
      user: idUser,
      products: productId,
      comentario: req.body.comentario,
    });
    res.json("comentario creado");
  } catch (error) {
    next(error);
  }
});

// GET "/api/comentario/:productId"
router.get("/:productId", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id;
  const { productId } = req.params;
  try {
    const response = await Comentario.find({ products: productId }).populate(
      "user",
      "username"
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
