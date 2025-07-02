const {Router} = require("express")
const { getAllAuthors, addAuthor, getOneAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.ctr")
const authorValidateMiddleware = require("../middleware/author.validate.middleware")
const checkAdmin = require("../middleware/checkAdmin")



const authorRouter=Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/search_author", search)
authorRouter.get("/get_one_author/:id", getOneAuthor)
authorRouter.post("/add_author", checkAdmin, authorValidateMiddleware, addAuthor)
authorRouter.put("/update_author/:id", checkAdmin, updateAuthor)
authorRouter.delete("/delete_author/:id", checkAdmin, deleteAuthor)

module.exports=authorRouter