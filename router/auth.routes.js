const {Router} = require("express")
const { register, login, emailVerify, resendCode, forgotPassword, changePassword, logout } = require("../controller/auth.ctr")
const {registerValidate, loginValidateMiddleware, emailVerifyValidateMiddleware, resendCodeValidateMiddleware, forgotPasswordValidateMiddleware, changePasswordValidateMiddleware} = require("../middleware/authValidate")
const refreshToken = require("../middleware/refreshToken_middleware")


const AuthRouter = Router()

AuthRouter.post("/register", [registerValidate], register)
AuthRouter.post("/verify", [emailVerifyValidateMiddleware], emailVerify)
AuthRouter.post("/login", [loginValidateMiddleware], login)
AuthRouter.post("/resend_code", [resendCodeValidateMiddleware], resendCode)
AuthRouter.post("/forgot_password", [forgotPasswordValidateMiddleware], forgotPassword)
AuthRouter.post("/change_password", [changePasswordValidateMiddleware], changePassword)
AuthRouter.post("/logout", logout)
AuthRouter.post("/refresh_token", refreshToken)

module.exports=AuthRouter