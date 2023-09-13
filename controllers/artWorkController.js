const {ArtWork, Review} = require('../models/models')
const ApiError = require("../error/ApiError");

class ArtWorkController {
    async create(req, res) {
        const {artworkName, artworkType} = req.body;
        const existingArtWork = await ArtWork.findOne({
            where: {
                name: artworkName,
                type: artworkType
            }
        });

        if (!existingArtWork) {
            const artwork = await ArtWork.create({name: artworkName, type: artworkType})
            return res.json(artwork)
        }

        return res.json(existingArtWork)
    }

    async getAllById(req, res) {
        const {artworksId} = req.body;
        const artWork = await ArtWork.findAll({where: {id: artworksId}});
        return res.json(artWork)
    }


    async getAllByType(req, res) {
        const {type} = req.body;
        const artWork = await ArtWork.findAll({where: {type: type}});
        return res.json(artWork)
    }

    async getOne(req, res) {
        const {id} = req.params
        const artWork = await ArtWork.findOne({where: {id: id}});
        return res.json(artWork)
    }
}

module.exports = new ArtWorkController();