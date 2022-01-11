import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import AddProduct from '../screens/home/AddProduct'
import Home from '../screens/home/Home'

function RoutesApp() {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
        </Routes>
    )
}
export default RoutesApp