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
            values: ["user", "admin"],
            message: "{VALUE} ushbu rol mavjud emas"
        },
        default: "user"
    }
}, {
    timestamps: true,
    versionKey: false
});


const AuthModel = mongoose.model("User", UserSchema);
module.exports = AuthModel
