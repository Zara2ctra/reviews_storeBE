const Router = require("express");
const router = new Router();
const googleController = require("../controllers/googleController.js");

router.get('/userData', googleController.getUserData);

module.exports = router;
