const RatingService = require('../services/ratingService')

class RatingController {

    async changeRating(req, res) {
        if (req.body.userId && req.body.reviewId && req.body.rate) {
            const rate = await RatingService.changeRating(req.body);
            return res.json(rate)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }

    async getReviewRating(req, res) {
        if (req.params.id) {
            const rate = await RatingService.getReviewRating(req.params);
            return res.json(rate)
        } else {
            return res
                .status(400)
                .send({ message: 'Bad request.' });
        }
    }
}

module.exports = new RatingController();