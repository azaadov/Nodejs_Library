const jwt = require("jsonwebtoken")

module.exports = function accesTokenMidlleware(req, res, next) {
    try {
        const accessToken = req.cookies.accessToken

        if (!accessToken) {
          return  res.status(404).json({ msg: "Access token not found" })
        }

        const decode = jwt.verify(accessToken, process.env.JWT_SEKRET)
        req.user = decode
        next()
    } catch (error) {
        next(error)
    }
}