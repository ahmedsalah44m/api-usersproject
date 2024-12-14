const AppError = require("../utils/appError");
const asyncwrapper = require("./asyncwrapper");
const statusText = require("../utils/httpStatusText");
const allowTo = (...roles)=> asyncwrapper(async(req,res,next)=>{
 if(!roles.includes(req.role)) return next(new AppError(401,statusText.FAIL,"You Don`t Have Permission"));

    next()
})



module.exports = allowTo;