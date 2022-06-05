import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import Navbar from './components/Navbar/Navbar'
import PostInServer from './components/AddPost/PostInServer';
import MainPage from './components/MainPage/MainPage';
import { FormLogin } from './components/Login/FormLogin';
import { FormRegister } from './components/Register/FormRegister';



function App() {
  const { login, logout, isReady, token, userId } = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{ login, logout, isReady, token, userId, isLogin }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<FormLogin />} />
            <Route path="/register" element={<FormRegister />} />
            <Route path="/posts" element={<PostInServer />} />
          </Routes>
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
