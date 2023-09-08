const {Like} = require('../models/models')

class LikeController {
    async toggleLike(req, res) {
        const {userId, reviewId} = req.body;
        const existingLike = await Like.findOne({
            where: {
                userId: userId,
                reviewId: reviewId
            }
        });

        if (existingLike) {
            await Like.destroy({
                where: {
                    userId: userId,
                    reviewId: reviewId
                }
            });
            return { message: "Like removed" };
        } else {
            await Like.create({ userId, reviewId });
            return res.json({ message: "Like added" });
        }
    }

    async getAll(req, res) {
        const likes = await Like.findAll();
        return res.json(likes)
    }
}

module.exports = new LikeController();