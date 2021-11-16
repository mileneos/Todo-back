const { Router } = require('express');
const { Op } = require('sequelize');
const ErrorResponse = require('../classes/error-response');
const User = require('../database/models/user.model');
const Token = require('../database/models/token.model');
const { asyncHandler } = require('../middlewares/middlewares');
const { nanoid } = require('nanoid')

const router = Router();


function initRoutes() {
    router.post('/login', asyncHandler(loginUser));
    router.post('/registration', asyncHandler(regUser));
}

async function loginUser(req, res, next) {
    const fUser = await User.findOne({
        where:
        {
            login: req.body.login,
            password: req.body.password
        }
    })
    if (!fUser) {
        throw new ErrorResponse("User is not found", 400)
    }


    const token = await Token.create({ userId: fUser.id, value: nanoid(128)})
    res.status(200).json({accessToken: token.value});
}

async function regUser(req, res, next) {
    const fUser = await User.findOne({
        where:
        {
            [Op.or]: [
                { email: req.body.email },
                { login: req.body.login }
            ]
        }
    })

    const usr = await User.create(req.body)
    res.status(200).json(usr);
}

initRoutes();

module.exports = router;