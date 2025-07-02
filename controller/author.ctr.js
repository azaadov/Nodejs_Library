const AuthorMdel = require("../schema/auhtor.chema")


const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await AuthorMdel.find()
        res.status(200).json(authors)
    } catch (error) {
        next(error)
    }
}


const search = async (req, res, next) => {
    try {
        const {q} = req.query;
        const authors = await AuthorMdel.find({
            $or: [
                { fulName: { $regex: q, $options: "i" } },     
                { region: { $regex: q, $options: "i" } },     
                { period: { $regex: q, $options: "i" } },       
                { bio: { $regex: q, $options: "i" } },          
                { creativity: { $regex: q, $options: "i" } }   
            ]
        })
        res.status(200).json(authors)
    } catch (error) {
        next(error)
    }
}

const addAuthor = async (req, res, next) => {
    try {
        const { fulName, dateOfBirth, dateOfDeath, countOfBook,
            countOfAudioBook, period, bio, creativity, region } = req.body
        await AuthorMdel.create({
            fulName, dateOfBirth, dateOfDeath, countOfBook,
            countOfAudioBook, period, bio, creativity, region
        })

        res.status(201).json({ msg: "added new author" })
    } catch (error) {
        next(error)
    }
}


const getOneAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const author = await AuthorMdel.findById(id)
        if(!author){
            return res.status(401).json({msg:"author not found"})
        }
        res.status(200).json(author)
    } catch (error) {
        next(error)
    }
}


const updateAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const { fulName, dateOfBirth, dateOfDeath, countOfBook,
            countOfAudioBook, period, bio, creativity, region } = req.body
        const author = await AuthorMdel.findById(id)
        if(!author){
            return res.status(401).json({msg:"author not found"})
        }

         await AuthorMdel.findByIdAndUpdate(id, {fulName, dateOfBirth, dateOfDeath, countOfBook,
            countOfAudioBook, period, bio, creativity, region})
        res.status(201).json({msg:"Author updated"})
    } catch (error) {
        next(error)
    }
}


const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const author = await AuthorMdel.findById(id)
        if(!author){
            return res.status(401).json({msg:"author not found"})
        }

         await AuthorMdel.findByIdAndDelete(id)
        res.status(201).json({msg:"Author deleted"})
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getAllAuthors,
    search,
    addAuthor,
    getOneAuthor,
    updateAuthor,
    deleteAuthor
}