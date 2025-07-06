const jwt = require("jsonwebtoken")
const { accestokenGenerate } = require("../utils/token_generator")

function refreshToken(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(404).json({ msg: "Refresh token not found" })
        }

        const decode = jwt.verify(refreshToken, process.env.REFRESH_JWT_SEKRET)
        req.user = decode

        const payload = {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        }

        const access_token = accestokenGenerate(payload)

        res.cookie("accessToken", access_token, { httpOnly: true, maxAge: 1000 * 60 * 15 })
        res.status(200).json({ msg: "Success" })
    } catch (error) {
        next(error)
    }
}

module.exports = refreshToken