import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainContainer from '../MainContainer'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/breads" />} />
            <Route path="/breads" element={<MainContainer />} />
            <Route path="/canastitas" element={<MainContainer />} />
            <Route path="/empanadas" element={<MainContainer />} />
            <Route path="/pides" element={<MainContainer />} />
            <Route path="/:id" element={<MainContainer />} />
        </Routes>
    )
}