const Joi = require("joi")

exports.AuthValidate = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.base": "Username matn bo‘lishi kerak",
                "string.empty": "Username kiritilishi kerak",
                "string.min": "Username kamida 3 ta belgidan iborat bo‘lishi kerak",
                "string.max": "Username 30 ta belgidan oshmasligi kerak",
                "any.required": "Username majburiy"
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.base": "Email matn bo‘lishi kerak",
                "string.email": "Email formati noto‘g‘ri",
                "string.empty": "Email kiritilishi kerak",
                "any.required": "Email majburiy"
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                "string.base": "Parol matn bo‘lishi kerak",
                "string.empty": "Parol kiritilishi kerak",
                "string.min": "Parol kamida 6 ta belgidan iborat bo‘lishi kerak",
                "any.required": "Parol majburiy"
            }),
        role: Joi.string().valid("user", "admin")
            .optional()
            .messages({
                "any.only": "Rol faqat 'user' yoki 'admin' bo‘lishi mumkin"
            }),
        isVerified: Joi.boolean()
        .optional()
        .messages({
            "boolean.base": "isVerified faqat true yoki false bo‘lishi kerak"
        }),
        otpTime: Joi.number().integer()
        .min(0)
        .optional()
        .messages({
            "number.base": "OTP vaqti raqam bo‘lishi kerak",
            "number.integer": "OTP vaqti butun son bo‘lishi kerak",
            "number.min": "OTP vaqti manfiy bo‘lishi mumkin emas"
        }),
        otp: Joi.number().integer()
        .min(100000)
        .max(999999)
        .optional()
        .messages({
            "number.base": "OTP raqam bo‘lishi kerak",
            "number.min": "OTP kamida 6 xonali raqam bo‘lishi kerak",
            "number.max": "OTP 6 xonali raqamdan oshmasligi kerak",
            "number.integer": "OTP butun son bo‘lishi kerak"
        }),
    })
    return schema.validate(data, { abortEarly: false });
}