const { authorValidate } = require("../validation/author.validate")


module.exports=function(req, res, next) {
    const {error} = authorValidate(req.body)
    if(error){
        return res.status(400).json({msg: error.details[0].message})
    }
    next()
}