const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload", // recibir el payload despues de validar el toke
  getToken: (req) => {
    if (!req.headers || !req.headers.authorization) {
      
      return null;
    }
    if (req.headers.authorization) {
      const tokenArr = req.headers.authorization.split(" ");
      const tokenType = tokenArr[0];
      const token = tokenArr[1];
      if (tokenType !== "Bearer") {
        console.log("Token de tipo incorrecto");
        return null;
      }
      console.log("Token entregado");
      return token;
    } else {
      return null;
    }
  },
});

module.exports = isAuthenticated;
