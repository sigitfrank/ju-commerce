import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/main.css'
import Product from './Product'
function Main() {
    const navigate = useNavigate()
    return (
        <div className='main'>
            <div className='top'>
                <h3 className='text-center my-3'>List of Products</h3>
                <button className='btn secondary' onClick={() => navigate('/add-product')}>Add</button>
            </div>
            <Product />
        </div>
    )
}

export default Main
