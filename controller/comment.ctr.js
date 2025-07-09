const bookModel = require("../schema/book.schema");
const CommentModel = require("../schema/comment.schema");

const addComment = async (req, res, next) => {
    try {
        const { content, bookId } = req.body;

        const foundedBookId = await bookModel.findById(bookId)

        if (!foundedBookId) {
            return res.status(404).json({ msg: "Book not found" })
        }

        const comment = await CommentModel.create({ content, bookId, owner: req.user.id })
        res.status(201).json({ msg: "Added comment", comment })
    } catch (err) {
        next(err)
    }
};

const removeComment = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundedComment = await CommentModel.findById(id)

        if (!foundedComment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        if(foundedComment.owner!==req.user.id){
            return res.status(400).json({msg: "You can't remove this coment"})
        }

        await CommentModel.findByIdAndDelete(id)

        res.status(201).json({ msg: "Deleted comment" })
    } catch (err) {
        next(err)
    }
};

module.exports = {
    addComment,
    removeComment
}