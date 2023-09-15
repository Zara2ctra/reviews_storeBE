const Router = require("express");
const router = new Router();
const likeController = require("../controllers/likeController");

router.post("/", likeController.toggleLike);
router.get("/", likeController.getAll);
router.post("/status", likeController.getUserStatus);
router.get("/:id", likeController.getUserLikes);

module.exports = router;