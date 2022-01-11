const Hapi = require('@hapi/hapi')
require('dotenv').config()
const Path = require('path');
const axios = require('axios')
const { XMLParser } = require("fast-xml-parser")
const validateJWT = require('./middleware/validateJWT.js')
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/login')
const importRoutes = require('./routes/import')

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

    server.route([
        ...authRoutes,
        ...productRoutes,
        ...importRoutes
    ])


    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()