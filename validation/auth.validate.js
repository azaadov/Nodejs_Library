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
            })
    })
    return schema.validate(data, { abortEarly: false });
}