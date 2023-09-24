const Router = require("express");
const router = new Router();
const githubController = require("../controllers/githubController.js");

router.get('/accessToken', (req, res) => {
    const code = req.query.code;
    githubController.getAccessToken(code).then((resp) => res.json(resp));
});
router.get('/userData', (req, res) => {
    console.log("token")
    const accessToken = req.query.accessToken;
    githubController.getUserData(accessToken).then((resp) => res.json(resp));
});

module.exports = router;