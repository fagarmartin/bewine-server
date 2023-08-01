const router = require("express").Router();

const User = require("../models/User.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

// POST "/api/auth/signup" registrar al usuario
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ errorMessage: "Todos los campos son requeridos" });
    return;
  }

  const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (!regexPattern.test(password)) {
    res
      .status(400)
      .json({
        errorMessage:
          "La contraseña es débil. Necesita al menos 1 mayúscula y un caracter especial y un mínimo de 8 caracteres",
      });
    return;
  }
  //verificar si el usuario esta registrado
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(400).json({ errorMessage: "Usuario ya registrado" });
      return;
    }

    //encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.json("Usuario creado");
  } catch (err) {
    next(err);
  }
});

// POST "/api/auth/login" validar credenciales del usuario
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      errorMessage: "Los campos email y contraseña son obligatorios",
    });
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res
        .status(400)
        .json({ errorMessage: "Usuario no registrado con ese correo" });
      return;
    }

    // contraseña valida
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Contraseña incorrecta" });
      return;
    }
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
      user: foundUser.username,
    };

    const authToken = jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "7d" } // expira en 7 dias
    );

    res.json({ authToken });
  } catch (err) {
    next(err);
  }
});

//GET "/api/auth/verify" indicarle al FE si el usuario esta logueado
router.get("/verify", isAuthenticated, (req, res, next) => {
  res.json({ payload: req.payload });
});

module.exports = router;
