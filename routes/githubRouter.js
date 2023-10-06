const Router = require("express");
const router = new Router();
const githubController = require("../controllers/githubController.js");

router.get('/accessToken', githubController.getAccessToken);
router.get('/userData', githubController.getUserData);

module.exports = router;