'use client'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCars, filterByBrand} from './../../../redux/Slices/carsSlice'

const ShowCars = ({brand}) => {

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
        <div>
            
            <ul className='table-list'>
                <li className='table-header items-center'>
                    <span className='col'>nombre</span>
                    <span>modelo</span>
                    <span>motor</span>
                    <aside className='flex p-2 text-blue-900'>
                        <select
                            className='select-admin'
                            id="options" name="brand"  onChange={(e) => handleChange(e)}>
                            <option value="all">Todos</option>
                                {brand.brands && brand.brands.map((b,index) => {
                                        return <option value={b._id} key={index}>{b.name}
                            </option>
                            })}
                        </select>
                        <p className='px-2'>filtrar por marca</p>
                    </aside>
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
    )
}




export default ShowCars;