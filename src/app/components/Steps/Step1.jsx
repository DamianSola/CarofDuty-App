'use client'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCars, filterByBrand} from './../../../redux/Slices/carsSlice';
import {setDatesCar, setProducts} from "./../../../redux/Slices/datesSlices";
import {getAllProducts} from "./../../../redux/Slices/serviceSlice"
import Button from "../ui/Button";
import Select from "../ui/Select";
import Label from "../ui/Label";
import Card from "../ui/Card";
import Alert from "../ui/Alert";

const Step1 = ({brand, sprint}) => {
    const dispatch = useDispatch()
    const [car, setCar] = useState(null)
    const [error, setError] = useState({})
    const {cars} = useSelector(state => state.car)
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
        <Card className="mx-auto flex w-full flex-col p-5 sm:p-7">
  <p className="mb-2 text-lg font-semibold text-accent">Paso 1</p>
  <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Selecciona tu auto</h2>

  <section className="mb-4 w-full">
    <Label htmlFor="options">Marca de auto</Label>
    <Select
      id="options"
      name="brand"
      onChange={(e) => handleChange(e)}
    >
      <option value='select'>--- Todos ---</option>
      {brand.brands && brand.brands.map((marca, index) => (
        <option value={marca._id} key={index}>{marca.name}</option>
      ))}
    </Select>
  </section>

  <section className="mb-4 w-full">
    <Label htmlFor="car-options" required>Modelo</Label>
    <Select
      id="car-options"
      name="car"
      onChange={(e) => handleCarChange(e)}
    >
      <option value={null}>--- seleccionar ---</option>
      {cars && cars.map((car, index) => (
        <option value={car._id} key={index}>{car.name}</option>
      ))}
    </Select>

    {error.message && <Alert variant="danger" role="alert" className="mt-2">{error.message}</Alert>}
  </section>

  <Button type="submit" className="w-full" onClick={handleClick}>
    Siguiente
  </Button>
</Card>
    )
}

export default Step1;
