const ApiError = require("../error/ApiError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/models.js");

const generateJwt = (id, email, name) => {
    return jwt.sign(
        {id, email, name},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}

class UserService {

    async registration(data, next) {
        const {email, password, name} = data.body;
        const candidate = await User.findOne(({where: {email}}));
        if (candidate) {
            return next(ApiError.badRequest("A user with this email address already exists"));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({name, email, password: hashPassword});
        const token = generateJwt(user.id, user.email, user.name);
        const role = user.role
        return {token, role};
    }

    async login(email, password, next) {
        const user = await User.findOne(({where: {email}}));

        if (!user) {
            return next(ApiError.unauthorized("Incorrect mail"));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.unauthorized("Incorrect password"));
        }

        const token = generateJwt(user.id, user.email, user.name);
        const role = user.role
        return {token, role};
    }

    async check(data) {
        const user = await User.findOne({where: {id: data.user.id}});
        const token = generateJwt(user.id, user.email, user.name);
        const role = user.role
        return {token, role};
    }

    async setAdmin(id) {
        const user = await User.findByPk(id);
        user.role = "ADMIN";
        await user.save();
        return user;
    }

    async getAll() {
        return await User.findAll({attributes: ['id', 'name', 'email']});
    }

    async getOne(id) {
        return await User.findOne({
            attributes: ['name', 'id', 'email', 'role'],
            where: {id: id}
        })
    }

    async deleteUser(id) {
        await User.destroy({
            where: {id: id}
        });
    }
}


module.exports = new UserService();