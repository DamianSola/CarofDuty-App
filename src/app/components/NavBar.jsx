'use client'
import { useState } from 'react';
import LogoBlanco from "./DutyShiftBlanco.png";
import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute z-20 bg-gradient-to-r to-sky-500 from-blue-900 shadow-md w-full">
      <div className="container mx-auto px-10 py-2 flex md:justify-between justify-center items-center text-center">
        <div className="flex flex-col text-white text-md px-6 items-center ">
            <Image src={LogoBlanco} alt="logo-blanco" width="90" height="90"/>
            <p className='text-sm text-zinc-100 font-bold'>Car of Duty</p>
            {/* <p className='text-zinc-100 font-bold'>Car Duty Shift</p> */}
        </div>
        {/* <div className="hidden md:flex space-x-6">
          <a href="#inicio" className="text-white hover:text-gray-300">Inicio</a>
          <a href="#steps" className="text-white hover:text-gray-300">Empezar</a>
          <a href="#contacto" className="text-white hover:text-gray-300">Contacto</a>
        </div> */}

        {/* Mobile Menu Button */}
        {/* <button onClick={() => setIsOpen(!isOpen)} className="text-white md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button> */}

        {/* Mobile Menu */}
        {/* {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-4">
            <a href="#inicio" className="text-white hover:text-gray-300">Inicio</a>
            <a href="#empezar" className="text-white hover:text-gray-300">Empezar</a>
            <a href="#contacto" className="text-white hover:text-gray-300">Contacto</a>
          </div>
        )} */}
      </div>
    </nav>
  );
}

export default NavBar;