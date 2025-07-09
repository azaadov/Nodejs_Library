const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthModel = require("../schema/auth.schema");
const emailService = require("../utils/nodemailer");
const { accestokenGenerate, refreshtokenGenerate } = require("../utils/token_generator");


const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Barcha maydonlar to‘ldirilishi kerak" });
        }

        const existingUser = await AuthModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ msg: "Username yoki email band" });
        }

        const hashPassword = await bcrypt.hash(password, 8);

        const randomNumber = +Array.from({ length: 6 }, () => Math.floor(Math.random() * 9) + 1).join("")

        const otpTimeNow = Date.now() + 120000


        const newUser = await AuthModel.create({
            username,
            email,
            password: hashPassword,
            otp: randomNumber,
            otpTime: otpTimeNow
        });

        emailService(email, randomNumber)

        res.status(201).json({ msg: "Ro‘yxatdan o‘tildi emailni tasdiqlang", userId: newUser._id });
    } catch (err) {
        next(err)
    }
};


const resendCode = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existingUser = await AuthModel.findOne({ email });
        if (!existingUser) {
            return res.status(409).json({ msg: "email topilmadi" });
        }


        const randomNumber = +Array.from({ length: 6 }, () => Math.floor(Math.random() * 9) + 1).join("")

        const otpTimeNow = Date.now() + 120000

        await AuthModel.findOneAndUpdate({ email }, { otp: randomNumber, otpTime: otpTimeNow, isVerified: false })

        emailService(email, randomNumber)

        res.status(201).json({ msg: "yangi parol jonatildi" });
    } catch (err) {
        next(err)
    }
};


const emailVerify = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const existingUser = await AuthModel.findOne({ email });

        if (otp !== existingUser.otp) {
            return res.status(404).json({ msg: "parol notog'ri" })
        }

        const now = Date.now()

        if (existingUser.otpTime < now) {
            await AuthModel.findOneAndUpdate({ email: email }, { otpTime: null })
            return res.status(401).json({ msg: "parol eskirdi" })
        }

        await AuthModel.findOneAndUpdate({ email: email }, { isVerified: true })
        res.status(201).json({ msg: "email tasdiqlandi" })
    } catch (err) {
        next(err)
    }
};


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Email va parol kiritilishi kerak" });
        }

        const user = await AuthModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Foydalanuvchi topilmadi" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Parol noto‘g‘ri" });
        }

        if (isMatch && user.isVerified) {
            const payload = { id: user._id, email: user.email, role: user.role }
            const access_token = accestokenGenerate(payload)
            const refresh_token = refreshtokenGenerate(payload)

            res.cookie("accessToken", access_token, { httpOnly: true, maxAge: 1000 * 15 * 60 })
            res.cookie("refreshToken", refresh_token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })

            return res.status(200).json({ msg: "Kirish muvaffaqiyatli", access_token });
        } else {
            res.status(401).json({ msg: "Kirish amalga oshmadi" })
        }
    } catch (err) {
        next(err)
    }
};


const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await AuthModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Foydalanuvchi topilmadi" });
        }

        await AuthModel.updateOne({ email: email }, { isVerified: false })

        res.status(201).json({ msg: "Kod yuborildi emailni tekshiring" })
    } catch (err) {
        next(err)
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { email, new_password } = req.body;

        const user = await AuthModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Foydalanuvchi topilmadi" });
        }

        if (user.isVerified) {
            const hashPassword = await bcrypt.hash(new_password, 10)
            await AuthModel.updateOne({ email: email }, { password: hashPassword })
        }

        await AuthModel.updateOne({ email: email }, { isVerified: false })

        res.status(201).json({ msg: "Parol o'zgartirildi" })
    } catch (err) {
        next(err)
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("accesToken")
        res.clearCookie("refreshToken")
        res.status(200).json({ msg: "Logout" })
    } catch (err) {
        next(err)
    }
};

module.exports = {
    register,
    login,
    emailVerify,
    resendCode,
    forgotPassword,
    changePassword,
    logout
};
