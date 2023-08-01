const router = require("express").Router();

const uploader = require("../middlewares/cloudinary.config");
//POST "/api/upload"
router.post("/", uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    res.status(400).json("");
    // next("no file uploaded")
    return;
  }

  res.json({ image: req.file.path });
});

module.exports = router;
