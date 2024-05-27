const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validationTokenHandler = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.header.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Invalid token");
            }
            req.user = decoded;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("Missing token");
        }
    }
});

module.exports = validationTokenHandler;