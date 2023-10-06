const ArtWorkService = require('../services/artworkService')

class ArtWorkController {
    async create(req, res) {
        if (req.body.artworkName && req.body.artworkType) {
            let artwork = await ArtWorkService.create(req.body);
            return res.json(artwork)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }

    async getAllById(req, res) {
        if (req.body.artworksId) {
            let artworks = await ArtWorkService.getAllById(req.body);
            return res.json(artworks)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }


    async getAllByType(req, res) {
        if (req.body.type) {
            let artworks = await ArtWorkService.getAllByType(req.body);
            return res.json(artworks)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }

    async getOne(req, res) {
        if (req.params) {
            let artwork = await ArtWorkService.getOne(req);
            return res.json(artwork)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }
}

module.exports = new ArtWorkController();