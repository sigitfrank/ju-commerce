import validateEmail from "../validateEmail"

const registerValidation = (payload) => {
    const { fullname, email, password, confirmPassword } = payload
    if (!fullname) {
        alert('Fullname cannot be empty')
        return false
    }
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
    if (!confirmPassword) {
        alert('Confirm Password cannot be empty')
        return false
    }
    if (confirmPassword !== password) {
        alert('Password is not same with Confirm Password')
        return false
    }
    return true
}

export default registerValidation