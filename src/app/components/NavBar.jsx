'use client'
import { useState } from 'react';
import LogoBlanco from "./DutyShiftBlanco.png";
import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-sky-500 shadow-md w-full z-20 md:absolute">
  <div className="container mx-auto px-6 py-3 flex justify-between items-center">
    
    {/* Logo y nombre del sitio */}
    <div className="flex items-center space-x-2">
      <Image src={LogoBlanco} alt="logo-blanco" width="50" height="50" />
      <div className="flex flex-col items-center text-white">
        <p className="text-lg font-bold">Car of Duty</p>
        {/* <p className="text-sm font-semibold text-zinc-100">Car Duty Shift</p> */}
      </div>
    </div>

    {/* Menú para pantallas grandes */}
    <div className="hidden md:flex space-x-6 text-white">
      <a href="/" className="hover:text-gray-300">Inicio</a>
      {/* <a href="/mis-turnos" className="hover:text-gray-300">Mis Turnos</a>
      <a href="/products" className="hover:text-gray-300">Productos</a> */}
    </div>

    {/* Botón de menú móvil */}
    <button onClick={() => setIsOpen(!isOpen)} className="text-white md:hidden focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  </div>

  {/* Menú móvil (visible cuando isOpen es true) */}
  {isOpen && (
    <div className="md:hidden bg-blue-900 text-white flex flex-col space-y-2 py-4 px-6">
      <a href="/" className="hover:text-gray-300">Inicio</a>
      {/* <a href="/mis-turnos" className="hover:text-gray-300">Mis Turnos</a>
      <a href="/products" className="hover:text-gray-300">Productos</a> */}
    </div>
  )}
</nav>

  );
}

export default NavBar;