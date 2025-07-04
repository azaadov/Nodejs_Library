const {Router} = require("express")
const { register, login, emailVerify, resendPassword } = require("../controller/auth.ctr")
const authValidate = require("../middleware/authValidate")


const AuthRouter = Router()

AuthRouter.post("/register", authValidate,  register)
AuthRouter.post("/verify", authValidate,  emailVerify)
AuthRouter.post("/login", authValidate, login)
AuthRouter.post("/resend_pasword", authValidate, resendPassword)

module.exports=AuthRouter