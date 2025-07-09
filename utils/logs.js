const {createLogger, format, transports} = require("winston")
require("winston-mongodb")

const TransportOption = {
    db: "mongodb+srv://ibodullaevabror14:I3pwBnTLEWxw9VVV@cluster0.lkp4q6w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    collection: "log"
};

const Logger = createLogger({
    level: "debug",
    format: format.combine(
        format.json(),
        format.colorize({all: true})
    ),
    transports: [
        new transports.File({filename: "logs/error.log", level: "error"}),
        new transports.File({filename: "logs/combined.log"}),
        new transports.Console(),
        new transports.MongoDB(TransportOption) 
    ]
})

module.exports=Logger