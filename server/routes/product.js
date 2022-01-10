
const { BASE_PRODUCT_URL } = require('../api/v1/endpoint.js')
const { handleDeleteProduct, handleGetProducts, handleCreateProduct, handleUpdateProduct } = require('../controllers/productController.js')

const getProducts = () => {
    return {
        method: 'GET',
        path: BASE_PRODUCT_URL,
        handler: async (request, h) => handleGetProducts(request, h)
    }
}

const getProductDetail = () => {
    return {
        method: 'GET',
        path: `${BASE_PRODUCT_URL}/{id}`,
        handler: async (request, h) => handleDeleteProduct(request, h)
    }
}

const createProduct = () => {
    return {
        method: 'POST',
        path: BASE_PRODUCT_URL,
        handler: async (request, h) => handleCreateProduct(request, h)
    }
}

const updateProduct = () => {
    return {
        method: 'PUT',
        path: BASE_PRODUCT_URL,
        handler: async (request, h) => handleUpdateProduct(request, h)
    }
}

const deleteProduct = () => {
    return {
        method: 'DELETE',
        path: `${BASE_PRODUCT_URL}/{id}`,
        handler: async (request, h) => handleDeleteProduct(request, h)
    }
}

module.exports = {
    getProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    deleteProduct
}