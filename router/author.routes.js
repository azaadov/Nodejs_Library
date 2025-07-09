const { Router } = require("express")
const { getAllAuthors, addAuthor, getOneAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.ctr")
const authorValidateMiddleware = require("../middleware/author.validate.middleware")
const checkAdmin = require("../middleware/checkAdmin")
const accesToken_middleware = require("../middleware/accesToken_middleware")


const authorRouter = Router()

authorRouter.get("/get_all_authors", accesToken_middleware, getAllAuthors)
authorRouter.get("/search_author", accesToken_middleware, search)
authorRouter.get("/get_one_author/:id", accesToken_middleware, getOneAuthor)
authorRouter.post("/add_author", [accesToken_middleware, checkAdmin, authorValidateMiddleware], addAuthor)
authorRouter.put("/update_author/:id", [checkAdmin, accesToken_middleware, authorValidateMiddleware], updateAuthor)
authorRouter.delete("/delete_author/:id", [checkAdmin, accesToken_middleware], deleteAuthor)

module.exports = authorRouter