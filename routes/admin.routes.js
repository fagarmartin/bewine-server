const router = require("express").Router();

const Product = require("../models/Product.model");

//POST "/api/admin/create" recoge los datos de creación de productos y los añade a la BD

router.post("/create", async (req, res, next) => {
  try {
    const { name, description, price, category, company, stock, image,platform,year } = req.body;
    console.log(req.body,"REQ BODY")
    if (
      name === "" ||
      !description ||
      !price ||
      !category ||
      !company ||
      !stock ||
      !image ||
      !platform ||
      !year
    ) {
      res
        .status(400)
        .json({ errorMessage: "Todos los campos son obligatorios." });
      return;
    }
    await Product.create({
      name,
      description,
      price,
      category,
      company,
      stock,
      image,
      platform,year
    });
    res.json("Documento creado");
  } catch (err) {
    console.log(err)
    next(err);
  }
});

//PUT "/api/admin/:id" recoge datos de edición de producto y edita en la BD
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, category, company, stock, image,platform,year } = req.body;

  if (!name || !description || !price || !category || !company || !stock || !image || !platform || !year) {
    res
      .status(400)
      .json({ errorMessage: "Todos los campos son obligatorios." });
    return;
  }

  try {
    const response = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, company, stock, image,platform,year },
      { new: true }
    );
    res.json("documento actualizado");
  } catch (err) {
    next(err);
  }
});

//DELETE "/api/admin/:id" borra un producto
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json("Documento borrado");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
