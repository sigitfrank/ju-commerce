import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import { getLocalStorage } from '../../helpers/localStorage'
import Main from './Main'

function Home() {
    const { accessToken } = getLocalStorage()
    const navigate = useNavigate()
    useEffect(() => {
        if (!accessToken) navigate('/login')
    }, [accessToken])
    return (<>
        <Header />
        <Main />
        <Footer />
    </>)
}

export default Home
