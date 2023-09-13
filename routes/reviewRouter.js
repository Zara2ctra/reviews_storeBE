const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");
const artWorkController = require("../controllers/artWorkController");

router.post("/", reviewController.create);
router.put("/:id", reviewController.edit);
router.get("/recent", reviewController.getRecent);
router.get("/popular", reviewController.getPopular);
router.get("/:type", reviewController.getRecentType);
router.get("/:type", reviewController.getPopularType);
router.get("/", reviewController.getAll);
router.get("/id/:id", reviewController.getOne);
router.delete("/id/:id", reviewController.delete);

module.exports = router;