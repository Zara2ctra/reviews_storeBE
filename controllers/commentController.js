const {Comment} = require('../models/models')

class CommentController {
    async create(req, res) {
        const {userId, reviewId, comment_text} = req.body;
        const comment = await Comment.create({userId: userId, reviewId: reviewId, comment_text});
        return res.json({message: "Created", comment})
    }

    async getAll(req, res) {
        const {reviewId} = req.body;
        const comment = await Comment.findAll({where: {reviewId: reviewId}});
        return res.json(comment)
    }

    async delete(req, res) {
        let {id} = req.params;
        await Comment.destroy({where: {id: id}});
        return res.json({message: "Deleted"})
    }
}

module.exports = new CommentController();