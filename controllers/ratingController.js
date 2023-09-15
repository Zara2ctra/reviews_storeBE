const {Rating, Review} = require('../models/models')

class RatingController {
    async changeRating(req, res) {
        const {rate, userId, reviewId} = req.body;
        const existingRate = await Rating.findOne({
            where: {
                userId: userId,
                reviewId: reviewId
            }
        });

        if (existingRate) {
            existingRate.rate = rate;
            await existingRate.save();
            return res.json(rate);
        } else {
            await Rating.create({rate, userId, reviewId});
            return res.json(rate);
        }
    }

    async getReviewRating(req, res) {
        const {id} = req.params;
        const {rows, count} = await Rating.findAndCountAll({
            where: {reviewId: id}
        });

        const ratingSum = rows.reduce((sum, rating) => {
            return sum + rating.rate
        }, 0)
        let calculatedRate = (ratingSum / count).toFixed(1);
        if (isNaN(calculatedRate)) {
            calculatedRate = 0
        }

        const reviewData = await Review.findByPk(id);
        reviewData.rating = calculatedRate || reviewData.rating;
        await reviewData.save()

        return res.json({calculatedRate, count})
    }
}

module.exports = new RatingController();