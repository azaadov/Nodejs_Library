const {Router} = require("express")
const { register, login, emailVerify, resendCode, forgotPassword, changePassword, logout } = require("../controller/auth.ctr")
const {registerValidate, loginValidateMiddleware, emailVerifyValidateMiddleware, resendCodeValidateMiddleware, forgotPasswordValidateMiddleware, changePasswordValidateMiddleware} = require("../middleware/authValidate")
const refreshToken = require("../middleware/refreshToken_middleware")


const AuthRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Foydalanuvchi autentifikatsiyasi
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yangi foydalanuvchini ro‘yxatdan o‘tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi
 *       400:
 *         description: Noto‘g‘ri ma'lumotlar
 */

AuthRouter.post("/register", [registerValidate], register)

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Emailni tasdiqlash
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email tasdiqlandi
 *       400:
 *         description: Xatolik yuz berdi
 */
AuthRouter.post("/verify", [emailVerifyValidateMiddleware], emailVerify)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchini tizimga kiritish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli kirildi
 *       401:
 *         description: Noto‘g‘ri login yoki parol
 */

AuthRouter.post("/login", [loginValidateMiddleware], login)

/**
 * @swagger
 * /api/auth/resend_code:
 *   post:
 *     summary: Email tasdiqlash kodini qayta yuborish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kod qayta yuborildi
 *       400:
 *         description: Email topilmadi
 */
AuthRouter.post("/resend_code", [resendCodeValidateMiddleware], resendCode)

/**
 * @swagger
 * /api/auth/forgot_password:
 *   post:
 *     summary: Parolni tiklash uchun kod yuborish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parolni tiklash kodi yuborildi
 *       400:
 *         description: Foydalanuvchi topilmadi
 */
AuthRouter.post("/forgot_password", [forgotPasswordValidateMiddleware], forgotPassword)

/**
 * @swagger
 * /api/auth/change_password:
 *   post:
 *     summary: Yangi parolni o‘rnatish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parol yangilandi
 *       400:
 *         description: Kod noto‘g‘ri yoki muddati o‘tgan
 */
AuthRouter.post("/change_password", [changePasswordValidateMiddleware], changePassword)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Foydalanuvchini tizimdan chiqarish
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout muvaffaqiyatli yakunlandi
 */
AuthRouter.post("/logout", logout)

/**
 * @swagger
 * /api/auth/refresh_token:
 *   post:
 *     summary: Yangi access token olish
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Yangi token yuborildi
 *       401:
 *         description: Refresh token mavjud emas yoki yaroqsiz
 */
AuthRouter.post("/refresh_token", refreshToken)

module.exports=AuthRouter