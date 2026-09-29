'use client'

import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setDatesServices} from "./../../../redux/Slices/datesSlices";
import {getAllServiceTypes, getAllProducts} from './../../../redux/Slices/serviceSlice';
import Modal from "./modalChoise"
import Button from "../ui/Button";
import Select from "../ui/Select";
import Card from "../ui/Card";
import Alert from "../ui/Alert";
import EmptyState from "../ui/EmptyState";

const Step2 = ({sprint}) => {
    const dispatch = useDispatch()
    const [services, setServices] = useState([])
    const [oneService, setOneService] = useState({})
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState([])
    const [feedback, setFeedback] = useState(null)

    const {serviceTypes} = useSelector(state => state.service)
    const {car,products} = useSelector(state => state.data)

    const onClose = () => {
      setOpen(false)
    }

    const catchProduct = (data) => {
      let productChosen = products.find(p => p._id == data)

      if(car.type == 'camioneta'){
        let priceService =(parseFloat(productChosen.price.$numberDecimal) * 1.20).toFixed(2);
        setServices([...services, {...oneService, product: productChosen, price:priceService}])
      }else{
        let priceAuto = (parseFloat(productChosen.price.$numberDecimal)).toFixed(2)
        setServices([...services, {...oneService, product: productChosen, price: priceAuto}])
      }

      setOneService({})
    }

    const addService = (e) => {
        let {value} = e.target
        let exist = services.find(e => e.service === value)

        if(exist) setFeedback({variant: 'warning', message: 'El servicio ya está en la lista'})

        if(!car){
          setFeedback({variant: 'danger', message: 'Por favor, ingresá un vehículo'})
        }

        if(!exist && car){
          const typeServiceProduct = products.filter(p => p.Service_type._id == value)
          setProduct(typeServiceProduct)

          if(typeServiceProduct.length === 0){
            setFeedback({variant: 'warning', message: 'Lo sentimos, no tenemos productos para este servicio'})
          }else{
            setFeedback(null)
            setOpen(true)
          }
            let serviceType = serviceTypes.find(e => e._id === value)

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
        setFeedback({variant: 'danger', message: 'No hay servicios para agregar'})
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
        <Card className="mx-auto mb-6 flex w-full flex-col p-5 sm:p-7">
            <Modal onClose={onClose} isOpen={open} catchProduct={catchProduct} product={product}/>
            <p className="mb-2 text-lg font-semibold text-accent">Paso 2</p>
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Elegir servicios</h2>

            {feedback ? (
              <Alert variant={feedback.variant} role="alert" className="mb-4">
                {feedback.message}
              </Alert>
            ) : null}

            <section className="mb-4 w-full">
                <Select
                    id="options"
                    name="serviceType"
                    onChange={(e) => addService(e)}>
                    <option value={null}>--- seleccionar ---</option>
                        {serviceTypes && serviceTypes.map((e) => (
                    <option key={e._id} value={e._id}>{e.name}</option>
                    ))}
                </Select>
            </section>

            <section className='mb-4 text-left text-sm font-semibold text-muted'>
            <p>Servicios: <strong className="text-ink">{services.length}</strong></p>
            <p>Duración total: <strong className="text-ink"> {services.reduce((acc, service) => acc + service.duration, 0)} minutos</strong></p>
            <p>Precio total: <strong className="text-ink"> ${services.reduce((acc, service) => acc + parseFloat(service.price), 0)}</strong></p>
            </section>

            <section className="mb-4 w-full">
              <div className="rounded-sm border border-border bg-body p-3 sm:p-4">
                {services.length === 0 ? (
                  <EmptyState title="Sin servicios" description="Elegí un servicio para agregarlo a tu reserva." />
                ) : (
                  services.map((item, index) => (
                    <div key={index} className="flex items-start justify-between border-b border-border py-4 last:border-b-0">
                        <div className="flex flex-col space-y-2 text-left">
                          <p className="text-lg font-semibold text-heading">{item.name}</p>
                          <div className="flex flex-col space-y-1">
                            <p className="text-muted">Producto:</p>
                            <p className="text-sm font-semibold text-ink">{item.product.name}</p>
                            <p className="font-semibold text-ink">
                              ${parseFloat(item.product.price.$numberDecimal).toFixed(2)}
                            </p>
                          </div>
                          <p className="text-muted">Duración: {item.duration}</p>
                          {car.type === 'camioneta' && (
                            <p className="text-sm font-medium text-warning">
                              El precio del servicio de una camioneta cuesta un 20% más
                            </p>
                          )}
                          <p className="font-medium text-muted">
                            Precio total: <span className="font-bold text-ink">${item.price}</span>
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setServices(services.filter((_, i) => i !== index))}
                        >
                          Quitar
                        </Button>
                      </div>
                  ))
                )}
              </div>
            </section>

            <Button className="w-full" type="submit" onClick={handleSubmit}>
              Siguiente
            </Button>
          </Card>
    )
}

export default Step2;
