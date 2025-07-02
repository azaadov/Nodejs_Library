const {Router} = require("express")
const { register, login } = require("../controller/auth.ctr")
const { AuthValidate } = require("../validation/auth.validate")

const AuthRouter = Router()

AuthRouter.post("/register", AuthValidate, register)
AuthRouter.post("/login", AuthValidate, login)

module.exports=AuthRouter