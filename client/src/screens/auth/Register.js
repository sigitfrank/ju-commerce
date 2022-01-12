import React, { useState } from 'react'
import '../../css/auth.css'
import { useNavigate } from "react-router-dom"
import { ClosedEye, Eye } from '../../components/Icons/Eyes'
import { observer } from 'mobx-react'
import AppStore from '../../store/store'
function Register() {
    const navigate = useNavigate()
    const { register, setRegisterState, postRegister } = AppStore

    const [shown, setShown] = useState({
        password: false,
        confirmPassword: false
    })
    const handleTogglePassword = (type) => {
        if (type === 'password') return setShown(prev => ({ ...prev, password: !prev.password }))
        if (type === 'confirmPassword') return setShown(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))
    }

    const handleRegister = async () => {
        const res = await postRegister()
        if (!res) return
        alert('Register successfully')
        navigate('/login')
    }

    return (
        <div className='section-auth'>
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card">
                            <h2>Register</h2>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <input type="text" name="fullname" value={register.fullname} id="fullname" onChange={(e) => setRegisterState(e.target.value, 'fullname')} className="form-control" placeholder="ex: Sigit Tunggul Waskito" />
                                <small id="helpId" className="text-muted">Fullname</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <input type="text" name="email" id="email" value={register.email} onChange={(e) => setRegisterState(e.target.value, 'email')} className="form-control" placeholder="ex: sigit@gmail.com" />
                                <small id="helpId" className="text-muted">Email</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <div style={{ position: 'relative' }}>
                                    <input type={shown.password ? 'text' : 'password'} value={register.password} onChange={(e) => setRegisterState(e.target.value, 'password')} name="password" id="password" className="form-control" placeholder="******" />
                                    <span style={{ position: 'absolute', top: "5px", right: '10px', cursor: 'pointer' }} onClick={() => handleTogglePassword('password')}>
                                        {shown.password ? <Eye /> : <ClosedEye />}
                                    </span>
                                </div>
                                <small id="helpId" className="text-muted">Password</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <div style={{ position: 'relative' }}>
                                    <input type={shown.confirmPassword ? 'text' : 'password'} value={register.confirmPassword} onChange={(e) => setRegisterState(e.target.value, 'confirmPassword')} name="confirmPassword" id="confirmPassword" className="form-control" placeholder="******" />
                                    <span style={{ position: 'absolute', top: "5px", right: '10px', cursor: 'pointer' }} onClick={() => handleTogglePassword('confirmPassword')}>
                                        {shown.confirmPassword ? <Eye /> : <ClosedEye />}
                                    </span>
                                </div>
                                <small id="helpId" className="text-muted">Confirm Password</small>
                            </div>
                            <div className="btn-wrapper">
                                <button className="btn secondary me-1" onClick={handleRegister}>
                                    Register
                                </button>
                                <button className="btn primary ms-1" onClick={() => navigate('/login')}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Register)
