const axios = require('axios')
const { XMLParser } = require('fast-xml-parser')
const pool = require('../database/db')

const handleImport = async (request, h) => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'openapikey': process.env.ELEVANIA_API_KEY,
        }
    }

    for (let index = 1; index <= 4; index++) {
        axios.get(`http://api.elevenia.co.id/rest/prodservices/product/listing?page=${index}`, axiosConfig).then(response => {
            const parser = new XMLParser()
            const { Products: { product } } = parser.parse(response.data)
            for (const data of product) {
                const { prdNo } = data
                axios.get(`http://api.elevenia.co.id/rest/prodservices/product/details/${prdNo}`, axiosConfig).then(detailResponse => {
                    const detailProduct = parser.parse(detailResponse.data)
                    const queryInsert = {
                        text: 'INSERT INTO products (sku, name, image, price, description, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                        values: [detailProduct.Product.sellerPrdCd, detailProduct.Product.prdNm, detailProduct.Product.prdImage01, detailProduct.Product.selPrc, detailProduct.Product.htmlDetail, new Date()],
                    }
                    pool.query(queryInsert).then(r => {
                    }).catch(e => {
                    })
                })
            }
        })
    }

    return {
        status: true
    }
}

module.exports = {
    handleImport
}