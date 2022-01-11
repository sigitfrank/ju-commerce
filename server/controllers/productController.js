
const pool = require('../database/db.js')
const Boom = require('@hapi/boom')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const handleGetProducts = async (request, h) => {
    const {offset, limit} = request.query
    try {
        const response = await pool.query(`SELECT id, sku, name, image, description FROM products OFFSET ${offset} LIMIT ${limit}`)
        return {
            status: true,
            products: response.rows,
        }
    } catch (error) {
        throw Boom.badRequest('Something went wrong: ' + error.message)
    }
}

const handleGetProductDetail = async (request, h) => {
    const { id } = request.params
    try {
        const response = await pool.query('SELECT * FROM products WHERE id = $1', [id])
        return {
            status: true,
            product: response.rows[0] || []
        }
    } catch (error) {
        throw Boom.badRequest('Something went wrong: ' + error.message)
    }
}

const handleCreateProduct = async (request, h) => {
    const { name, image, price, description } = request.payload
    const file = fs.readFileSync(image.path)
    const base64String = Buffer.from(file).toString('base64')
    const queryInsert = {
        text: 'INSERT INTO products (sku, name, image, price, description, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [uuidv4(), name, base64String, price, description, new Date()],
    }
    try {
        const response = await pool.query(queryInsert)
        return {
            status: true,
            data: response.rows[0]
        }
    } catch (error) {
        throw Boom.badRequest('Something went wrong: ' + error.message)
    }
}

const handleUpdateProduct = async (request, h) => {
    const { id, name, image, price, description } = request.payload
    let base64String = image
    if(image.path){
        const file = fs.readFileSync(image.path)
        base64String = Buffer.from(file).toString('base64')
    }
    const queryUpdate = {
        text: 'UPDATE products SET name = $1, image = $2, price = $3, description = $4, updated_at = $5 WHERE id = $6',
        values: [name, base64String, price, description, new Date(), id],
    }
    try {
        const response = await pool.query(queryUpdate)
        return {
            status: true,
            message: response.rowCount > 0 ? 'Product updated succesfully' : 'Product not found'
        }
    } catch (error) {
        throw Boom.badRequest('Something went wrong: ' + error.message)
    }
}

const handleDeleteProduct = async (request, h) => {
    const { id } = request.params
    try {
        const response = await pool.query('DELETE FROM products WHERE id = $1', [id])
        return {
            status: true,
            product: response.rows[0] || []
        }
    } catch (error) {
        throw Boom.badRequest('Something went wrong: ' + error.message)
    }
}

module.exports = {
    handleGetProducts,
    handleGetProductDetail,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct
}