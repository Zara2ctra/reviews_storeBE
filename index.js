require("dotenv").config()
const express = require("express");
const sequelize = require("./db.js");
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const router = require("./routes/index.js")
const errorHandler = require("./middleware/ErrorHandlerMiddleware.js")
const registerCommentHandlers = require('./handlers/commentHandlers')
const {User, Review, ArtWork, Rating, Tag, Comment} = require("./models/models");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use("/api", router);
app.use(errorHandler);

const server = http.createServer(app);
const socketIO = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

const onConnection = (socket) => {
    const {reviewId} = socket.handshake.query;
    socket.reviewId = reviewId;
    socket.join(reviewId)

    registerCommentHandlers(socketIO, socket)

    socket.on('disconnect', () => {
        socket.leave(reviewId)
    })
}

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        socketIO.on('connection', onConnection);
        server.listen(PORT, () => console.log(`Server ready. Port: ${PORT}`));
    } catch (e) {
        console.log(e, "???")
    }
}

start();
// async function deleteDataFromTable() {
//     try {
//         await User.drop({ cascade: true })
//         await Review.drop({ cascade: true })
//         await Rating.drop({ cascade: true })
//         await Tag.drop({ cascade: true })
//         await ArtWork.drop({ cascade: true })
//         await Comment.drop({ cascade: true })
//         console.log('All data deleted from the table');
//     } catch (error) {
//         console.error('Error deleting data:', error);
//     }
// }
//
// await deleteDataFromTable()





