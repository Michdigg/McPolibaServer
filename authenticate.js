const passport = require("passport")
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"

exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    signed: true,
    maxAge: eval('60 * 60 * 24 * 30') * 1000,
    sameSite: "none",
}

exports.getToken = user => {
    return jwt.sign(user, "jdhdhd-kjfjdhrhrerj-uurhr-jjge", {
        expiresIn: eval('60 * 15'),
    })
}

exports.getRefreshToken = user => {
    const refreshToken = jwt.sign(user, "fgkjddshfdjh773bdjsj84-jdjd774", {
        expiresIn: eval('60 * 60 * 24 * 30'),
    })
    return refreshToken
}

exports.verifyUser = passport.authenticate("jwt", { session: false })