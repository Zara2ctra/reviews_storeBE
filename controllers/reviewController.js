const {Review, ArtWork, User, Comment} = require('../models/models')
const ApiError = require("../error/ApiError");
const {Op} = require("sequelize");
const cloudinary = require("cloudinary").v2;

class ReviewController {

    async create(req, res, next) {
        const {name, content_text, score, userId, artWorkId} = req.body;
        let imageUrl = null;

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

                imageUrl = result.secure_url;
            } catch (error) {
                return next(ApiError.internal("File upload failed"));
            }
        }

        const review = await Review.create({
            name,
            content_text,
            score,
            imageUrl,
            artWorkId,
            userId
        });
        return res.json(review);
    }

    async edit(req, res) {
        const {id} = req.params;
        const {name, content_text, score, artWorkId} = req.body;

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
        return res.json(existingReview);
    }

    async getRecent(req, res) {
        const recentReviews = await Review.findAll({
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
        return res.json(recentReviews)
    }

    async getPopular(req, res) {
        const recentReviews = await Review.findAll({
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
        return res.json(recentReviews)
    }

    async getRecentType(req, res) {
        const {type} = req.params
        const recentReviews = await Review.findAll({
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
        return res.json(recentReviews)
    }

    async getPopularType(req, res) {
        const {type} = req.params

        const recentReviews = await Review.findAll({
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
        });
        return res.json(recentReviews)
    }

    async getAll(req, res) {
        const reviews = await Review.findAll({
            include: [
                {
                    attributes: ['name', 'type'],
                    model: ArtWork
                },
                {
                    attributes: ['id','name', 'email'],
                    model: User
                }],
            attributes: ['id', 'name', 'score', 'createdAt']
        })
        return res.json(reviews)
    }

    async userPageReviews(req, res) {
        const {id} = req.params
        const {count, rows} = await Review.findAndCountAll({
            include: [
                {
                    attributes: ['name', 'type'],
                    model: ArtWork
                },
            ],
            where: {userId: id}
        })

        return res.json({count: count, reviews: rows})
    }

    async getOne(req, res) {
        const {id} = req.params
        const review = await Review.findOne({
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
        return res.json(review)
    }


    async delete(req, res) {
        const {id} = req.params;
        await Review.destroy({where: {id: id}});
        return res.json({message: "Deleted"})
    }

    async deleteMultiply(req, res) {
        const {reviewsIds} = req.body;
        await Review.destroy({
            where: {
                id: {
                    [Op.in]: reviewsIds
                }
            }
        })
        return res.json({message: "Deleted"})
    }

    async searchReview(req, res) {
        const {query} = req.query;

        const reviews = await Review.findAll({
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
        });
        res.json(reviews);
    }
}

module.exports = new ReviewController();