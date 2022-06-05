import React from 'react';
import {  Routes, Route } from 'react-router-dom';




export const useRoutes = (isLogin) => {
    // debugger
    if (isLogin) {
        return (
            <Routes>
                <Route exact path="/"  />
            </Routes>
        )
    }
        return (
            <Routes>
                {/* <Route exact path="*" element={<AuthPage/>}  /> */}
            </Routes>
        )
    
    
}