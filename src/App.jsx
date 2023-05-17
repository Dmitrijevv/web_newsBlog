import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import Navbar from './components/Navbar/Navbar'
import PostInServer from './pages/AddPost/PostInServer';
import MainPage from './pages/MainPage/MainPage';
import { FormLogin } from './pages/Login/FormLogin';
import { FormRegister } from './pages/Register/FormRegister';
import PostPage from './pages/MainPage/PostPage/PostPage';
import Profile from './pages/Profile/Profile';
import { useTheme } from './hooks/themes.hook';



function App() {
  const { login, logout, isReady, token, userId, name } = useAuth()
  const { dark, light } = useTheme()
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{ login, logout, isReady, token, userId, isLogin, dark, light, name }}>
      <div className="App bg-slate-700 text-slate-300 h-screen">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path='/post/:id' element={<PostPage/>}/>
            <Route path="/login" element={<FormLogin />} />
            <Route path="/profile" element={<Profile />} />
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
