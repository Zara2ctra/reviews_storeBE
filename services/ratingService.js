const {Rating, Review} = require('../models/models')

class RatingService {
    async changeRating(data) {
        const {rate, userId, reviewId} = data;
        const existingRate = await Rating.findOne({
            where: {
                userId: userId,
                reviewId: reviewId
            }
        });

        if (existingRate) {
            existingRate.rate = rate;
            await existingRate.save();
            return rate;
        } else {
            await Rating.create({rate, userId, reviewId});
            return rate;
        }
    }

    async getReviewRating(data) {
        const {id} = data;
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

        return {calculatedRate, count};
    }
}

module.exports = new RatingService();