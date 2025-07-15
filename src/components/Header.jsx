import React from 'react'
import {ThemeToggle} from './ThemeToggle'
import { Button } from '@chakra-ui/react'
import { BellRing, Menu, X } from 'lucide-react'
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <div className='w-full h-16 bg-surface flex justify-between items-center shadow-md relative' style={{ padding: '0 50px' }}>
      <div className='flex justify-between items-center w-full px-4 md:hidden'>
        <h1 className='items-center gap-2 font-bold flex text-lg' style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
          <BellRing size={20}/> My TO-DO</h1>
          <Button 
            variant="ghost"
            size="sm"
            onClick={toggleMenu}  // Fixed: was "onclick", should be "onClick"
            className='p-2'
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
      </div>
      <div className='hidden md:flex justify-between items-center w-full px-8 lg:px-16 xl:px-32' style={{ padding: '0 35em' }}>
        <h1 className='text-xl font-bold flex items-center gap-2' style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
          <BellRing size={24} /> 
          My TO-DO
        </h1>
        <ThemeToggle />
      </div>
      {isOpen && (
          <div className='absolute top-16 left-0 right-0 bg-surface shadow-lg border-t md:hidden z-50'>
            <div className='p-4 flex flex-col space-y-4'>
              <div className='flex justify-center'>
                <ThemeToggle />
              </div>
              {/* Add more menu items here if needed */}
            </div>
          </div>
        )}
    </div>
    {isOpen && (
        <div 
          className='fixed inset-0 bg-black/20 z-40 md:hidden'
          onClick={toggleMenu}
        />
      )}
    
    </>
    
  )
}

export default Header