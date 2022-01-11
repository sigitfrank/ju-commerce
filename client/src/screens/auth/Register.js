import React, { useState } from 'react'
import '../../css/auth.css'
import { useNavigate } from "react-router-dom"
import { ClosedEye, Eye } from '../../components/Icons/Eyes'
function Register() {
    const navigate = useNavigate()
    const [shown, setShown] = useState({
        password: false,
        confirmPassword: false
    })
    const handleTogglePassword = (type) => {
        if (type === 'password') return setShown(prev => ({ ...prev, password: !prev.password }))
        if (type === 'confirmPassword') return setShown(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))
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
                                <input type="text" name="" id="" className="form-control" placeholder="ex: Sigit Tunggul Waskito" />
                                <small id="helpId" className="text-muted">Fullname</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <input type="text" name="" id="" className="form-control" placeholder="ex: sigit@gmail.com" />
                                <small id="helpId" className="text-muted">Email</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <div style={{ position: 'relative' }}>
                                    <input type={shown.password ? 'text' : 'password'} name="" id="" className="form-control" placeholder="******" />
                                    <span style={{ position: 'absolute', top: "5px", right: '10px', cursor: 'pointer' }} onClick={() => handleTogglePassword('password')}>
                                        {shown.password ? <Eye /> : <ClosedEye />}
                                    </span>
                                </div>
                                <small id="helpId" className="text-muted">Password</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <div style={{ position: 'relative' }}>
                                    <input type={shown.confirmPassword ? 'text' : 'password'} name="" id="" className="form-control" placeholder="******" />
                                    <span style={{ position: 'absolute', top: "5px", right: '10px', cursor: 'pointer' }} onClick={() => handleTogglePassword('confirmPassword')}>
                                        {shown.confirmPassword ? <Eye /> : <ClosedEye />}
                                    </span>
                                </div>
                                <small id="helpId" className="text-muted">Confirm Password</small>
                            </div>
                            <div className="btn-wrapper">
                                <button className="btn secondary me-1" >
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

export default Register
