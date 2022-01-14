const Hapi = require('@hapi/hapi')
require('dotenv').config()
const Path = require('path')
const validateJWT = require('./middleware/validateJWT.js')
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/login')
const importRoutes = require('./routes/import')
const logs = require('./logs/logs.js')

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
    await server.register(require("hapi-plugin-traffic"))
    server.auth.strategy('jwt', 'jwt',
        {
            key: process.env.SERVER_KEY,
            validate: validateJWT,
            verifyOptions: { algorithms: ['HS256'] }
        })
    // server.auth.default('jwt')
    server.route({
        method: 'GET',
        path: '/image/{filename}',
        handler: function (request, h) {
            const { filename } = request.params
            return h.file(`./public/assets/${filename}`);
        }
    });
    server.route([
        ...authRoutes,
        ...productRoutes,
        ...importRoutes
    ])
    server.events.on("response", (request) => {
        logs(request)
    })
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()