import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { CREATE_PRODUCT_URL, LOGIN_URL, REGISTER_URL } from '../api/api'
import createProductValidation from '../validations/createProductValidation'

export class Store {
    isAuth = false
    login = {
        email: '',
        password: ''
    }
    register = {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    createProduct = {
        name: '',
        description: '',
        price: '',
        image: '',
    }
    detailProduct = {
        name: '',
        description: '',
        price: '',
        image: '',
    }
    productModalDetail = false

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth = (value) => {
        this.isAuth = value
    }

    setLoginState = (value, type) => {
        if (type === 'email') return this.login.email = value
        if (type === 'password') return this.login.password = value
    }
    setRegisterState = (value, type) => {
        if (type === 'fullname') return this.register.fullname = value
        if (type === 'email') return this.register.email = value
        if (type === 'password') return this.register.password = value
        if (type === 'confirmPassword') return this.register.confirmPassword = value
    }

    setProductModalDetail = (value) => {
        this.productModalDetail = value
    }
    setCreateProduct = (value, type) => {
        if (type === 'name') return this.createProduct.name = value
        if (type === 'description') return this.createProduct.description = value
        if (type === 'price') return this.createProduct.price = value
        if (type === 'image') return this.createProduct.image = value
    }

    postLogin = async () => {
        try {
            const response = await axios.post(LOGIN_URL, {
                email: this.login.email,
                password: this.login.password
            })
            return response.data
        } catch (error) {
            console.log(error)
            return false
        }
    }

    postLogout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userAccessToken')
    }

    postRegister = async () => {
        try {
            const response = await axios.post(REGISTER_URL, {
                fullname: this.register.fullname,
                email: this.register.email,
                password: this.register.password,
                confirmPassword: this.register.confirmPassword
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    postCreateProduct = async (accessToken) => {
        const formData = new FormData()
        formData.append("name", this.createProduct.name)
        formData.append("price", this.createProduct.price)
        formData.append("description", this.createProduct.description)
        formData.append("image", this.createProduct.image)
        const isValid = createProductValidation(this.createProduct)
        if (!isValid) return
        try {
            const response = await axios.post(CREATE_PRODUCT_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            alert('Product created successfully')
            return true
        } catch (error) {
            return false
        }
    }
}

const AppStore = new Store()
export default AppStore
