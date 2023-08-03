const router = require("express").Router();

const Platform = require("../models/Platform.model");

// GET "/platform" returns all the platforms
 router.get("/", async (req, res, next) => {
  try {
    const response = await Platform.find()
      .select({ name: 1 })
      .sort({ name: 1 });
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
