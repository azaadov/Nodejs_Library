const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthModel = require("../schema/auth.schema");
const emailService = require("../utils/nodemailer")


const register = async (req, res) => {
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
        res.status(500).json({ msg: "Server xatosi" });
    }
};


const resendPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await AuthModel.findOne({ email });
        if (!existingUser) {
            return res.status(409).json({ msg: "email topilmadi" });
        }

        
        const randomNumber = +Array.from({ length: 6 }, () => Math.floor(Math.random() * 9) + 1).join("")

        const otpTimeNow = Date.now() + 120000

        await AuthModel.findOneAndUpdate({email}, {otp: randomNumber, otpTime: otpTimeNow, isVerified: false})

        emailService(email, randomNumber)   

        res.status(201).json({ msg: "yangi parol jonatildi"});
    } catch (err) {
        res.status(500).json({ msg: "Server xatosi" });
    }
};


const emailVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const existingUser = await AuthModel.findOne({ email });
       
        if(otp!==existingUser.otp){
            return res.status(404).json({msg: "parol notog'ri"})
        }

        const now = Date.now()

        if(existingUser.otpTime<now){
            await AuthModel.findOneAndUpdate({email: email}, {otpTime: null})
            return res.status(401).json({msg: "parol eskirdi"})
        }

        await AuthModel.findOneAndUpdate({email: email}, {isVerified: true})
        res.status(201).json({msg: "email tasdiqlandi"})
    } catch (err) {
        res.status(500).json({ msg: "Server xatosi" });
    }
};


const login = async (req, res) => {
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

        if(isMatch && user.isVerified){
            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SEKRET,
                { expiresIn: "1h" }
            );
           return res.status(200).json({ msg: "Kirish muvaffaqiyatli", token });
        }else{
            res.status(401).json({msg: "Kirish amalga oshmadi"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server xatosi" });
    }
};

module.exports = {
    register,
    login,
    emailVerify,
    resendPassword
};
