const UserService = require('../services/userService')
const ApiError = require("../error/ApiError");

class UserController {
    async registration(req, res, next) {
        if ((!req.body.email) || (!req.body.password)) {
            return next(ApiError.badRequest("Incorrect email or password "))
        }
        const user = await UserService.registration(req, next)
        return res.json(user)
    }

    async login(req, res, next) {
        if (req.body.email) {
            const {email, password} = req.body;
            const user = await UserService.login(email, password, next);
            return res.json(user);
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }

    }

    async check(req, res) {
        if (req.user.id) {
            const user = await UserService.check(req)
            return res.json(user)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async setAdmin(req, res) {
        if (req.params.id) {
            const user = await UserService.setAdmin(req.params.id)
            return res.json(user)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async getAll(req, res) {
        const users = await UserService.getAll()
        return res.json(users)
    }

    async getOne(req, res) {
        if (req.params.id) {
            const user = await UserService.getOne(req.params.id)
            return res.json(user)
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }

    async deleteUser(req, res) {
        if (req.params.id) {
            await UserService.deleteUser(req.params.id)
            return res.json({message: "User Deleted"})
        } else {
            return res
                .status(400)
                .send({message: 'Bad request.'});
        }
    }
}


module.exports = new UserController();