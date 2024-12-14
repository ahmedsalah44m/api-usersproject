const mongoose = require("mongoose");
const validator = require("validator");
const adminRole = require("../utils/admin.role");

const adminSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:1
    },
    lastName:{
        type:String,
        require:1,
         
    },
    email:{
        type:String,
        require:1,
        validate: [validator.isEmail,"Filed Must Be a Valid Email Address"],
    },
    password:{
        type:String,
        require:1
    },
    token:String,
    role:{
        type:String,
        enum:[adminRole.WRITER,adminRole.MANAGER,adminRole.OWNER],
        default:adminRole.WRITER,
    },
    avatar:{
        type:String,
        default:"wp12369763.jpg"
    }
})

module.exports = mongoose.model("admin",adminSchema)

