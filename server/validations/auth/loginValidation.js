const validateEmail = require("../validateEmail.js")


const loginValidation = (payload) => {
    const { email, password } = payload
    if (!email) return { status: false, message: 'Email can not be empty!' }
    const isEmailVaid = validateEmail(email)
    if (!isEmailVaid) return { status: false, message: 'Email format is not valid' }
    if (!password) return { status: false, message: 'Password can not be empty!' }
    return { status: true, message: 'Valid!' }
}

module.exports = loginValidation