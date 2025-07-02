const mongoose = require("mongoose")

const connectedDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://ibodullaevabror14:I3pwBnTLEWxw9VVV@cluster0.lkp4q6w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=> console.log("Connected to MongoDB"))
        .catch((err) => console.log(err.message))
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports=connectedDB