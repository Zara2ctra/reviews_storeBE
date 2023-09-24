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

class UserController {
    async registration(req, res, next) {
        const {email, password, name} = req.body;
        if ((!email) || (!password)) {
            return next(ApiError.badRequest("Incorrect email or password " + email + "  " + password))
        }
        const candidate = await User.findOne(({where: {email}}));
        if (candidate) {
            return next(ApiError.badRequest("A user with this email address already exists"));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({name, email, password: hashPassword});
        const token = generateJwt(user.id, user.email, user.name);
        const role = user.role
        return res.json({token, role})
    }

    async login(req, res, next) {
        const {email, password} = req.body;
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
        return res.json({token, role});
    }

    async check(req, res) {
        const user = await User.findOne({where: {id: req.user.id}});
        const token = generateJwt(user.id, user.email, user.name);
        const role = user.role
        return res.json({token, role})
    }

    async setAdmin(req, res) {
        const {id} = req.params;
        const user = await User.findByPk(id);
        user.role = "ADMIN";
        await user.save();
        return res.json(user);
    }

    async getAll(req, res) {
        let users = await User.findAll({attributes: ['id', 'name', 'email']});
        return res.json(users);
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne({
            attributes: ['name', 'id', 'email', 'role'],
            where: {id: id}
        })
        return res.json(user)
    }

    async deleteUser(req, res) {
        const {id} = req.params
        await User.destroy({
            where: {id: id}
        });
        return res.json({message: "Deleted"})
    }
}


module.exports = new UserController();