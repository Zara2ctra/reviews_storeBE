const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.create);
router.put("/:id", reviewController.edit);
router.get("/user/:id", reviewController.userPageReviews)
router.get("/search", reviewController.searchReview);
router.get("/recent", reviewController.getRecent);
router.get("/recent/:type", reviewController.getPopularType);
router.get("/popular", reviewController.getPopular);
router.get("/popular/:type", reviewController.getRecentType);
router.get("/", reviewController.getAll);
router.get("/id/:id", reviewController.getOne);
router.delete("/:id", reviewController.delete);
router.post("/delete", reviewController.deleteMultiply)

module.exports = router;