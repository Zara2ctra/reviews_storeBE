const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter.js");
const artWorkRouter = require("./artWorkRouter.js");
const reviewRouter = require("./reviewRouter.js");
const tagRouter = require("./tagRouter.js");
const commentRouter = require("./commentRouter.js");
const likeRouter = require("./likeRouter.js");

router.use("/user", userRouter);
router.use("/artWork", artWorkRouter);
router.use("/rewiew", reviewRouter);
router.use("/tag", tagRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);


module.exports = router;