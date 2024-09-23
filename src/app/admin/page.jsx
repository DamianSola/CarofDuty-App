'use client'
import React,{useEffect} from "react";
import BrandHome from "../components/BrandHome/BrandHome";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandCars } from "../../redux/Slices/brandSlice";
import Sections from '../components/Dashboard/Sections'

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const { brands, status, error } = useSelector((state) => state.brand);
  
  
    useEffect(() => {
      dispatch(getAllBrandCars());
    }, [dispatch]);


        return(
            <div className="bg-neutral-50 h-full m-auto p-8">
               <h1 className="bg-blue-600 text-white text-4xl font-bold py-4 px-6 rounded-lg shadow-md text-center w-full mb-8">
                    Admin Dashboard
                </h1>

                {
                    status === 'loading' || status === 'idle' ?
                    <BrandHome brand={brands}/> :
               <div>
                    <BrandHome brand={brands}/>
                    <Sections title='autos'  date={brands} />
                    <Sections title='marcas' date={brands}/>
                    <Sections title='servicios' date={{}}/>
                    <Sections title='turnos' date={{}}/>
                    <Sections title='productos' date={{}}/>
               </div>
            }
            </div>
        )
    
   
}
export default AdminDashboard;