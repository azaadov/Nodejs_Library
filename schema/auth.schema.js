const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Foydalanuvchi nomi (username) berilishi shart"],
        unique: true,
        minLength: [3, "Username kamida 3 ta belgidan iborat bo‘lishi kerak"],
        maxLength: [30, "Username 30 ta belgidan oshmasligi kerak"],
        set: value => value.trim()
    },
    email: {
        type: String,
        required: [true, "Email manzili berilishi shart"],
        unique: true,
        match: [/.+\@.+\..+/, "Email formati noto‘g‘ri"],
        set: value => value.toLowerCase().trim()
    },
    password: {
        type: String,
        required: [true, "Parol berilishi shart"],
        minLength: [6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"]
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin", "superadmin"],
            message: "{VALUE} ushbu rol mavjud emas"
        },
        default: "user",
        required: false
    },
    otp: {
        type: Number,
        min: [100000, "OTP kamida 6 xonali bo‘lishi kerak"],
        max: [999999, "OTP faqat 6 xonali bo‘lishi kerak"],
        validate: {
            validator: Number.isInteger,
            message: "OTP butun son bo‘lishi kerak"
        },
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        validate: {
            validator: val => typeof val === "boolean",
            message: "isVerified qiymati faqat true yoki false bo‘lishi mumkin"
        },
        required: false
    },
    otpTime: {
        type: Number,
        min: [0, "otpTime manfiy bo‘lishi mumkin emas"],
        validate: {
            validator: Number.isInteger,
            message: "otpTime butun son bo‘lishi kerak"
        },
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
});


const AuthModel = mongoose.model("User", UserSchema);
module.exports = AuthModel
