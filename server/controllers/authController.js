const jwt = require("jsonwebtoken")
const Boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const pool = require('../database/db.js')
const loginValidation = require("../validations/auth/loginValidation.js")
const registerValidation = require("../validations/auth/registerValidation.js")


const handleLogin = async (request, h) => {
    const { email: emailPayload, password: passwordPayload } = request.payload
    const { status, message } = loginValidation(request.payload)
    try {
        if (!status) throw Error(message)
        const response = await pool.query('SELECT id, fullname, password, email, created_at, updated_at FROM "user" WHERE email = $1', [emailPayload])
        if (response.rows.length < 1) throw Error('User not found')
        const { id, fullname, email, created_at, updated_at, password } = response.rows[0]
        const validatePassword = await bcrypt.compare(passwordPayload, password)
        if (!validatePassword) throw Error('Password is invalid')
        const user = { id, fullname, email, created_at, updated_at }
        const accessToken = jwt.sign(user, process.env.SERVER_KEY)
        return {
            status: true,
            accessToken
        }
    } catch (error) {
        throw Boom.badRequest('Something went wrong: ' + error.message);
    }
}

const handleRegister = async (request, h) => {
    const { fullname, email, password } = request.payload
    const { status, message } = registerValidation(request.payload)

    const hashedPassword = await bcrypt.hash(password, 10)
    const queryInsert = {
        text: 'INSERT INTO "user" (fullname, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING id, fullname, email',
        values: [fullname, email, hashedPassword, new Date()],
    }
    try {
        if (!status) throw Error(message)
        const response = await pool.query(queryInsert)
        return {
            status: true,
            data: response.rows[0]
        }
    } catch (error) {
        throw Boom.badRequest('Something went wrong: ' + error.message);
    }
}

module.exports = {
    handleLogin,
    handleRegister
}