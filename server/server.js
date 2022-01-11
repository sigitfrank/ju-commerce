const Hapi = require('@hapi/hapi')
require('dotenv').config()
const Path = require('path');
const axios = require('axios')
const { XMLParser } = require("fast-xml-parser")
const validateJWT = require('./middleware/validateJWT.js')
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/login')

const init = async () => {
    const server = Hapi.server({
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        },
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST,
        routes: { cors: { origin: ['*'] } }
    })
    await server.start()
    await server.register(require('hapi-auth-jwt2'))
    await server.register(require('@hapi/inert'))
    server.auth.strategy('jwt', 'jwt',
        {
            key: process.env.SERVER_KEY,
            validate: validateJWT,
            verifyOptions: { algorithms: ['HS256'] }
        })

    // server.auth.default('jwt')

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

    server.route([
        ...authRoutes,
        ...productRoutes
    ])


    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()