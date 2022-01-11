const validateJWT = (decoded, request, h) => {

    return !decoded.email ? { isValid: false } : { isValid: true }
}
module.exports = validateJWT