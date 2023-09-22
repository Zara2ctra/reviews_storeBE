const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter.js");
const artWorkRouter = require("./artWorkRouter.js");
const reviewRouter = require("./reviewRouter.js");
const tagRouter = require("./tagRouter.js");
const likeRouter = require("./likeRouter.js");
const ratingRouter = require("./ratingRouter.js");
const githubRouter = require("./githubRouter.js");
const googleRouter = require("./googleRouter.js");

router.use("/user", userRouter);
router.use("/artWork", artWorkRouter);
router.use("/review", reviewRouter);
router.use("/tag", tagRouter);
router.use("/like", likeRouter);
router.use("/rating", ratingRouter);
router.use("/github", githubRouter);
router.use("/google", googleRouter);


module.exports = router;