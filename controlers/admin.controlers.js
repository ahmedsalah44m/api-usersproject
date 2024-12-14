const Admin = require("../models/admin.module");
const statusText = require("../utils/httpStatusText");
const asyncWrapper = require("../user.middleware/asyncwrapper");
const {bodyErrorValidator} = require("../utils/bodyErrorValidator");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const generateToken = require('../utils/generateJWTToken');
// const crypto = require("crypto")
// console.log(crypto.randomBytes(32).toString("hex"))


const getAllAdmins = async (req,res)=>{
    const admins = await Admin.find({},{"__v":0,password:0,token:0}) ;
    res.json({status: statusText.SUCCESS , data :admins });
}

const register = asyncWrapper(async (req,res,next)=>{
    // body validation
    if(bodyErrorValidator(req)) return next(bodyErrorValidator(req));

    let {firstName,lastName,email,password,role,avatar} = req.body;
    
    // email validate before upload image
    
    

    password = await bcrypt.hash(password,10);
    
    
    const admin =  new Admin({
        firstName,
        lastName,
        email,
        password ,
        role,
        avatar
    })
    
    admin.token =  await generateToken({email:admin.email,id:admin._id,role});
    
    await admin.save()
    
    res.json({status: statusText.SUCCESS, data:admin });
})





const login = asyncWrapper(async (req,res,next)=>{
    const [user] = await Admin.find({email:req.body.email});
    
    //Email validation
    if(!user){
         return next(new AppError(400,statusText.FAIL,"User Not Found"));
    };
    
    // password validation
    if(await bcrypt.compare(req.body.password,user.password)){

        const token = await generateToken({id:user._id,email:user.email,role:user.role}) 
        return res.json({status:statusText.SUCCESS,message:"You Are Login Seccessfully",data:token});
    }
    else{
        const err = new AppError(400,statusText.FAIL,"Password Is Wrong");
         return next(err);
    }
})

module.exports = {
    getAllAdmins,
    register,
    login
}