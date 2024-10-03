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
    <main className="flex min-h-screen flex-col items-center bg-zinc-100">
      <NavBar/>
      <div className="z-10 w-full py-10 rounded-lg flex flex-col ">
        <div className="md:flex block w-full px-10 bg-gradient-to-r from-white to-gray-800 md:min-h-screen items-center">
          <div className='block md:w-1/2'>
          <h1 className="text-4xl text-red-500 font-extrabold py-4">Car of Duty 
            <p className="text-lg text-gray-600 font-semibold">Servicio de autos</p>
          </h1>
          <p className="text-md py-2">
            Bienvenido a Car of Duty, la plataforma que simplifica la gestión de servicios para tu auto. 
            Aquí puedes detallar y cotizar servicios según tu vehículo y reservar turnos en línea. 
            Nuestro objetivo es ofrecerte confianza y comodidad en cada trámite.
          </p>
          <h1 className="text-3xl font-bold text-left text-blue-600 my-4">¡Gestiona tu servicio ahora!</h1>
            <button
              className={`bg-red-600 hover:bg-red-700 max-w-1/4 transition duration-300 py-2 px-4 text-white font-semibold shadow rounded flex`}
              onClick={() => setSteps(true)}
              href='#steps'
              >
              Empezar
            </button>
          </div>
          <BrandHome brand={brands} />
        </div>
        { steps &&  <StepsComponents open={steps}/>}
      </div>
  </main>
  
  );
}
