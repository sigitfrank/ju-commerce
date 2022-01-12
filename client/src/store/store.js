import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { LOGIN_URL, PRODUCTS_URL, REGISTER_URL } from '../api/api'
import loginValidation from '../validations/auth/loginValidation'
import registerValidation from '../validations/auth/registerValidation'
import createProductValidation from '../validations/product/createProductValidation'

class Store {
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

    postLogin = async () => {
        const isValid = loginValidation(this.login)
        if(!isValid) return
        try {
            const response = await axios.post(LOGIN_URL, {
                email: this.login.email,
                password: this.login.password
            })
            return response.data
        } catch (error) {
            alert(error.response.data.message)
            return false
        }
    }

    postLogout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userAccessToken')
    }

    postRegister = async () => {
        const isValid = registerValidation(this.register)
        if(!isValid) return
        try {
            await axios.post(REGISTER_URL, {
                fullname: this.register.fullname,
                email: this.register.email,
                password: this.register.password,
                confirmPassword: this.register.confirmPassword
            })
            return true
        } catch (error) {
            alert(error.response.data.message)
            return false
        }
    }

}

const AppStore = new Store()
export default AppStore
