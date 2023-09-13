const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js")

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth",authMiddleware, userController.check)
router.get("/", userController.getAll);
router.post("/id", userController.deleteUser);

module.exports = router;