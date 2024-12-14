const mongoose = require("mongoose")




const UserSchema = new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:2
            },
            age:{
                type:Number,
                required: true
            }
        
})
module.exports = mongoose.model("user",UserSchema);





