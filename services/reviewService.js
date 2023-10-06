const {Review, ArtWork, User, Comment} = require('../models/models')
const ApiError = require("../error/ApiError");
const {Op} = require("sequelize");
const cloudinary = require("cloudinary").v2;

class ReviewService {

    async create(data, next) {
        const {name, content_text, score, userId, artWorkId} = data.body;
        let imageUrl = null;

        if (data.files) {
            const {tempFilePath} = data.files.file;
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_KEY,
                api_secret: process.env.CLOUD_SECRET
            });

            try {
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    folder: "reviews",
                });

                imageUrl = result.secure_url;
            } catch (error) {
                return next(ApiError.internal("File upload failed"));
            }
        }

        return await Review.create({
            name,
            content_text,
            score,
            imageUrl,
            artWorkId,
            userId
        });
    }

    async edit(req, data, next) {
        const {id} = data.params;
        const {name, content_text, score, artWorkId} = data.body;

        const existingReview = await Review.findByPk(id);
        existingReview.name = name || existingReview.name;
        existingReview.content_text = content_text || existingReview.content_text;
        existingReview.score = score || existingReview.score;
        existingReview.artWorkId = artWorkId || existingReview.artWorkId

        if (req.files) {
            const {tempFilePath} = req.files.file;
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_KEY,
                api_secret: process.env.CLOUD_SECRET
            });

            try {
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    folder: "reviews",
                });

                existingReview.imageUrl = result.secure_url;
            } catch (error) {
                return next(ApiError.internal("File upload failed"));
            }
        }

        await existingReview.save();
        return existingReview;
    }

    async getRecent() {
        return await Review.findAll({
            order: [['createdAt', 'DESC']],
            limit: 6,
            include: [
                {
                    model: ArtWork
                },
                {
                    attributes: ['id', 'name'],
                    model: User,
                }
            ]
        });
    }

    async getPopular() {
        return await Review.findAll({
            order: [['rating', 'DESC']],
            limit: 6,
            include: [
                {
                    model: ArtWork
                },
                {
                    attributes: ['id', 'name'],
                    model: User
                }
            ]
        });
    }

    async getRecentType(type) {
        return await Review.findAll({
            include: [
                {
                    model: ArtWork,
                    where: {type},
                },
                {
                    attributes: ['id', 'name'],
                    model: User
                }],
            order: [['createdAt', 'DESC']],
            limit: 6,
        });
    }

    async getPopularType(type) {
        return await Review.findAll({
            include: [
                {
                    model: ArtWork,
                    where: {type},
                },
                {
                    attributes: ['id', 'name'],
                    model: User
                }],
            order: [['rating', 'DESC']],
            limit: 6,
        })
    }

    async getAll() {
        return await Review.findAll({
            include: [
                {
                    attributes: ['name', 'type'],
                    model: ArtWork
                },
                {
                    attributes: ['id', 'name', 'email'],
                    model: User
                }],
            attributes: ['id', 'name', 'score', 'createdAt']
        })
    }

    async userPageReviews(id) {
        const {count, rows} = await Review.findAndCountAll({
            include: [
                {
                    attributes: ['name', 'type'],
                    model: ArtWork
                },
            ],
            where: {userId: id}
        })

        return {count: count, reviews: rows}
    }

    async getOne(id) {
        return await Review.findOne({
            include: [
                {
                    model: ArtWork
                },
                {
                    attributes: ['id', 'name'],
                    model: User
                }
            ],
            where: {id: id}
        })
    }


    async delete(id) {
        await Review.destroy({where: {id: id}});
    }

    async deleteMultiply(reviewsIds) {
        await Review.destroy({
            where: {
                id: {
                    [Op.in]: reviewsIds
                }
            }
        })
    }

    async searchReview(query) {
        return await Review.findAll({
            attributes: ['id', 'name', 'content_text'],
            where: {
                [Op.or]: [
                    {
                        '$review.name$': {
                            [Op.iLike]: `%${query}%`,
                        },
                    },
                    {
                        '$review.content_text$': {
                            [Op.iLike]: `%${query}%`,
                        },
                    },
                    {
                        '$comments.comment_text$': {
                            [Op.iLike]: `%${query}%`,
                        },
                    },
                    {
                        '$art_work.name$': {
                            [Op.iLike]: `%${query}%`,
                        },
                    },
                    {
                        '$art_work.type$': {
                            [Op.iLike]: `%${query}%`,
                        },
                    },
                ],
            },
            include: [
                {
                    model: ArtWork,
                    attributes: ['name', 'type'],
                },
                {
                    model: Comment,
                    attributes: ['comment_text'],
                }
            ],
        })
    }
}

module.exports = new ReviewService();