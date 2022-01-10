const Hapi = require('@hapi/hapi')
require('dotenv').config()
const axios = require('axios')
const { XMLParser } = require("fast-xml-parser")
const Boom = require('@hapi/boom');
const { getProducts, getProductDetail, createProduct, updateProduct, deleteProduct } = require('./routes/product');

const init = async () => {
    const server = Hapi.server({
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST
    })

    await server.start()

    server.route({
        method: 'GET',
        path: '/import',
        handler: async (request, reply) => {

            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'openapikey': process.env.ELEVANIA_API_KEY,
                }
            }
            try {
                const response = await axios.get('http://api.elevenia.co.id/rest/prodservices/product/listing?page=1', axiosConfig)
                const parser = new XMLParser()
                const { Products: { product } } = parser.parse(response.data)
                let productList = []
                for (const data of product) {
                    const { prdNo } = data
                    const detailResponse = await axios.get(`http://api.elevenia.co.id/rest/prodservices/product/details/${prdNo}`, axiosConfig)
                    const detailProduct = parser.parse(detailResponse.data)
                    const productObj = {
                        sku: detailProduct.sellerPrdCd,
                        name: detailProduct.prdNm,
                        description: detailProduct.htmlDetail,
                        price: detailProduct.selPrc,
                        image: detailProduct.prdImage01
                    }
                    productList.push(productObj)
                }

                return productList
            } catch (error) {
                console.log(error)
                return reply.response({ status: false }).code(400)
            }
        }
    })


    server.route(getProducts())
    server.route(getProductDetail())
    server.route(createProduct())
    server.route(updateProduct())
    server.route(deleteProduct())

    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()