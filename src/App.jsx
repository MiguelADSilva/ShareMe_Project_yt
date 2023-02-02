import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Login from './components/Login';
import Home from './containers/Home';
import { fetchUser } from './utils/fetchUser';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if(!user) navigate('/login');
  }, [])

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_API_TOKEN}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
