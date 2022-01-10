const { LOGIN_URL, REGISTER_URL } = require("../api/v1/endpoint")
const { handleLogin, handleRegister } = require("../controllers/authController")

const login = () => {
    return {
        method: 'POST',
        path: LOGIN_URL,
        handler: async (request, h) => handleLogin(request, h)
    }
}

const register = () => {
    return {
        method: 'POST',
        path: REGISTER_URL,
        handler: async (request, h) => handleRegister(request, h)
    }
}

module.exports = [
    login(),
    register()
]