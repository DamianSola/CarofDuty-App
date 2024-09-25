'use client'

import {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {setDatesServices} from "./../../../redux/Slices/datesSlices";
import {getAllServiceTypes, getAllProducts} from './../../../redux/Slices/serviceSlice';
import Modal from "./modalChoise"

const Step2 = ({sprint}) => {

    const dispatch = useDispatch()


    const [services, setServices] = useState([])
    const [oneService, setOneService] = useState({})
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState([])

    const {serviceTypes} = useSelector(state => state.service)
    const {car,products} = useSelector(state => state.data)

    const onClose = () => { //cierra el modal
      setOpen(false)
    }

    const catchProduct = (data) => { // esta funcion recibe el producto elegido por el usuario y lo agrega a la lista de servicios. 
      let productChosen = products.find(p => p._id == data)

      if(car.type == 'camioneta'){ // calcular el precio de una camioneta
        
        let priceService =(parseFloat(productChosen.price.$numberDecimal) * 1.20).toFixed(2);
        setServices([...services, {...oneService, product: productChosen, price:priceService}])

      }else{ //dar el precio del servicio de un auto

        let priceAuto = (parseFloat(productChosen.price.$numberDecimal)).toFixed(2)
        setServices([...services, {...oneService, product: productChosen, price: priceAuto}])

      }

      setOneService({})
    }


    const addService = (e) => { // en esta funcion se crea un servicio nuevo pero no
        let {name, value} = e.target

        let exist = services.find(e => e.service === value)

        if(exist) alert('El servicio ya esta en la lista')

        if(!car){
          alert('Por favor, ingrese un vehiculo')
        }


        if(!exist && car){

          const typeServiceProduct = products.filter(p => p.Service_type._id == value)
          // dispatch(setProducts(typeServiceProduct))
          setProduct(typeServiceProduct)
          
          if(typeServiceProduct.length === 0){
            alert("lo siento no tenemos productos para este servicio")
          }else{ 
            setOpen(true)
          }
            let serviceType = serviceTypes.find(e => e._id === value)// encontrar el tipo de servicio
            //calcular el precio del servcicio con el precio del producto y el tipo de auto

            let newService = {
                name: serviceType.name,
                price: null,
                service: serviceType._id,
                product: null,
                car: car._id,
                duration: serviceType.duration
            }
            setOneService(newService)
        }
    }

    const handleSubmit = () => {
      if(services.length === 0){
        alert('No hay servicios para agregar')
      }else{
        dispatch(setDatesServices(services))
        sprint(3)
      }
    }

    useEffect(() => {
        dispatch(getAllServiceTypes())
        dispatch(getAllProducts())
        
    },[dispatch])

    return (
        <div className="flex flex-col p-6 border-2 rounded-md border-gray-300 w-full  mx-auto my-8 bg-white shadow-lg">
            <Modal onClose={onClose} isOpen={open} catchProduct={catchProduct} product={product}/>
            <p className="text-blue-600 font-semibold mb-2 text-lg">Paso 2</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Elegir servicios</h2>

            <section className="w-full mb-4">
                <label htmlFor="options" className="block text-left text-gray-700 font-medium mb-2">Servicio</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="options"
                    name="serviceType"
                    onChange={(e) => addService(e)}>
                    <option value={null}>--- seleccionar ---</option>
                        {serviceTypes && serviceTypes.map((e) => (
                    <option key={e._id} value={e._id}>{e.name}</option>
                    ))}
                </select>
            </section>

            {/* Lista de servicios seleccionados */}
            <section className="w-full mb-4">
              <div className="bg-gray-50 p-4 rounded-md shadow-inner">
                {services.length === 0 ? (
                  <p className="text-gray-500">Vacío</p>
                ) : (
                  services.map((item, index) => (
                    <div key={index} className="flex justify-between items-start py-4 border-b border-gray-200">
                        <div className="flex flex-col text-left space-y-2">
                          <p className="font-semibold text-lg text-gray-900">{item.name}</p>

                          <div className="flex flex-col space-y-1">
                            <p className="text-gray-700">Producto:</p>
                            <p className="font-semibold text-gray-800">{item.product.name}</p>
                            <p className="font-semibold text-gray-800">
                              ${parseFloat(item.product.price.$numberDecimal).toFixed(2)}
                            </p>
                          </div>

                          <p className="text-gray-600">Duración: {item.duration}</p>

                          {car.type === 'camioneta' && (
                            <p className="text-sm text-yellow-600 font-medium">
                              El precio del servicio de una camioneta cuesta un 20% más
                            </p>
                          )}

                          <p className="text-gray-600 font-medium">
                            Precio total: <span className="text-gray-800 font-bold">${item.price}</span>
                          </p>
                        </div>

                        <button
                          className="text-red-600 hover:text-red-800 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md font-semibold"
                          onClick={() => setServices(services.filter((_, i) => i !== index))}
                        >
                          Quitar
                        </button>
                      </div>

                  ))
                )}
              </div>
            </section>

          

          <section className='text-sm text-gray-600 font-semibold text-right py-4'>
            <p>Servicios: <strong>{services.length}</strong></p>
            <p>Duracion total: <strong> {services.reduce((acc, service) => acc + service.duration, 0)} minutos</strong></p>
            <p>Precio total: <strong> ${services.reduce((acc, service) => acc + parseFloat(service.price), 0)}</strong></p>
          </section>
          

            {/* Botón de siguiente */}
            <button
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              type="submit"
              onClick={handleSubmit}
            >
              Siguiente
            </button>

          </div>

    )
}

export default Step2;