const axios = require('axios');
const {User} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, name) => {
    return jwt.sign(
        {id, email, name},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}


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

            let user = await User.findOne({where: {name: data.login}});
            let token, role
            if (user) {
                role = user.role
                token = generateJwt(user.id, user.email, user.name);
            } else {
                const hashPassword = await bcrypt.hash(`${data.id}`, 5);
                user = await User.create({
                    name: data?.login,
                    email: `githubemail${data.id}@gmail.com`,
                    password: hashPassword
                });
                role = user.role
                token = generateJwt(data.user.id, data.user.email, data.user.name);
            }
            return {token, role};
        } catch (error) {
            console.log(error)
        }
    };
}

module.exports = new GithubController();