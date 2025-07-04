const nodemailer = require("nodemailer")

module.exports = async function emailService(email, otp) {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ozodovk6@gmail.com",
            pass: "l o e c c k c z z o p m p w c r"
        }
    })
   await transport.sendMail({
    from: "ozodovk6@gmail.com",
    to: email,
    subject: "Library email verify",
    html: `OTP: <b style="font-size: 40px; color: blue;">${otp}</b>, ushbu kod 2 daqiqa amal qiladi`
   })
}