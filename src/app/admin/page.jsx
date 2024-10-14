'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandCars } from "../../redux/Slices/brandSlice";
import Sidebar from "./Sidebar";
import Card from "./Card";
import Stats from "./Stats";
import Settings from "./Settings";
import Sections from "../components/Dashboard/Sections";
import Loading from "./loading";
import Logo from "../components/BrandHome/logoBlue.png";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { brands, status } = useSelector((state) => state.brand);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllBrandCars());
    setIsLoading(false); // Cambiar el estado de carga
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        {/* Título principal del Dashboard */}
        <div className="min-h-min p-6 bg-gray-100 justify-center md:text-left text-center">
          <h1 className="bg-blue-600 text-white text-4xl font-bold py-4 px-6 rounded-lg shadow-lg text-center mb-10">
            Dashboard
          </h1>

          {/* Sección del título "Car of Duty" */}
          <div className="md:flex block items-center justify-left">
            <div className="text-center mb-8 m-auto">
              <Image src={Logo} width={150} height={150} alt="logo-duty" className="m-auto" />
              <h1 className="text-4xl text-red-500 font-extrabold mb-2">Car of Duty</h1>
              <p className="text-lg text-gray-600 font-semibold">Servicio de autos</p>
            </div>
            <Loading status={status} />
            <a href="#datos"
                className="inline-block text-xl font-medium text-blue-600 border h-fit border-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out my-8"
            >Ver todos los datos</a>
            </div>
        </div>

        <Stats />

        <Settings />

            <h2 className="text-2xl font-bold text-blue-600 my-4">Datos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="datos">
                <Sections title='Autos'  date={brands} />
                <Sections title='Marcas' date={brands}/>
                <Sections title='Servicios' date={{}}/>
                <Sections title='Productos' date={{}}/>
                <Sections title='Turnos' date={{}}/>
            </div>       
      </main>
    </div>
  );
};

export default AdminDashboard;


