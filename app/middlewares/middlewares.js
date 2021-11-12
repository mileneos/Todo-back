const ErrorResponse = require("../classes/error-response");
const Token = require('../database/models/token.model');

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const requireToken = async (req, res, next) => {
    // if token is in request body
    const token = req.header("token");
    if (!token)
    {
        throw new ErrorResponse("Token is not sent", 400)
    }

    // if DB contains such token 
    const fToken = await Token.findOne({
        where:
        {
            value: token
        }
    })
    if(!fToken) {
        throw new ErrorResponse("Token is not found in DB", 404)
    }
    // check if token is valid (time)
    if (parseInt(new Date(new Date().toLocaleString("en-US")) - new Date(String(fToken.createdAt))) > 60000)
    {
        await fToken.destroy();
        throw new ErrorResponse("Token is expired", 401)
    }

    req.fToken = fToken
    next();
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message
    });
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    requireToken,
};