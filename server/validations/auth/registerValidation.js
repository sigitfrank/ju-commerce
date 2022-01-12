const validateEmail = require("../validateEmail.js")

const registerValidation = (payload) => {
    const { fullname, email, password, confirmPassword } = payload
    if (!fullname) return { status: false, message: 'Fullname can not be empty!' }
    if (!email) return { status: false, message: 'Email can not be empty!' }
    const isEmailVaid = validateEmail(email)
    if (!isEmailVaid) return { status: false, message: 'Email format is not valid!' }
    if (!password) return { status: false, message: 'Password can not be empty!' }
    if (!confirmPassword) return { status: false, message: 'Confirm Password can not be empty!' }
    if (confirmPassword !== password) return { status: false, message: 'Confirm Password must be same with Password!' }
    return { status: true, message: 'Valid!' }
}

module.exports = registerValidation