import React, { useState } from 'react'
import '../../css/auth.css'
import { useNavigate } from "react-router-dom"
import { ClosedEye, Eye } from '../../components/Icons/Eyes'
import { observer } from 'mobx-react'
import AppStore from '../../store/store'
import { setLocalStorage } from '../../helpers/localStorage'
const Login = () => {
    const navigate = useNavigate()
    const [shown, setShown] = useState(false)
    const { login, setLoginState, postLogin, setIsAuth } = AppStore

    const handleLogin = async () => {
        const res = await postLogin()
        if (!res) return 
        setIsAuth(true)
        setLocalStorage(res.accessToken)
        navigate('/')
    }

    return (
        <div className='section-auth'>
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card">
                            <h2>Welcome to Ju Commerce</h2>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <input type="text" value={login.email} onChange={(e) => setLoginState(e.target.value, 'email')} name="email" id="email" className="form-control" placeholder="ex: sigit@gmail.com" />
                                <small id="helpId" className="text-muted">Email</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <div style={{ position: 'relative' }}>
                                    <input value={login.password} type={shown ? 'text' : 'password'} onChange={(e) => setLoginState(e.target.value, 'password')} name="password" id="password" className="form-control" placeholder="******" />
                                    <span style={{ position: 'absolute', top: "5px", right: '10px', cursor: 'pointer' }} onClick={() => setShown(prev => !prev)}>
                                        {shown ? <Eye /> : <ClosedEye />}
                                    </span>
                                </div>
                                <small id="helpId" className="text-muted">Password</small>
                            </div>
                            <div className="btn-wrapper">
                                <button className="btn primary me-1" onClick={handleLogin}>
                                    Login
                                </button>
                                <button className="btn secondary ms-1" onClick={() => navigate('/register')}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Login)
