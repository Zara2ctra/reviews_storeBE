const {ArtWork} = require('../models/models')

class ArtworkService {
    async create(data) {
        const {artworkName, artworkType} = data;
        const existingArtWork = await ArtWork.findOne({
            where: {
                name: artworkName,
                type: artworkType
            }
        });

        if (!existingArtWork) {
            return await ArtWork.create({name: artworkName, type: artworkType})
        }

        return existingArtWork
    }

    async getAllById(data) {
        const {artworksId} = data;
        return await ArtWork.findAll({where: {id: artworksId}})
    }


    async getAllByType(data) {
        const {type} = data;
        return await ArtWork.findAll({where: {type: type}})
    }

    async getOne(data) {
        const {id} = data
        return await ArtWork.findOne({where: {id: id}})
    }
}

module.exports = new ArtworkService();