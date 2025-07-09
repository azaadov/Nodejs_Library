const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});


const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel
