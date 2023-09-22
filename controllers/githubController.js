const axios =  require('axios');
const {User} = require("../models/models");
const {DataTypes} = require("sequelize");


class GithubController {
    async getAccessToken(code) {
        try {
            const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}`;
            const {data} = await axios.post(
                `https://github.com/login/oauth/access_token${params}`,
                {},
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getUserData(accessToken) {
        try {
            const {data} = await axios.get('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return data;
        } catch (error) {
            return null;
        }
    };
}

module.exports = new GithubController();