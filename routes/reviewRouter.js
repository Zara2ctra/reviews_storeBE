const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.create);
router.put("/:id", reviewController.edit);
router.get("/recent", reviewController.getRecent);
router.get("/recent/:type", reviewController.getPopularType);
router.get("/popular", reviewController.getPopular);
router.get("/popular/:type", reviewController.getRecentType);
router.get("/", reviewController.getAll);
router.get("/id/:id", reviewController.getOne);
router.delete("/id/:id", reviewController.delete);

module.exports = router;