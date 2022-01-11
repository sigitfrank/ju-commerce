import React from 'react'
import '../../css/main.css'
import Product from './Product'
function Main() {
    return (
        <div className='main'>
            <h3 className='text-center my-3'>List of Products</h3>
            <Product />
        </div>
    )
}

export default Main
