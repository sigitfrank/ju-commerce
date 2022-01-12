import validateEmail from "../validateEmail"

const loginValidation = (payload) => {
    const { email, password } = payload
    if (!email) {
        alert('Email cannot be empty')
        return false
    }
    const isEmailVaid = validateEmail(email)
    if (!isEmailVaid) {
        alert('Email format is not valid')
        return false
    }
    if (!password) {
        alert('Password cannot be empty')
        return false
    }
    return true
}

export default loginValidation