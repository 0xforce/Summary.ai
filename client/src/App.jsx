import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


import { Home, CreatePost } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to='/' className="font-bold text-4xl bg-[#6469ff] bg-clip-text text-transparent hover:bg-[#6469ff] hover:bg-clip-text transition-colors">
          <span className="text-black">Synthax</span>
          <span className="text-green-700">.ai</span>
        </Link>

        <Link to='/profile' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Profile
        </Link>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path="/profile" element={<Home />} />
          <Route path="/" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

