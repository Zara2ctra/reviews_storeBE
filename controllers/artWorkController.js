const {ArtWork} = require('../models/models')

class ArtWorkController {
    async create(req, res) {
        const {name, type} = req.body;
        const artWork = await ArtWork.create({name, type})
        return res.json(artWork)
    }

    async getAll(req, res) {
        const artWork = await ArtWork.findAll();
        return res.json(artWork)
    }
}

module.exports = new ArtWorkController();