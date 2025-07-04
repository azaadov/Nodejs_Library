const {Router} = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook, searchBook } = require("../controller/book.ctr")
const checkAdmin = require("../middleware/checkAdmin")
const bookValidate = require("../middleware/bookValidate")

const BookRouter=Router()

BookRouter.get("/get_all_books", getAllBooks)
BookRouter.get("/search_book", searchBook)
BookRouter.get("/get_one_book/:id", getOneBook)
BookRouter.post("/add_book", checkAdmin, bookValidate, addBook)
BookRouter.put("/update_book/:id", checkAdmin, updateBook)
BookRouter.delete("/delete_book/:id",checkAdmin, deleteBook)

module.exports=BookRouter