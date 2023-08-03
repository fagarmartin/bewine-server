const router = require("express").Router();

const Category = require("../models/Category.model");

//
router.get("/", async (req, res, next) => {
  try {
    const response = await Category.find()
      .select({ name: 1 })
      .sort({ name: 1 });
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
