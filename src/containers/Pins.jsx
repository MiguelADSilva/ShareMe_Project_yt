import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import * as Components from '../components/indexComponents'

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Components.Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path="/" element={<Components.Feed />} />
          <Route path="/category/:categoryId" element={<Components.Feed />} />
          <Route path="/pin-detail/:pinId" element={<Components.PinDetail user={user && user} />} />
          <Route path="/create-pin" element={<Components.CreatePin user={user && user} />} />
          <Route path="/search" element={<Components.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Pins