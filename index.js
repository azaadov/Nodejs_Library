const express = require("express")
const cors = require("cors")
const connectedDB = require("./config/database.author")
const authorRouter = require("./router/author.routes")
const BookRouter = require("./router/book.routes")
const errorHandler = require("./errorHandler")
const AuthRouter = require("./router/auth.routes")
require("dotenv").config({path: ".env"})
const cokieParser = require("cookie-parser")
const commentRouter = require("./router/comment.routes")
const { swaggerUi, swaggerSpec } = require("./utils/swagger")



const app=express()
app.use(cors({credentials:true}))
app.use(express.json())
app.use(cokieParser())
const PORT = process.env.PORT || 4000

connectedDB()


//router router
app.use(authorRouter)
app.use(BookRouter)
app.use(errorHandler)
app.use("/auth", AuthRouter)
app.use(commentRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((req, res, next) => {
    res.status(404).json({ msg: "Sahifa topilmadi" });
});

app.listen(PORT, ()=>{
    console.log("Server Ishladi: "+PORT);
})