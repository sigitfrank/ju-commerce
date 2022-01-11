const checkUser = require("./checkToken")

const validateJWT = async (decoded, request, h) => {
    if (decoded.email) {
        const res = await checkUser(decoded.email)
        if (!res) return { isValid: false }
        return { isValid: true }
    }
    return !decoded.email ? { isValid: false } : { isValid: true }
}
module.exports = validateJWT