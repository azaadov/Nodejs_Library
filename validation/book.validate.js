const Joi = require("joi")

exports.BookValidate = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.base": "Kitob nomi matn bo‘lishi kerak",
                "string.empty": "Kitob nomi berilishi shart",
                "string.min": "Kitob nomi kamida 2 ta belgidan iborat bo‘lishi kerak",
                "string.max": "Kitob nomi 100 ta belgidan oshmasligi kerak",
                "any.required": "Kitob nomi berilishi shart"
            }),
        author: Joi.string()
            .hex()
            .length(24)
            .required()
            .messages({
                "string.base": "Author ID matn bo‘lishi kerak",
                "string.length": "Author ID 24 belgidan iborat bo‘lishi kerak",
                "any.required": "Author ismi berilishi shart"
            }),
        genre: Joi.string()
            .valid("Comedy", "Science fiction", "Historical", "Fantasy",
                "Programming", "Documentary", "Horror", "Romance")
            .required()
            .messages({
                "any.only": "Noto‘g‘ri janr tanlandi",
                "any.required": "Janr berilishi shart"
            }),
        rating: Joi.string()
        .min(0)
        .max(5)
        .optional()
        .messages({
            "number.base": "Rating raqam bo‘lishi kerak",
            "number.min": "Rating 0 dan kam bo‘lmasligi kerak",
            "number.max": "Rating 5 dan oshmasligi kerak"
        }),
        pageCount: Joi.number()
        .min(1)
        .max(10000)
        .required()
        .messages({
            "number.base": "Varaq soni raqam bo‘lishi kerak",
            "any.required": "Kitob varaqi berilishi shart",
            "number.min": "Varaq soni kamida 1 bo‘lishi kerak",
            "number.max": "Varaq soni 10000 dan oshmasligi kerak"
        }),
        publishYear: Joi.number()
        .min(1000)
        .max(new Date().getFullYear())
        .required()
        .messages({
            "number.base": "Chiqarilgan yil raqam bo‘lishi kerak",
            "any.required": "Chiqarilgan yili berilishi shart",
            "number.min": "Yil 1000 dan katta bo‘lishi kerak",
            "number.max": "Kelajakdagi yil bo‘lishi mumkin emas"
        }),
        language: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            "string.base": "Til matn bo‘lishi kerak",
            "any.required": "Til nomi berilishi shart",
            "string.min": "Til nomi juda qisqa bo‘lmasligi kerak",
            "string.max": "Til nomi 30 ta belgidan oshmasligi kerak"
        }),
        description: Joi.string()
        .min(20)
        .required()
        .messages({
            "string.base": "Tavsif matn bo‘lishi kerak",
            "any.required": "Tavsif (description) berilishi shart",
            "string.min": "Description kamida 20 ta belgidan iborat bo‘lishi kerak"
        }),
        period: Joi.string()
        .valid("Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri")
        .required()
        .messages({
            "any.only": "Noto‘g‘ri ijod davri tanlandi",
            "any.required": "Ijod davri berilishi shart"
        }),
        commentary: Joi.string().allow("").optional()
    })
    return schema.validate(data, { abortEarly: false });
}