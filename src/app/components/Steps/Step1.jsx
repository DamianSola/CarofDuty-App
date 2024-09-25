'use client'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCars, filterByBrand} from './../../../redux/Slices/carsSlice';
import {setDatesCar, setProducts} from "./../../../redux/Slices/datesSlices";
import {getAllProducts} from "./../../../redux/Slices/serviceSlice"

const Step1 = ({brand, sprint}) => {

    const dispatch = useDispatch()

    const [car, setCar] = useState(null)
    const [error, setError] = useState({})
    
    const {cars, allCars} = useSelector(state => state.car)
    const {products} = useSelector(state => state.service)
        
    const handleClick = () => {

        if(car){
          let carSelected = cars.find(e => e._id === car)
          dispatch(setDatesCar(carSelected))

          let brand = carSelected.brand._id
          let carProducts = products.filter(p => p.brandCar.includes(brand))
          dispatch(setProducts(carProducts))
          sprint(2)
        }else{
          setError({message:"selecciona un modelo de auto"})
        }
       
    }

    const handleCarChange = (e) => {
        let {value} = e.target
        setCar(value)
        setError({})
    }

    const handleChange = (e) => {
        let {value} = e.target
        if(value === 'select') dispatch(getAllCars())
        else dispatch(filterByBrand(value))
    
    }


    useEffect(()=>{
        dispatch(getAllCars())
        dispatch(getAllProducts())
    },[dispatch])


    return (
        <div className="flex flex-col p-6 border-2 rounded-md border-gray-300 w-full mx-auto bg-white shadow-lg">
  {/* Título del paso */}
  <p className="text-blue-600 font-semibold mb-2 text-lg">Paso 1</p>
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Selecciona tu auto</h2>

  {/* Selección de marca */}
  <section className="w-full mb-4">
    <label htmlFor="options" className="block text-left text-gray-700 font-medium mb-2">Marca de auto</label>
    <select
      className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      id="options"
      name="brand"
      onChange={(e) => handleChange(e)}
    >
      <option value='select'>--- Todos ---</option>
      {brand.brands && brand.brands.map((marca, index) => (
        <option value={marca._id} key={index}>{marca.name}</option>
      ))}
    </select>
  </section>

  {/* Selección de modelo */}
  <section className="w-full mb-4">
    <label htmlFor="car-options" className="flex text-left text-gray-700 font-medium mb-2">Modelo<p className="text-red-600">*</p></label>
    <select
      className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      id="car-options"
      name="car"
      onChange={(e) => handleCarChange(e)}
    >
      <option value={null}>--- seleccionar ---</option>
      {cars && cars.map((car, index) => (
        <option value={car._id} key={index}>{car.name}</option>
      ))}
    </select>

    {/* Mensaje de error */}
    {error.message && <p className="text-red-500 mt-2">{error.message}</p>}
  </section>

  {/* Botón de siguiente */}
  <button
    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
    type="submit"
    onClick={handleClick}
  >
    Siguiente
  </button>
</div>

    )
}

export default Step1;