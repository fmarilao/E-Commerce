const server = require("express").Router();
const { Category } = require("../db.js");

server.get("/:cat", (req, res, next) => {
  let category = req.params.cat;
  Category.findOne({
    where: {
      name: category,
    },
  }).then((category) => {
    if (!category) {
      res.status(404).send("Error");
    } else {
      res.send(category);
    }
  });
});

module.exports = server;
