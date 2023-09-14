const {Comment, User} = require("../models/models.js");

module.exports = (io, socket) => {

    const getComments = async () => {
        const comments = await Comment.findAll({
            where: {reviewId: socket.reviewId},
            include: User,
        });
        io.in(socket.reviewId).emit('comments', comments);
    }

    const addComment = async (comment) => {
        await Comment.create({comment_text: comment.comment_text, userId: comment.userId, reviewId: comment.reviewId});
        await getComments();
    }

    const removeComment = async (commentId) => {
        await Comment.destroy({where: {id: commentId}})
        await getComments()
    }

    socket.on('comment:get', getComments)
    socket.on('comment:add', addComment)
    socket.on('comment:remove', removeComment)
}