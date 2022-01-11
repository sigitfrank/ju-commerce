import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import { getLocalStorage } from '../../helpers/localStorage'
import Main from './Main'

function Home() {
    const { accessToken } = getLocalStorage()
    const navigate = useNavigate()
    useEffect(() => {
        if (!accessToken) navigate('/login')
    }, [accessToken, navigate])
    return (<>
        <Header />
        <Main />
    </>)
}

export default Home
