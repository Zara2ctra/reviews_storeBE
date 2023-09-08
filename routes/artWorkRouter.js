const Router = require("express");
const router = new Router();
const artWorkController = require("../controllers/artWorkController.js");

router.post("/", artWorkController.create);
router.get("/", artWorkController.getAll);

module.exports = router;