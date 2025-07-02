const Joi = require("joi")

exports.authorValidate = (data) => {
    const schema = Joi.object({
        fulName: Joi.string().min(3).max(50).messages({
            "string.empty": `"F.I.Sh." bo‘sh bo‘lishi mumkin emas`,
            "string.min": `"F.I.Sh." kamida {#limit} belgidan iborat bo‘lishi kerak`,
            "any.required": `"F.I.Sh." majburiy maydon`,
        }).required(),
        dateOfBirth: Joi.date().greater(`1.1.1190`).less(`1.1.1998`).messages({
            "any.required": `Tug‘ilgan sana kiritilishi majburiy`,
            "date.base": `Tug‘ilgan sana noto‘g‘ri formatda`,
            "date.greater": `Tug‘ilgan sana 01.01.1190 dan keyin bo‘lishi kerak`,
            "date.less": `Tug‘ilgan sana 01.01.1998 dan oldin bo‘lishi kerak`
        }).required(),
        dateOfDeath: Joi.date().greater(`1.1.1200`),
        countOfBook: Joi.number().optional(),
        countOfAudioBook: Joi.number().optional(),
        period: Joi.string().messages({
            "string.empty": `"Davr" bo‘sh bo‘lishi mumkin emas`,
            "any.required": `"Davr" majburiy maydon`
        }).required(),
        bio: Joi.string().min(30).messages({
            "string.min": `"Biografiya" kamida {#limit} belgidan iborat bo‘lishi kerak`,
            "string.empty": `"Biografiya" bo‘sh bo‘lishi mumkin emas`,
            "any.required": `"Biografiya" majburiy maydon`
        }).required(),
        creativity: Joi.string().min(30).messages({
            "string.min": `"Ijodi" kamida {#limit} belgidan iborat bo‘lishi kerak`,
            "string.empty": `"Ijodi" bo‘sh bo‘lishi mumkin emas`,
            "any.required": `"Ijodi" majburiy maydon`
        }).required(),
        region: Joi.string().max(100).messages({
            "string.max": `"Hudud" maksimal {#limit} belgidan oshmasligi kerak`,
            "string.empty": `"Hudud" bo‘sh bo‘lishi mumkin emas`,
            "any.required": `"Hudud" majburiy maydon`
        }).required()
    })
    return schema.validate(data, { abortEarly: false });
}