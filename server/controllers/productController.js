
const pool = require('../database/db.js')
const Boom = require('@hapi/boom')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const createProductValidation = require('../validations/product/createProductValidation.js')
const handleFileUpload = require('../helpers/handleFileUpload.js')
const { unlink } = require('fs/promises')

const handleGetProducts = async (request, h) => {
    const { offset, limit } = request.query
    try {
        const response = await pool.query(`SELECT id, sku, name, image, description FROM products ORDER BY updated_at DESC OFFSET ${offset} LIMIT ${limit}`)
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
            product: response.rows[0] || {}
        }
    } catch (error) {
        throw Boom.badRequest('Something went wrong: ' + error.message)
    }
}

const handleCreateProduct = async (request, h) => {
    const { name, image, price, description } = request.payload
    const { status, message } = createProductValidation(request.payload)
    try {
        if (!status) throw Error(message)
        const bufferFile = fs.promises.readFile(image.path);
        const filename = `${Date.now()}-${image.filename.replace(/ /g, "_")}`
        const { isUploaded, messageimage } = await bufferFile.then((buffer) => handleFileUpload(buffer, filename))
        if (!isUploaded) throw Error(messageimage)
        const date = new Date()
        const queryInsert = {
            text: 'INSERT INTO products (sku, name, image, price, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            values: [uuidv4(), name, filename, price, description, date, date],
        }
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
    const { status, message } = createProductValidation(request.payload, 'UPDATE')
    try {
        if (!status) throw Error(message)
        let filename = image
        if (image.path) {
            const bufferFile = fs.promises.readFile(image.path);
            filename = `${Date.now()}-${image.filename.replace(/ /g, "_")}`
            const { isUploaded, messageimage } = await bufferFile.then((buffer) => handleFileUpload(buffer, filename))
            if (!isUploaded) throw Error(messageimage)
        }
        const queryUpdate = {
            text: 'UPDATE products SET name = $1, image = $2, price = $3, description = $4, updated_at = $5 WHERE id = $6',
            values: [name, filename, price, description, new Date(), id],
        }
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
        const response = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id])
        const oldImg = response.rows[0].image
        if (oldImg) {
            try {
                if (fs.existsSync(`./public/assets/${oldImg}`)) await unlink(`./public/assets/${oldImg}`);
            } catch (error) {
                console.error('there was an error:', error.message);
            }
        }
        return {
            status: true,
            product: response.rowCount
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