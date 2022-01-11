const pool = require('../database/db.js')

const checkUser = async (email)=>{
    const response = await pool.query('SELECT email FROM "user" WHERE email = $1', [email])
    if (response.rows.length < 1) return false
    return true
}

module.exports = checkUser