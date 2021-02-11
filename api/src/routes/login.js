const server = require("express");
const router = server.Router();
const { User } = require("../db.js");
const nodemailer = require('nodemailer');
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


// ============ Forgot Password ============ //

const token = Math.floor((Math.random() * 1000000) + 1);

router.post('/forgot', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
      if (!user){
        return res.status(400).json({
        err: "Invalid email",
      }).redirect('/')
      }
      user.update({
        ...user,
        passwordResetToken: token,
        passwordResetExpires: Date.now() + 500000
      }).then(()=>{
        const transporter = nodemailer.createTransport({
          host: "c2110783.ferozo.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
          user: 'shop@henryshop.ml', // generated ethereal user
          pass: 'RUq*bn/0fY', // generated ethereal password
          },
          
        })
        const resetLink = 'http://localhost:3000/login/reset'
        const mailOptions = {
          from: 'shop@henryshop.ml',
          to: req.body.email,
          subject: 'Password reset',
          html: `To reset your password click in the following link and then fill the token indicated below <br><a href=${resetLink}> Link </a><br>
          Your Token: ${token}`
        }

        transporter.sendMail(mailOptions, (err, success) => {
            if (err) {
                res.status(400).json({
        err: "ERROR SENDING EMAIL",
         })   } })
             })
  })
})

// ============ Reset Password ============ //

router.post('/reset', (req, res) => {
  console.log('token', req.query)
    User.findOne({
        where: {
            passwordResetToken: req.query.token
        }
      }
      ).then(async (user) => {
      console.log('user', user)
        if (!user) {
            res.redirect('/login');
        } else {
            const hasshed = await bcrypt.hash(req.body.password, 10)
            if (user.passwordResetExpires > Date.now()) {
                user.update({
                    ...user,
                    password: hasshed,
                    passwordResetExpires: null,
                    passwordResetToken: null,
                }).then(() => {
                    res.send({
                        result: 'Your password has been updated'
                    })
                })
            }
        }
    }).catch((err) => {
        res.status(404);
    })
})







module.exports = router;
