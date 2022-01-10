const validateJWT = (decoded, request, h) => !decoded.email ? { isValid: false } : { isValid: true }
module.exports = validateJWT