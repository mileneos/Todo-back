const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const Token = require('../database/models/token.model');
const User = require('../database/models/user.model');
const { asyncHandler, requireToken } = require('../middlewares/middlewares');
const router = Router();

function initRoutes() {
    router.get('/me', asyncHandler(requireToken), asyncHandler(getUserInfo));
    router.patch('/me', asyncHandler(requireToken), asyncHandler(updateUserInfo));
    router.post('/logout', asyncHandler(requireToken), asyncHandler(logoutUser));
}

async function getUserInfo(req, res, next) {
    const fUser = await User.findOne({
        where:
        {
            id: req.fToken.userId,
        }
    });

    if (!fUser){
        throw new ErrorResponse("User is not found", 400)
    }

    res.status(200).json(fUser);
}

async function updateUserInfo(req, res, next) {
    const fUser = await User.findOne({
        where:
        {
            id: req.fToken.userId,
        }
    });
    
    if (!fUser){
        throw new ErrorResponse("User is not found", 400)
    }

    await fUser.update(req.body)

    res.status(200).json(fUser);
}

async function logoutUser(req, res, next) {
    await req.fToken.destroy();

    res.status(200).json({ message: "logout is sucessfull" });
}

initRoutes();

module.exports = router;