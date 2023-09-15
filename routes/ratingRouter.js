const Router = require("express");
const router = new Router();
const ratingController = require("../controllers/ratingController");

router.post("/", ratingController.changeRating);
router.get("/:id", ratingController.getReviewRating)

module.exports = router;