const Router = require("express");
const router = new Router();
const artWorkController = require("../controllers/artWorkController.js");

router.post("/", artWorkController.create);
router.get("/", artWorkController.getAllByType);
router.get("/:id", artWorkController.getOne);
router.get("/byId", artWorkController.getAllById);

module.exports = router;