const LikeService = require('../services/likeService')

class LikeController {
    async toggleLike(req, res) {
        if (req.body.userId && req.body.reviewId) {
            const status = await LikeService.toggleLike(req.body);
            return res.json(status)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }

    async getUserStatus(req,res) {
        if (req.body.userId && req.body.reviewId) {
            const status = await LikeService.getUserStatus(req.body);
            return res.json(status)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }

    async getUserLikes(req, res) {
        if (req.params.id) {
            const count = await LikeService.getUserLikes(req.params);
            return res.json(count)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }

    async getAll(req, res) {
        const likes = await LikeService.getAll();
        return res.json(likes)
    }
}

module.exports = new LikeController();