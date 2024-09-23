'use client'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllServiceTypes, deleteServiceType} from './../../../redux/Slices/serviceSlice'


const ShowServices = () => {

    const dispatch = useDispatch()
    const {serviceTypes} = useSelector(s => s.service)


    const deleteButton = (id) => {
        const isConfirmed = window.confirm('¿Seguro que quieres eliminar?');
  
        if (isConfirmed) {
            dispatch(deleteServiceType(id))
            
        } else {
            console.log('Eliminación cancelada');
        }
        // dispatch(deleteServiceType)
    }

    useEffect(() => {
        dispatch(getAllServiceTypes())
    },[])

    return(
        <div>
            <ul className='py-8'>
                {/* {serviceTypes.data && serviceTypes.data.map((service, index) => {
                    return <li className='table-row' key={index} >
                        <div className='flex'>
                        <span className='table-cell'>{service.name}</span>
                        <span className='table-cell'>duracion: {service.duration}</span>
                        </div>
                        <span className='table-cell'>{service.description}</span>
                    </li>
                })
                } */}
                {serviceTypes && serviceTypes.map((service, index) => {
                    return (
                        <div className="flex flex-col md:flex-row bg-gray-100 p-4 mb-2 rounded-lg shadow-md" key={index}>
                            <div className="flex-1 font-bold text-lg text-blue-600 mb-2 md:mb-0">
                                {service.name}
                            </div>
                            <aside className="flex-1 text-gray-600 mb-2 md:mb-0">
                                Duración: {service.duration} minutos
                            </aside>
                            <aside className="flex-1 text-gray-500">
                                {service.description}
                            </aside>
                            <div className="flex-wrap">
                                {/* <button className='simple-button text-blue-500'>actualizar</button> */}
                                <button className='simple-button text-red-500 ' onClick={() => deleteButton(service._id)}>borrar</button>
                            </div>
                        </div>
                    );
                })}
            </ul>
        </div>
    )
}

export default ShowServices;