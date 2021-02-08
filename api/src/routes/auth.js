const server = require("express");
const router = server.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Google
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/login/google/callback", (req, res, next) => {
  passport.authorize("google", (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.redirect(`http://localhost:3000/login?error=401`);
    } else {
      const token = jwt.sign(user.toJSON(), "jwt-secret");
      res.redirect(`http://localhost:3000/loginuser?t=${token}`);
    }
  })(req, res, next);
});

//Facebook
// router.get("/login/facebook", passport.authenticate("facebook"));

router.get("/login/facebook", passport.authenticate("facebook"), (req, res) => {
  res.send("Logged in.");
});

router.get("/login/facebook/callback", (req, res, next) => {
  passport.authorize("facebook", (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.redirect(`http://localhost:3000/login?error=401`);
    } else {
      const token = jwt.sign(user.toJSON(), "jwt-secret");
      res.redirect(`http://localhost:3000/loginuser?t=${token}`);
    }
  })(req, res, next);
});

module.exports = router;
