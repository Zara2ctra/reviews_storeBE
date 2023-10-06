const GithubService = require('../services/githubService')


class GithubController {

    async getAccessToken(req, res) {
        if (req.query.code) {
            const accessToken = await GithubService.getAccessToken(req.query.code)
            return res.json(accessToken)
        } else {
            return res
                .status(500)
                .send({ message: 'Internal' });
        }
    }

    async getUserData(req, res) {
        if (req.query.accessToken) {
            const user = await GithubService.getUserData(req.query.accessToken);
            return res.json(user);
        } else {
            return res
                .status(500)
                .send({ message: 'Internal' });
        }
    };
}

module.exports = new GithubController();