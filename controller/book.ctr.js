const BookMdel = require("../schema/book.schema")


const getAllBooks = async (req, res, next) => {
    try {
        const books = await BookMdel.find().populate("author", "fulName -_id")
        res.status(200).json(books)
    } catch (error) {
        next(error)
    }
}


const searchBook = async (req, res, next) => {
    try {
        const {q} = req.query;
        const books = await BookMdel.find({
            $or: [
                { title: { $regex: q, $options: "i" } },     
                { genre: { $regex: q, $options: "i" } },       
                { period: { $regex: q, $options: "i" } }
            ]
        })
        res.status(200).json(books)
    } catch (error) {
        next(error)
    }
}

const addBook = async (req, res, next) => {
    try {
        const { title, author, genre, rating,
            pageCount, publishYear, language, description, period, commentary } = req.body

            const existingBook = await BookMdel.findOne({title, author})
            if(existingBook){
                return res.status(400).json({msg:"bu kitob allaqachon mavjud"})
            }
        await BookMdel.create({
            title, author, genre, rating,
            pageCount, publishYear, language, description, period, commentary
        })
        res.status(201).json({ msg: "added new book" })
    } catch (error) {
        next(error)
    }
}


const getOneBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await BookMdel.findById(id)
        if(!book){
            return res.status(401).json({msg:"book not found"})
        }
        res.status(200).json(book)
    } catch (error) {
        next(error)
    }
}


const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, author, genre, rating,
            pageCount, publishYear, language, description, period, commentary } = req.body
        const book = await BookMdel.findById(id)
        if(!book){
            return res.status(401).json({msg:"book not found"})
        }

         await BookMdel.findByIdAndUpdate(id, {title, author, genre, rating,
            pageCount, publishYear, language, description, period, commentary})
        res.status(201).json({msg:"book updated"})
    } catch (error) {
        next(error)
    }
}


const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await BookMdel.findById(id)
        if(!book){
            return res.status(401).json({msg:"book not found"})
        }

         await BookMdel.findByIdAndDelete(id)
        res.status(201).json({msg:"book deleted"})
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getAllBooks,
    searchBook,
    addBook,
    getOneBook,
    updateBook,
    deleteBook
}