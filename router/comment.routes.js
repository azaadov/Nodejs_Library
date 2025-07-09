const { Router } = require("express")
const { addComment, removeComment } = require("../controller/comment.ctr")
const accesToken_middleware = require("../middleware/accesToken_middleware")

const commentRouter = Router()

commentRouter.post("/get_all_coments", accesToken_middleware)
commentRouter.post("/add_Comment", accesToken_middleware, addComment)
commentRouter.delete("/remove_Comment/:id", accesToken_middleware, removeComment)

module.exports = commentRouter