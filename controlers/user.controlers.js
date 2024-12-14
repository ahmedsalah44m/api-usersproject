const  User  = require("../models/users.models");
const statusText = require("../utils/httpStatusText");
const asyncWrapper = require("../user.middleware/asyncwrapper")
const AppError = require("../utils/appError")
const {bodyErrorValidator} = require("../utils/bodyErrorValidator")



const showUsers = async (req,res)=>{
    const limit = req.query.limit || 5;
    const page = req.query.page; 
    const skip = ((page - 1) * limit )
    let users = await  User.find({},{"__v":0}).skip(skip).limit(limit);
    res.json({status:statusText.SUCCESS,data:users})
}







const showSingleUser = asyncWrapper(async (req,res,next)=>{
    
    let user = await User.findById(req.params.id,{"__v":0})
    if(!user){
         
        const error = new AppError(404,statusText.FAIL,"User Not Found");
        return next(error);
    }
    return res.json({ statusText: statusText.SUCCESS ,data:user})
})







const addUser = asyncWrapper(async (req,res,next)=>{
    if(bodyErrorValidator) return next(bodyErrorValidator(req));

    const user =  await new User(req.body).save()
    res.status(201).json({ status:statusText.SUCCESS  ,data:user })
})




const updateUser = asyncWrapper(async (req,res,next)=>{
    if(bodyErrorValidator) return next(bodyErrorValidator(req));
    
        let user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true,runValidators:true})
        if(!user){
            const error = new AppError(404,statusText.find,"User Not Found")
            return next(error)
        }
        return res.json({  statusText:statusText.SUCCESS ,data:user})
})


const deleteUser =asyncWrapper(async (req,res,next)=>{
        let user = await User.findByIdAndDelete(req.params.id,{$set:req.body})
        if(!user){
            const error = new AppError(404,statusText.FAIL,"User Not Found")
            return next(error)
        }
        return res.json({status:statusText.SUCCESS,data:null})
})



module.exports = {
    showUsers, 
    showSingleUser,
    addUser,
    updateUser,
    deleteUser

}