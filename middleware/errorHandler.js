const { constansts } = require("../constants");
const errorHandler = (err, req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constansts.VALIDATION_ERROR: 
            res.jspn({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constansts.UNAUTHORIZED:
            res.json({
                 title: "unauthorized",
                 message: err.message, 
                 stackTrace: err.stack});
        case constansts.FORBIDDEN:
            res.json({
                    title: "forbidden",
                    message: err.message, 
                    stackTrace: err.stack});
        case constansts.NOT_FOUND:
            res.json({
                    title: "not found",
                    message: err.message, 
                    stackTrace: err.stack});   
        case constansts.SERVER_ERROR:
            res.json({
                    title: "server error",
                    message: err.message, 
                    stackTrace: err.stack});         
        default:
            break;
    }
    
    
};

module.exports = errorHandler;