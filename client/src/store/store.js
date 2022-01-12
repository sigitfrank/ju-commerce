import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { LOGIN_URL, PRODUCTS_URL, REGISTER_URL } from '../api/api'
import createProductValidation from '../validations/createProductValidation'

export class Store {
    search = ''
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
    productModalDetail = false
    products = []
    product = {}
    offset = 0
    limit = 5
    isLoading = false
    offsetInfinite = 0
    limitInfinite = 5

    constructor() {
        makeAutoObservable(this)
    }

    setOffset = () => {
        this.offset = this.offset + 5
    }

    setSearch = (value) => {
        if (!value) {
            this.getProducts({ accessToken: localStorage.getItem('userAccessToken'), offset: 0 })
        }
        this.search = value
    }
    postSearch = () => {
        this.products = this.products.filter(product => {
            return product.name.toLowerCase().includes(this.search);
        })
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
            await axios.post(REGISTER_URL, {
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
            const response = await axios.post(PRODUCTS_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            alert('Product created successfully')
            this.products.push(response.data.data)
            return true
        } catch (error) {
            return false
        }
    }
    putUpdateProduct = async (accessToken) => {
        const formData = new FormData()
        formData.append("id", this.product.id)
        formData.append("name", this.product.name)
        formData.append("price", this.product.price)
        formData.append("description", this.product.description)
        formData.append("image", this.product.image)
        const isValid = createProductValidation(this.product)
        if (!isValid) return
        try {
            await axios.put(PRODUCTS_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            alert('Product updated successfully')
            return true
        } catch (error) {
            alert(error.response.statusText)
            return false
        }
    }

    getProducts = async ({ accessToken, offset }) => {
        this.isLoading = true
        try {
            const response = await axios.get(`${PRODUCTS_URL}?offset=${offset}&limit=${this.limit}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            this.isLoading = false
            if (response.data.products.length === 0) {
                const oldProducts = this.products.slice(this.offsetInfinite, this.limitInfinite)
                this.limitInfinite += 5
                this.offsetInfinite += 5
                this.products = [...this.products, ...oldProducts]
                return
            }
            if (offset === 0) return this.products = response.data.products
            this.products = [...this.products, ...response.data.products]
            return true
        } catch (error) {
            this.isLoading = false
            return false
        }
    }
    getProductDetail = async ({ accessToken, id }) => {
        try {
            const response = await axios.get(`${PRODUCTS_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            this.product = response.data.product
            return true
        } catch (error) {
            return false
        }
    }
    deleteProduct = async ({ accessToken, id }) => {
        try {
            await axios.delete(`${PRODUCTS_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            this.products = this.products.filter(product => product.id !== id)
            return true
        } catch (error) {
            return false
        }
    }
    setDetailProduct = (value, type) => {
        if (type === 'name') return this.product.name = value
        if (type === 'price') return this.product.price = value
        if (type === 'description') return this.product.description = value
        if (type === 'image') return this.product.image = value
    }
}

const AppStore = new Store()
export default AppStore
