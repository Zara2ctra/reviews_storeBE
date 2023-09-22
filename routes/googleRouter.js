const Router = require("express");
const router = new Router();
const googleController = require("../controllers/googleController.js");

router.get('/userData', (req, res) => {
    const accessToken = req.query.accessToken;
    googleController.getUserData(accessToken).then((resp) => res.json(resp))
});

module.exports = router;
