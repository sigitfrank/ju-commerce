
const createProductValidation = (payload, type = 'CREATE') => {
    const { name, price, image } = payload
    if (!name) return { status: false, message: 'Name can not be empty!' }
    if (!price) return { status: false, message: 'Price can not be empty!' }
    if (!image) return { status: false, message: 'Image can not be empty!' }
    if (type === 'CREATE') {
        if (typeof image === 'string') return { status: false, message: 'Image is not valid' }
    }
    return { status: true, message: 'Valid!' }
}

module.exports = createProductValidation
