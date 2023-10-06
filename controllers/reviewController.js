const ReviewService = require('../services/reviewService')

class ReviewController {

    async create(req, res,) {
        if (req.body.userId && req.body.name) {
            const review = await ReviewService.create(req);
            return res.json(review)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async edit(req, res) {
        if (req.params.id) {
            const review = await ReviewService.edit(req);
            return res.json(review)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async getRecent(req, res) {
        const reviews = await ReviewService.getRecent();
        return res.json(reviews)
    }

    async getPopular(req, res) {
        const reviews = await ReviewService.getPopular();
        return res.json(reviews)
    }

    async getRecentType(req, res) {
        if (req.params.type) {
            const reviews = await ReviewService.getRecentType(req.params.type);
            return res.json(reviews)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async getPopularType(req, res) {
        if (req.params.type) {
            const reviews = await ReviewService.getPopularType(req.params.type);
            return res.json(reviews)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async getAll(req, res) {
        const reviews = await ReviewService.getAll();
        return res.json(reviews)
    }

    async userPageReviews(req, res) {
        if (req.params.id) {
            const reviews = await ReviewService.userPageReviews(req.params.id);
            return res.json(reviews)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async getOne(req, res) {
        if (req.params.id) {
            const reviews = await ReviewService.getOne(req.params.id);
            return res.json(reviews)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }


    async delete(req, res) {
        if (req.params.id) {
            await ReviewService.delete(req.params.id);
            return res.json({message: "Deleted"})
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async deleteMultiply(req, res) {
        if (req.body.reviewsIds) {
            await ReviewService.deleteMultiply(req.body.reviewsIds);
            return res.json({message: "Deleted"})
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async searchReview(req, res) {
        if (req.query.query) {
            const reviews = await ReviewService.searchReview(req.query.query);
            return res.json(reviews)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }
}

module.exports = new ReviewController();