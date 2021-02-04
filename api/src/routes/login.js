const server = require("express");
const router = server.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");


router.post("/", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        status: "error",
        code: "unauthorized",
        message: "Invalid username and / or password",
        info,
      });
    } else {
      console.log(user.dataValues);
      return res.send(
        jwt.sign(
          user.toJSON(),
          "jwt-secret"
        )
      );
    }
  })(req, res, next);
});


module.exports = router;
