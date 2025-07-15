import React from 'react'
import {ThemeToggle} from './ThemeToggle'
import { BellRing } from 'lucide-react'


const Header = () => {
  return (
    <>
    <div className='w-full h-16 bg-surface flex justify-between items-center shadow-md'>
      <div className='flex justify-between items-center w-full' style={{ padding: '0 35em' }}>
        <h1 className='text-center flex' style={{ fontFamily: 'Poppins', fontWeight: 'bolder' }}><BellRing /> My TO-DO</h1>
        <ThemeToggle />
      </div>
    </div>
    
    </>
    
  )
}

export default Header