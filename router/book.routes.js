const { Router } = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook, searchBook } = require("../controller/book.ctr")
const checkAdmin = require("../middleware/checkAdmin")
const bookValidate = require("../middleware/bookValidate")
const accesToken_middleware = require("../middleware/accesToken_middleware")


const BookRouter = Router()

BookRouter.get("/get_all_books", accesToken_middleware, getAllBooks)
BookRouter.get("/search_book", accesToken_middleware, searchBook)
BookRouter.get("/get_one_book/:id", accesToken_middleware, getOneBook)
BookRouter.post("/add_book", [accesToken_middleware, checkAdmin, bookValidate], addBook)
BookRouter.put("/update_book/:id", [accesToken_middleware, checkAdmin, bookValidate], updateBook)
BookRouter.delete("/delete_book/:id", [accesToken_middleware, checkAdmin], deleteBook)

module.exports = BookRouter