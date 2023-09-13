const {Review, ArtWork} = require('../models/models')
const ApiError = require("../error/ApiError");
const {where} = require("sequelize");
const sequelize = require("sequelize");
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
        const {name, content_text, score, artworkId} = req.body;

        const existingReview = await Review.findByPk(id);
        existingReview.name = name || existingReview.name;
        existingReview.content_text = content_text || existingReview.content_text;
        existingReview.score = score || existingReview.score;
        existingReview.artworkId = artworkId || existingReview.artworkId

        if (req.files) {
            const {img} = req.files;
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_KEY,
                api_secret: process.env.CLOUD_SECRET
            });

            const result = await cloudinary.uploader.upload(img.tempFilePath, {
                folder: "reviews",
            });

            existingReview.imageUrl = result.secure_url;
        }

        await existingReview.save();
        return res.json({message: 'Review updated successfully'});
    }

    async getRecent(req, res) {
        const recentReviews = await Review.findAll({
            order: [['updatedAt', 'DESC']],
            limit: 6,
            include: ArtWork,
        });
        return res.json(recentReviews)
    }

    async getPopular(req, res) {
        const recentReviews = await Review.findAll({
            order: [['rating', 'DESC']],
            limit: 6,
            include: ArtWork,
        });
        return res.json(recentReviews)
    }

    async getRecentType(req, res) {
        const {type} = req.params
        console.log(type)
        const recentReviews = await Review.findAll({
            order: [['updatedAt', 'DESC']],
            limit: 6,
            include: {
                model: ArtWork,
                where: {type},
            }
        });
        return res.json(recentReviews)
    }

    async getPopularType(req, res) {
        const {type} = req.params
        const recentReviews = await Review.findAll({
            order: [['rating', 'DESC']],
            limit: 6,
            include: {
                model: ArtWork,
                where: {type},
            }
        });
        return res.json(recentReviews)
    }

    async getAll(req, res) {
        const review = await Review.findAll()
        return res.json(review)
    }

    async getOne(req, res) {
        const {id} = req.params
        const review = await Review.findOne({include: ArtWork,where: {id: id}})
        return res.json(review)
    }


    async delete(req, res) {
        const {id} = req.params;
        await Review.destroy({where: {id: id}});
        return res.json({message: "Deleted"})
    }
}

module.exports = new ReviewController();