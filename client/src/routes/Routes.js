import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import AddProduct from '../screens/product/AddProduct'
import Home from '../screens/home/Home'
import RequireAuth from './PrivateRoute'

function RoutesApp() {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <RequireAuth redirectTo="/login">
                        <Home />
                    </RequireAuth>
                }
            />
            <Route
                path="/add-product"
                element={
                    <RequireAuth redirectTo="/login">
                        <AddProduct />
                    </RequireAuth>
                }
            />
        </Routes>
    )
}
export default RoutesApp