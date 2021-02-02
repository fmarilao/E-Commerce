const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

//Verificar Token
let verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        err,
      });
    }
    //Obtener la información del payload en las rutas
    req.user = decoded.user;
    next();
  });
};

//Verify Role
let verifyRole = (req, res, next) => {
  let role = req.user.role;
  parseInt(role);
  if (role === 1) {
    next();
  } else {
    return res.json({
      err: {
        message: "El usuario no tiene permisos",
      },
    });
  }
};

module.exports = { verifyToken, verifyRole };
