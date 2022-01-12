const Hapi = require('@hapi/hapi')
require('dotenv').config()
const Path = require('path')
const validateJWT = require('./middleware/validateJWT.js')
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/login')
const importRoutes = require('./routes/import')

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
server.register(require('hapi-auth-jwt2'))
server.register(require('@hapi/inert'))
server.register(require("hapi-plugin-traffic"))
server.auth.strategy('jwt', 'jwt',
    {
        key: process.env.SERVER_KEY,
        validate: validateJWT,
        verifyOptions: { algorithms: ['HS256'] }
    })
server.route([
    ...authRoutes,
    ...productRoutes,
    ...importRoutes
])
exports.init = async () => {
    await server.initialize();
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})
