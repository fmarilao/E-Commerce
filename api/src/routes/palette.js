const server = require('express').Router();
const { Palette } = require("../db.js");
const Sequelize = require('sequelize');

server.get('/', async (req, res, next) => {
    try {
        const palettes = await Palette.findAll()
        res.json(palettes);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

module.exports = server;