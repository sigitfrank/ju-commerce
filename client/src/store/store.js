import { makeAutoObservable } from 'mobx'

export class Store {
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
}

const AppStore = new Store()
export default AppStore
