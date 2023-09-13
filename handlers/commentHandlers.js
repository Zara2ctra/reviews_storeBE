const {Comment} = require("../models/models.js");

module.exports = (io, socket) => {

    const getComments = async () => {
        const comments = await Comment.findAll({where: {reviewId: socket.reviewId}});
        io.in(socket.reviewId).emit('comments', comments);
    }

    const addComment = async (comment) => {
        await Comment.create({comment_text: comment.comment_text, userId: comment.userId, reviewId: comment.reviewId});
        await getComments();
    }

    socket.on('comment:get', getComments)
    socket.on('comment:add', addComment)
}