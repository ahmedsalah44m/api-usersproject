const multer = require("multer");
const AppError = require("../utils/appError");
const statusText =require("../utils/httpStatusText");
const Admin = require("../models/admin.module");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        req.body.avatar = file.originalname;
        cb(null,"user"+Date.now()+"."+file.mimetype.split("/")[1]);
    }
})

const upload = multer({storage:storage,
    fileFilter: async(req,file,cb)=>{
        if(await Admin.exists({email:req.body.email}))  cb(new AppError(400 ,statusText.FAIL,"Your Eamil Is Already Registered"))
            else if(file.mimetype.split("/")[0] !="image") cb(new AppError(400,statusText.FAIL,"File Uploaded Must Be Image"))
            else cb(null,1);
    }
}) 

module.exports = upload;