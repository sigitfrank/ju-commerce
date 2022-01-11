import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppStore from '../../store/store'
import jwt_decode from "jwt-decode";
import { getLocalStorage } from '../../helpers/localStorage';

function Header() {
    const { postLogout } = AppStore
    const { accessToken } = getLocalStorage()
    const { fullname } = jwt_decode(accessToken)
    const navigate = useNavigate()
    const handlePostLogout = () => {
        postLogout()
        navigate('/login')

    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">My App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Hi, {fullname}</a>
                        </li>
                        <li className="nav-item">
                            <a
                                style={{ cursor: 'pointer' }}
                                className="nav-link active" aria-current="page" onClick={() => handlePostLogout()}>Logout</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn primary" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header
