const server = require("express").Router();
const { Category } = require("../db.js");

server.get("/:nombreCat", (req, res, next) => {
  let category = req.params.nombreCat;
  Category.findOne({
    where: {
      name: category,
    },
  }).then((categories) => {
    if (!categories) {
      res.status(404).send("Error");
    } else {
      res.send(categories);
    }
  });
});

module.exports = server;
