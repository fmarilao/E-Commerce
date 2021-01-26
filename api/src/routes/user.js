const server = require("express");
const bcrypt = require("bcrypt");
const router = server.Router();
const { User } = require("../db.js");

//Crear Usuario
router.post("/", (req, res) => {
  const {
    name,
    lastName,
    dni,
    email,
    password,
    birthDate,
    gender,
    address,
    country,
    phone,
  } = req.body;

  const encryptedPass = bcrypt.hashSync(password, 10);

  User.create({
    name,
    lastName,
    dni,
    email,
    password: encryptedPass,
    birthDate,
    gender,
    address,
    country,
    phone,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Actualizar Usuario
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  const {
    name,
    lastName,
    dni,
    email,
    password,
    birthDate,
    gender,
    address,
    country,
    phone,
  } = req.body;

  const encryptedPass = bcrypt.hashSync(password, 10);

  User.update(
    {
      name,
      lastName,
      dni,
      email,
      password: encryptedPass,
      birthDate,
      gender,
      address,
      country,
      phone,
    },
    { where: { id: id } }
  )
    .then((user) => {
      res.status(200).send("Se actualizó el usuario");
    })
    .catch((err) =>
      res.status(400).send("Hubo un error al intentar actualizar")
    );
});

//Obtener todos los usuarios
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    res.status(500).send({
      message: "There has been an error",
    });
    next(e);
  }
});

//Eliminar Usuario
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then((user) => {
      if (user) {
        res.status(200).send(`Se borró el usuario ${user}`);
      } else {
        res.status(400).send(`No se encontró el usuario con id ${id}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
