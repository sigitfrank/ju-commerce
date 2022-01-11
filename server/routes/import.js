const { IMPORT_URL } = require("../api/v1/endpoint")
const { handleImport } = require("../controllers/importController")

const importData = () => {
    return {
        method: 'GET',
        path: IMPORT_URL,
        handler: async (request, h) => handleImport(request, h)
    }
}

module.exports = [importData()]
