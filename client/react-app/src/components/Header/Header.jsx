import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='shadow sticky z-50 top-0  bg-orange-300'>
        <nav className='px-6 lg:px-6 py-4  border-bottom border-gray-300 '>
            <div className=' flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
                <div>
                <Link to="/" className='flex items-center text-xl text-white font-bold'>
                Reflectify
                </Link>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header