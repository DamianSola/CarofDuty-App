'use client'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCars, filterByBrand} from './../../../redux/Slices/carsSlice'

const ShowCars = ({brand, close}) => {

    const dispatch = useDispatch()
    const {cars} = useSelector(state => state.car)

    // console.log(cars)
    const handleChange = (e) => {
        let {value} = e.target
        value && dispatch(filterByBrand(value))
    
    }

    useEffect(()=>{
        dispatch(getAllCars())
        // filterByBrand()
    },[dispatch])


    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 py-20">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg h-full overflow-y-auto">
                <span onClick={close}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </span>
                <ul className='table-list  '>
                    <li className='flex flex-col table-header items-center'>
                       
                        <aside className='flex p-2 text-blue-900'>
                            <select
                                className='select-admin'
                                id="options" name="brand"  onChange={(e) => handleChange(e)}>
                                <option value="all">Todos</option>
                                {   brand.brands && brand.brands.map((b,index) => {
                                        return <option value={b._id} key={index}>{b.name}
                                </option>
                                })}
                            </select>
                            <p className='px-2'>filtrar por marca</p>
                        </aside>
                        <div className='flex flex-row text-left'>
                            <span className='w-1/2 mx-4'>nombre</span>
                            <span className='w-1/2 mx-4'>motor</span>
                        </div>
                    </li>
                    {cars.length !== 0 ? cars.map(car => {
                        return <li key={car._id} className='table-row'>
                            <span className='col'>{car.name}</span> 
                            <span className='col'>{car.model}</span>
                            <span className='col'>{car.motor}</span>
                        {/* <button className='text-red-500 bg-grey px-2 mx-2 '>eliminar</button>
                        <button  className='text-blue-500 bg-grey px-2 mx-2 '>actualizar</button> */}
                        </li>
                 }): <li className='table-row'><span className='col'>No hay autos de esta marca</span></li>
                }
                </ul>
            </div>
        </div>
    )
}




export default ShowCars;