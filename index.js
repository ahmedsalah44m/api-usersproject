const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const userRouter = require("./route/users.route");
const adminRouter = require("./route/admin.route");
const app = express();
const url = process.env.MONGO_URL
const {ERROR} = require("./utils/httpStatusText");
const cors = require("cors") ;
const path = require("path");
app.use(cors())
app.use(express.json())


mongoose.connect(url).then(()=>{
    console.log("MongoDB Server Started")})


app.use("/api/users",userRouter);

app.use("/api/admin",adminRouter);

app.use("/uploads", express.static(path.join(__dirname,"uploads")));

// globle middle for had errors
app.use((error,req,res,next)=>{
    res.status( error.status||500).json({statusText:error.statusText ||"ERROR",message:error.message||error.msg,data:null})
})


// globle middleware for not found router
app.all("*",(req,res,next)=>{
    res.status(404).json({status :ERROR ,message:"This Resource IS Not Available"})
    
})




app.listen( process.env.PORT ||4001,()=>{
    console.log(`Server Live On Port ${process.env.PORT}`)
})

