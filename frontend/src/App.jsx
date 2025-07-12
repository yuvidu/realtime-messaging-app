import React from 'react'
import {  Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import Navbar from './components/navbar.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import { useAuthStore } from './store/useAuthStore.js'
import {Toaster} from 'react-hot-toast'

//import {Loader} from 'lucide-react'


const App = () => {

  const {authuser,checkauth,isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkauth()
  }, [checkauth])
  console.log("Auth User:", authuser )

  if (isCheckingAuth && !authuser){
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    )
  }
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authuser ? <Home /> : <Navigate to="/login"/>}/>
        <Route path="/signup" element= {!authuser ? <SignUpPage /> : <Navigate to="/"/>}/>
        <Route path="/login" element= {!authuser ? <LoginPage /> : <Navigate to="/login"/>}/>
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authuser ? <ProfilePage /> : <Navigate to="/login"/>}/>
      </Routes>
      <Toaster position="top-center" />

    </div>

  )
}

export default App
