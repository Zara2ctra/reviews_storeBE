const axios =  require('axios');
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

class GoogleService {

    async getUserData(accessToken) {
        try {
            const {data} = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            let user  = await User.findOne({where: {email: data.email}});
            let token, role
            if (user) {
                role = user.role
                token = generateJwt(user.id, user.email, user.name);
            } else {
                const hashPassword = await bcrypt.hash(`${data.sub}`, 5);
                user = await User.create({
                    name: data.name,
                    email: data.email,
                    password: hashPassword
                });
                role = user.role
                token = generateJwt(user.id, user.email, user.name);
            }
            return {token, role};
        } catch (error) {
            return null;
        }
    };
}

module.exports = new GoogleService();