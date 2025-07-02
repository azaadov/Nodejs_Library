const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Kitob nomi berilishi shart"],
        minLength: [2, "Kitob nomi kamida 2 ta belgidan iborat bo‘lishi kerak"],
        maxLength: [100, "Kitob nomi 100 ta belgidan oshmasligi kerak"],
        set: value => value.trim()

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Author ismi  berilishi shart"],
        ref: "Author"
    },
    genre: {
        type: String,
        required: [true, "Janri berilishi shart"],
        enum: {
            values: ["Comedy", "Science fiction", "Historical", "Fantasy",
                "Programming", "Documentary", "Horror", "Romance"],
            message: "{VALUE} ushbu janrni tanlash mumkin emas"
        }
    },
    rating: {
        type: Number,
        required: false,
        min: [0, "Rating 0 dan kam bo‘lmasligi kerak"],
        max: [5, "Rating 5 dan oshmasligi kerak"],
        default: 0
    },
    pageCount: {
        type: Number,
        required: [true, "Kitob varaqi berilishi shart"],
        min: [1, "Varaq soni kamida 1 bo‘lishi kerak"],
        max: [10000, "Kitob varaqlari ko‘pi bilan  10000 dan oshmasligi kerak"]
    },
    publishYear: {
        type: Number,
        min: [1000, "Yil 1000 dan katta bo‘lishi kerak"],
        max: [new Date().getFullYear(), "Kelajakdagi yil bo‘lishi mumkin emas"],
        required: [true, "Chiqarilgan yili berilishi shart"]
    },
    language: {
        type: String,
        required: [true, "Til nomi berilishi shart"],
        minLength: [2, "Til nomi juda qisqa bolmasligi kerak"],
        maxLength: [30, "Til nomi 30 ta belgidan oshmasligi kerak"],
        set: value => value.trim()
    },
    description: {
        type: String,
        required: [true, "deskription berilishi shart"],
        minLength: [20, "Description kamida 20 ta belgidan iborat bo‘lishi kerak"],
        set: value => value.trim()
    },
    period: {
        type: String,
        required: [true, "Ijod davri berilishi shart"],
        enum: {
            values: ["Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri"],
            message: "{VALUE} ushbu davrni tanlash mumkin emas"
        },
        maxLength: [100, "Ijod davri 100 ta belgidan oshmasligi kerak"],
        minLength: [5, "Ijod davri 5 ta belgidan kam bolmasligi kerak"],
        set: value => value.trim()
    },
    commentary: {
        type: String,
        default: "",
        set: value => value.trim()
    }
},
    {
        versionKey: false,
        timestamps: true
    })

const BookMdel = mongoose.model("Book", BookSchema)
module.exports = BookMdel