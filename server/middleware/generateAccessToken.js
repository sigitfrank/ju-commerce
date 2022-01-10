const jwt = require('jsonwebtoken')
function generateAccessToken(user) {
    return jwt.sign(user, process.env.SERVER_KEY, { expiresIn: '14400s' })
}

module.exports = generateAccessToken