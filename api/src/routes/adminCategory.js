const server = require('express')
const router = server.Router();
const { Category } = require('../db.js');

router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body
        const category = await Category.create({name, description})
        res.status(201).json(category)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
});

router.put('/:categoryId', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const { categoryId } = req.params
        const category = await Category.update( {name, description }, { where: {id: categoryId} } )
        res.json(category)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

router.delete('/:categoryId', async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.categoryId);
        category.destroy()
        res.json({message: "Category was deleted"})
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

module.exports = router;
