'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandCars } from "../redux/Slices/brandSlice";
import BrandHome from './components/BrandHome/BrandHome'
import NavBar from "./components/NavBar";
import StepsComponents from "./components/HomeSteps/index"


export default function Home() {

  const [steps, setSteps] = useState(false)

  const dispatch = useDispatch();
  const { brands, status, error } = useSelector((state) => state.brand);


  useEffect(() => {
    dispatch(getAllBrandCars());
  }, [dispatch]);

  return (
    <main className="flex flex-col min-h-screen bg-zinc-100">
  <NavBar />
  <div className="w-full py-10 flex flex-col items-center">
    <div className="flex flex-col md:flex-row w-full bg-gradient-to-r from-white to-gray-800 rounded-lg p-8 md:min-h-screen md:items-center md:justify-between">
      
      {/* Sección de texto y llamada a la acción */}
      <div className="flex flex-col md:w-1/2 mb-6 md:mb-0">
        <h1 className="text-4xl text-red-500 font-extrabold mb-4">
          Car of Duty
          <p className="text-lg text-gray-600 font-semibold">Servicio de autos</p>
        </h1>

        <p className="hidden md:block text-md text-gray-700 mb-4">
          Bienvenido a Car of Duty, la plataforma que simplifica la gestión de servicios para tu auto. 
          Aquí puedes detallar y cotizar servicios según tu vehículo y reservar turnos en línea. 
          Nuestro objetivo es ofrecerte confianza y comodidad en cada trámite.
        </p>

        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          ¡Gestiona tu servicio ahora!
        </h2>

        <button
          className="bg-red-600 hover:bg-red-700 transition duration-300 py-2 px-6 text-white font-semibold shadow rounded-lg self-start"
          onClick={() => setSteps(true)}
          href='#steps'
        >
          Empezar
        </button>
      </div>

      {/* Sección de marcas */}
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <BrandHome brand={brands} />
      </div>
    </div>

    {/* Componente de pasos (condicional) */}
    {steps && <StepsComponents open={steps} />}
  </div>
</main>

  
  );
}
