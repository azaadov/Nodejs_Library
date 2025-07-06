const jwt = require("jsonwebtoken")


const accestokenGenerate = (paylod) => {
    return jwt.sign(paylod, process.env.JWT_SEKRET, {expiresIn: "15m"})
}

const refreshtokenGenerate = (paylod) => {
    return jwt.sign(paylod, process.env.REFRESH_JWT_SEKRET, {expiresIn: "7d"})
}

module.exports={
    accestokenGenerate,
    refreshtokenGenerate
}