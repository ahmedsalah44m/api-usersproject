const jwt = require("jsonwebtoken");
const asyncwrapper = require("./asyncwrapper");

const verifyToken = asyncwrapper(async (req,res,next)=>{
    const token = req.headers.token.split(" ")[1];
    const tokenData =  jwt.verify(token,process.env.JWT_SECRET_Key)
    req.role =  tokenData.role;
    next()
})

module.exports = verifyToken
