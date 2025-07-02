const mongoose = require("mongoose")

const AuthorSchema = new mongoose.Schema({
    fulName:{
        type:String,
        required: [true, "Ism familia berilishi shart"],
        minLength: [5, "Ism familia kamida 5 ta harfdan iborat bolishi kerak"],
        maxLength: [50, "Ism familia kopi bilan 50 ta harfdan iborat bolishi kerak"],
        match: [/^[a-zA-Z\s]+$/, "Faqat harf va bo‘shliq bo‘lishi kerak"],
        set: value => value ? value.trim() : value
    },
    dateOfBirth:{
        type:Date,
        required: [true, "Tugilgan yili berilishi shart"]
    },
    dateOfDeath:{
        type:Date,
        required: false,
        default: null,
        validate: {
            validator: function(value) {
                return !value || value > this.dateOfBirth;
            },
            message: "Vafot sanasi tug‘ilgan sanadan keyin bo‘lishi kerak"
        }
    },
    countOfBook:{
        type:Number,
        required: false,
        default: 0,
        min: [0, "Kitob soni manfiy bo‘lishi mumkin emas"],
        max: [1000, "Kitob soni 1000 tadan oshmasligi kerak"]
    },
    countOfAudioBook:{
        type:Number,
        required: false,
        default: 0,
        min: [0, "Audio kitob soni manfiy bo‘lishi mumkin emas"],
        max: [1000, "Audio kitob soni 1000 tadan oshmasligi kerak"]
    },
    period:{
        type:String,
        required: [true, "Ijod davri berilishi shart"],
        enum: {
            values: ["Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri"],
            message: "{VALUE} ushbu davrni tanlash mumkin emas"
        }
    },
    bio:{
        type:String,
        required: [true, "Biografiyasi berilishi shart"],
        minLength: [30, "Biografiya kamida 30 ta belgidan iborat bo‘lishi kerak"],
        set: value => value ? value.trim() : value
    },
    creativity:{
        type:String,
        required: [true, "Ijodi berilishi shart"],
        minLength: [30, "Ijodi kamida 30 ta belgidan iborat bo‘lishi kerak"],
        set: value => value ? value.trim() : value
    },
    region:{
        type:String,
        required: [true, "Yashash joyi berilishi shart"],
        maxLength: [100, "Region nomi 100 ta belgidan oshmasligi kerak"],
        set: value => value ? value.trim() : value
    },
},
{
    versionKey:false,
    timestamps:true
})

const AuthorMdel=mongoose.model("Author", AuthorSchema)
module.exports=AuthorMdel