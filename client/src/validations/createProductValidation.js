
const createProductValidation = (payload)=>{
    const {name, price, image} = payload
    if(!name) {
        alert('Name cannot be empty')
        return false
    }
    if(!price){
        alert('Price cannot be empty')
        return false
    }
    if(!image){
        alert('Image cannot be empty')
        return false
    }
    return true
}

export default createProductValidation
