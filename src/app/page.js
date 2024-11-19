'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandCars } from "../redux/Slices/brandSlice";
import BrandHome from './components/BrandHome/BrandHome'
import NavBar from "./components/NavBar";
// import Router from "next/router";
import { useRouter } from "next/navigation";

export default function Home() {

  const [steps, setSteps] = useState(false)

  const dispatch = useDispatch();
  const { brands, status, error } = useSelector((state) => state.brand);

  const router = useRouter()


  const clickMange = () => {
    router.push('/manage')
  }


  useEffect(() => {
    dispatch(getAllBrandCars());
  }, [dispatch]);

  return (
    <main className="flex flex-col min-h-screen bg-zinc-100">
  <NavBar />
  <div className="w-full pt-10 flex flex-col items-center">
    <div className="flex flex-col w-full bg-blue-950 rounded-lg p-8 md:min-h-screen md:items-center md:justify-between">
      
      {/* Sección de texto y llamada a la acción */}
      <div className="flex flex-col text-center w-full mb-6  space-y-6">
        <h1 className="text-4xl text-red-600 font-extrabold mb-4">
          Car of Duty
          <p className="text-lg text-gray-300 font-semibold">Servicio de autos</p>
        </h1>

        <p className="hidden md:block text-md text-gray-400 mb-4">
          Bienvenido a Car of Duty, la plataforma que simplifica la gestión de servicios para tu auto. 
          Aquí puedes detallar y cotizar servicios según tu vehículo y reservar turnos en línea. 
          Nuestro objetivo es ofrecerte confianza y comodidad en cada trámite.
        </p>

        <h2 className="text-3xl font-bold text-white mb-4">
          ¡Gestiona tu servicio ahora!
        </h2>

        <button
          className="bg-red-600 hover:bg-red-700 transition duration-300 m-auto py-2 px-6 text-white font-semibold shadow rounded-lg self-start"
          onClick={clickMange}
          href='#steps'
        >
          Empezar
        </button>
      </div>

      {/* Sección de marcas */}
      <div className="w-full flex justify-center">
        <BrandHome brand={brands} />
      </div>
    </div>
  </div>
</main>

  
  );
}
