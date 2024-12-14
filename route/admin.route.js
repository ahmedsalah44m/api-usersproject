const Router = require("express").Router();
const {getAllAdmins,register, login} = require("../controlers/admin.controlers")
const {passwordSchema ,flNameSchema ,emaildSchema} = require("../user.middleware/validatinschema")
const verifyToken = require("../user.middleware/verifyToken");
const allowTo = require("../user.middleware/allowTo");
const adminRole = require("../utils/admin.role")
const upload = require("../user.middleware/fileUpload");
Router.route("/")
.get(verifyToken ,allowTo(adminRole.MANAGER,adminRole.OWNER), getAllAdmins)






Router.route("/register")
.post(   upload.single("avatar"), register)

Router.route("/login")
.post( passwordSchema() ,emaildSchema(),login)
module.exports = Router;