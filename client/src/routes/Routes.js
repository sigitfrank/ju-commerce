import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'

function RoutesApp() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}
export default RoutesApp