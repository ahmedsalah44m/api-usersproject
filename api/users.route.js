const {showUsers,showSingleUser,addUser,updateUser,deleteUser } = require("../controlers/user.controlers")
const {nameSchema ,ageSchema } = require("../user.middleware/validatinschema")
const Router = require("express").Router()
const varifyToken = require("../user.middleware/verifyToken");


Router.route("/")
.get(varifyToken,showUsers)
.post(nameSchema(),
ageSchema(),
addUser)





Router.route("/:id")
.get(showSingleUser)
.patch(nameSchema(),
ageSchema(),
updateUser)
.delete(deleteUser)




module.exports = Router