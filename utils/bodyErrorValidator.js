const AppError = require("./appError");
const statusText = require("./httpStatusText");
const { validationResult } = require("express-validator")


const bodyErrorValidator =  (req )=>{
    if(!validationResult(req).isEmpty()){
        const err = new AppError(400,statusText.FAIL,validationResult(req).errors[0].msg)
        return err
    }
}


module.exports = {
    bodyErrorValidator
}

