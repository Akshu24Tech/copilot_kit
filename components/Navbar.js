import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-16 bg-orange-400 text-white'>
        <div className="log mx-5 text-xl font-bold">iTodo</div>
        <div className='menus mx-5'>
            <ul className='flex gap-5 items-center'>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
