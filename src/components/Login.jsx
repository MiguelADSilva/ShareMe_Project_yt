import React, { useEffect } from 'react'
import { GoogleLogin, googleLogout} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import { gapi } from 'gapi-script'
import jwt_decode from 'jwt-decode'

import { client } from '../client'

import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

const Login = () => {
  const navigate = useNavigate()
  const clientId = import.meta.env.VITE_APP_GOOGLE_API_TOKEN; 

  useEffect(() => {
    const initClient = () => {
          gapi.auth2.init({
          clientId: clientId,
        });
     };
     gapi.load('client:auth2', initClient);
 });

  const responseGoogle = (response) => {
    const decode = jwt_decode(response.credential);

    { /* Se precisar de ver valores que retornam do decode e so acrescentar embaixo clg(decode) e por todo o codigo em comentario*/}
    
    localStorage.setItem('user', JSON.stringify(decode))
  
    const { sub, name, picture } = decode
  
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }
      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
        <div className='relative w-full h-full'>
          <video 
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='p-5'>
              <img 
                src={logo} 
                width='130px' alt='Logo' 
              />
            </div>

            <div className='shadow-2xl'>
              <GoogleLogin
                clientId = {clientId}
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login;