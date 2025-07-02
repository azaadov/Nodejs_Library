const express = require("express")
const cors = require("cors")
const connectedDB = require("./config/database.author")
const authorRouter = require("./router/author.routes")
const BookRouter = require("./router/book.routes")
const errorHandler = require("./errorHandler")
const AuthRouter = require("./router/auth.routes")
require("dotenv").config({path: ".env"})


const app=express()
app.use(cors({credentials:true}))
app.use(express.json())
const PORT = process.env.PORT || 4000

connectedDB()


//router 
app.use(authorRouter)
app.use(BookRouter)
app.use(errorHandler)
app.use(AuthRouter)

app.use((req, res, next) => {
    res.status(404).json({ msg: "Sahifa topilmadi" });
});

app.listen(PORT, ()=>{
    console.log("Server Ishladi: "+PORT);
})