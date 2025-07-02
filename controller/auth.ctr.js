const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthModel = require("../schema/auth.schema");


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
        const newUser = await AuthModel.create({
            username,
            email,
            password: hashPassword
        });

        res.status(201).json({ msg: "Ro‘yxatdan o‘tildi", userId: newUser._id });
    } catch (err) {
        console.log(err);
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

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, 
            process.env.JWT_SEKRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ msg: "Kirish muvaffaqiyatli", token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server xatosi" });
    }
};

const verify = () => {
    
}

module.exports = {
    register,
    login
};
