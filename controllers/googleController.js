const GoogleService = require('../services/googleService')

class GoogleController {

    async getUserData(req, res) {
        if (req.query.accessToken) {
            const user = await GoogleService.getUserData(accessToken);
            return res.json(user)
        } else {
            return res
                .status(500)
                .send({ message: 'Internal' });
        }
    };
}

module.exports = new GoogleController();