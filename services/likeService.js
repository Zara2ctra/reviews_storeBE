const {Like, Review} = require('../models/models')
const {Op} = require("sequelize");

class LikeService {
    async toggleLike(data) {
        const {userId, reviewId} = data;
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
            return false;
        } else {
            await Like.create({userId, reviewId});
            return true;
        }
    }

    async getUserStatus(data) {
        const {userId, reviewId} = data;
        const existingLike = await Like.findOne({
            where: {
                userId: userId,
                reviewId: reviewId
            }
        });

        return !!existingLike;
    }

    async getUserLikes(data) {
        const {id} = data
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

        return count;
    }

    async getAll() {
        return await Like.findAll();
    }
}

module.exports = new LikeService();