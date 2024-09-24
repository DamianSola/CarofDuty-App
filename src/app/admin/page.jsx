'use client'
import React,{useEffect} from "react";
import Image from "next/image";
import BrandHome from "../components/BrandHome/BrandHome";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandCars } from "../../redux/Slices/brandSlice";
import Sections from '../components/Dashboard/Sections'
import Loading from './loading';
import Logo from '../components/BrandHome/logoBlue.png'

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const { brands, status, error } = useSelector((state) => state.brand);
  
  
    useEffect(() => {
      dispatch(getAllBrandCars());
    }, [dispatch]);


        return(
            <div className="bg-neutral-50 h-full m-auto p-8">

                <div className="min-h-min p-6 bg-gray-100 justify-center ">
                {/* Título principal del Dashboard */}
                <h1 className="bg-blue-600 text-white text-4xl font-bold py-4 px-6 rounded-lg shadow-lg text-center mb-10">
                    Admin Dashboard
                </h1>

                {/* Sección del título "Car of Duty" */}
                <div className="flex ">
                    <div className="text-center mb-8 m-auto">
                        <Image src={Logo} width="150" heigth="150" alt="logo-duty" className="m-auto"/>
                        <h1 className="text-4xl text-red-500 font-extrabold mb-2">Car of Duty</h1>
                        <p className="text-lg text-gray-600 font-semibold">Servicio de autos</p>
                    </div>
                    <Loading status={status}/>
                </div>

                {/* Botón con estilo personalizado */}
                <a 
                    href="#datos"
                    className="inline-block text-xl font-medium text-blue-600 border border-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out mb-8"
                    >
                    Ver todos los datos
                </a>
                {status === 'succeeded' && <p className="m-auto">La aplicacion todavia esta en construccion. Algunas funciones o accesos no estan disponibles</p>}

                {/* Componente Loading */}
                </div>

                <div id='datos'>
                    {/* <BrandHome brand={brands}/> */}
                    <Sections title='autos'  date={brands} />
                    <Sections title='marcas' date={brands}/>
                    <Sections title='servicios' date={{}}/>
                    <Sections title='turnos' date={{}}/>
                    <Sections title='productos' date={{}}/>
               </div>

                
            </div>
        )
    
   
}
export default AdminDashboard;