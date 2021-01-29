const server = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = server.Router();
const { User } = require("../db.js");

const { JWT_SECRET, JWT_EXPIRES } = process.env;

router.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } }).then((userDB) => {
    if (!userDB) {
      return res.status(400).json({
        err: "Datos incorrectos",
      });
    }
    if (!bcrypt.compareSync(password, userDB.password)) {
      return res.status(400).json({
        err: "Datos incorrectos",
      });
    }

    //Generamos el JWT
    let token = jwt.sign(
      {
        user: userDB,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      user: userDB,
      loggedIn: true,
      token,
    });
  });
});

module.exports = router;
