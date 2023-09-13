const {Tag} = require('../models/models')

class TagController {
    async create(req, res) {
        const {name, reviewId} = req.body;
        await Tag.create({})
    }

    async getAll(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new TagController();