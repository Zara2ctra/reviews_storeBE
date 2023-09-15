const {Like, Review} = require('../models/models')
const {Op} = require("sequelize");

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
            return res.json(false);
        } else {
            await Like.create({userId, reviewId});
            return res.json(true);
        }
    }

    async getUserStatus(req,res) {
        const {userId, reviewId} = req.body;
        const existingLike = await Like.findOne({
            where: {
                userId: userId,
                reviewId: reviewId
            }
        });
        const likeExists = !!existingLike;

        return res.json(likeExists)
    }

    async getUserLikes(req, res) {
        const {id} = req.params
        const reviews = await Review.findAll({
            attributes: ['id'],
            where: {
                userId: id,
            },
        });

        const reviewIds = reviews.map(review => review.id)
        const {count} = await Like.findAndCountAll({
            where: {
                reviewId: {
                    [Op.in]: reviewIds,
                }
            }
        })

        return res.json(count);
    }

    async getAll(req, res) {
        const likes = await Like.findAll();
        return res.json(likes)
    }
}

module
    .exports = new LikeController();