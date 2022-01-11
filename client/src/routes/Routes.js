import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Routes } from 'react-router-dom'
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