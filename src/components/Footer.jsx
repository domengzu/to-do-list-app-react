import React from 'react'

const Footer = () => {
   const currentYear = new Date().getFullYear()

   return (
      <div className='text-center text-gray-500 dark:text-gray-400 mt-4 bottom-0 absolute w-full h-24' style={{ fontFamily: 'Poppins' }}>
         <small>&copy; {currentYear} made w/ dom</small>
      </div>
   )
}

export default Footer