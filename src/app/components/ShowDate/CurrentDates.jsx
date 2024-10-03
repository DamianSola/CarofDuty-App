import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {createNewTurn, postNewTurn} from './../../../redux/Slices/datesSlices';
import AddTurnButton from './AddTurnButton';
import {validateSubmit} from './ValidateSubmit';
import ModalDates from './modalDates';


const CurrentDates = () => {
    
    const dispatch = useDispatch()

    const data = useSelector(state => state.data)

    const {car,services,customer, date, status, response} = data
    
    const [dataTime, setDataTime] = useState({ time: '', day: '' });
    const [showButton, setShowButton] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSubmitTrun = () => {
       
        if(validateSubmit(data)){
            // dispatch(createNewTurn(data))
            setOpen(true)
            dispatch(postNewTurn(data))
        }
    }
    
    const convertDates = () => {
        if (date) {
            const newdate = new Date(date);
    
            // Convertir día
            const day = newdate.toLocaleDateString('es-ES', {
                weekday: 'long',  // Mostrar el día de la semana completo
                day: 'numeric',   // Mostrar el día como número
                month: 'long',    // Mostrar el mes completo
                year: 'numeric'   // Mostrar el año
            });
    
            // Convertir hora
            const time = newdate.toLocaleTimeString('es-ES', {
                hour: '2-digit',  // Hora en formato de 2 dígitos
                minute: '2-digit', // Minutos en formato de 2 dígitos
                hour12: false     // Mostrar en formato 24 horas
            });
    
            // Actualizar el estado una sola vez con ambos valores
            setDataTime((prevDataTime) => ({
                ...prevDataTime,
                day: day,
                time: time
            }));
        }
        
    }    

    useEffect(() => {
        convertDates();
        setShowButton(validateSubmit(data))
    },[date])

    return(
        <div className='flex-col p-4 md:w-fit bg-zinc-300 border-2 rounded-lg border-gray-300 shadow-lg text-center'>
            <h1 className='text-2xl py-2 font-bold text-gray-800'>Datos Agregados</h1>
            {showButton && <AddTurnButton show={showButton} handleSubmitTrun={handleSubmitTrun}/>}

            <div className='flex flex-wrap justify-around md:max-h-svh md:overflow-y-auto'>
           <ModalDates onClose={() => setOpen(false)} isOpen={open} status={status} response={response}/>
           
            {car ? (
            <section className="flex flex-col text-left space-y-2 mb-4 p-4 bg-white  shadow-md border-gray-200 rounded-md w-full md:w-fit">
                <p className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">VEHÍCULO</p>
                
                <div className="flex items-center space-x-4 ">
                    {/* <p className="text-lg text-red-600 font-bold">{car.brand.name}</p> */}
                    <img 
                        src={car.brand.image} 
                        width="70" 
                        alt={`${car.brand.name} logo`} 
                        className="rounded-full border border-gray-200 p-1 shadow-sm"
                    />
                    <p className="text-lg text-red-600 font-bold">{car.name.toUpperCase()}</p>
                </div>

                <div className="flex items-center">
                    {/* <p className="text-sm font-semibold text-gray-700">Tipo:</p> */}
                    <p className="text-lg text-center font-semibold text-blue-700 px-2">
                        {car.type}
                    </p>
                </div>

                <div className="flex items-center" >
                    {/* <p className="text-sm font-semibold text-gray-700">Motor:</p> */}
                    <p className="text-lg text-center font-semibold text-blue-700 px-2">
                        {car.motor}
                    </p>
                </div>
            </section>
            ) : (
            <p className="text-lg text-red-500">No hay auto agregado</p>
            )}

<section className="text-base py-4 text-left bg-gray-50 p-4 border-gray-200 rounded-md w-full md:w-fit bg-white shadow-md mb-4">
        <p className="font-semibold text-sm text-gray-800 border-b border-gray-300 pb-2 mb-2">DATOS DEL CLIENTE</p>
        {customer && (
            <div className="space-y-2">
            <div>
                <h3 className="text-sm  text-blue-700">Nombre y Apellido</h3>
                <p className="text-base font-semibold text-gray-900">{customer.name}</p>
            </div>
            <div>
                <h3 className="text-sm text-blue-700">e-mail</h3>
                <p className="text-base font-semibold font-semibold text-gray-900">{customer.email}</p>
            </div>
            <div>
                <h3 className="text-sm text-blue-700">Teléfono</h3>
                <p className="text-base font-semibold text-gray-900">{customer.phone}</p>
            </div>
            </div>
        )}
        </section>

        <section className="text-left bg-white p-4 rounded-md shadow w-full md:w-fit mb-4">
            <p className="font-semibold text-sm text-gray-800 border-b border-gray-300 pb-2 mb-2">FECHA Y HORA</p>
            <div className='flex-col rounded-md text-blue-700'>
                <p className="px-2 text-md ">
                    {dataTime.day}
                </p>
                <p className="px-2 text-base ">
                    {dataTime.time && dataTime.time + ' hs'} 
                </p>
            </div>
        
        </section>

            <section className="text-base bg-white py-4 text-left w-full rounded-md shadow-md p-4 mb-4">
                <p className="font-semibold text-sm text-gray-800 border-b border-gray-300 pb-2 mb-2">SERVICIOS</p>
                <div className="md:flex md:flex-wrap block">
                    {services.length === 0 ? (
                    <p className="text-gray-500 w-full">Vacío</p>
                    ) : (
                    services.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-start lg:max-w-80 m-2 p-2 border rounded my-2 bg-white border-gray-300 shadow"
                        >
                            <div className="flex flex-col w-full space-y-2 ">
                                <div className='flex items-center justify-between'>
                                    <p className="font-semibold text-lg text-blue-700">{item.name}</p>
                                    <p className="text-sm p-2 text-gray-600">Duración: {item.duration}</p>
                                </div>

                                <div className="flex flex-col">
                                    <p className="font-semibold text-gray-900">Producto:</p>
                                    <p className="text-xs text-gray-700 w-fit">{item.product.name}</p>
                                    <p className="text-sm text-gray-900">
                                        ${parseFloat(item.product.price.$numberDecimal).toFixed(2)}
                                    </p>
                                </div>


                                {car.type === 'camioneta' && (
                                <p className="text-sm text-yellow-600 font-medium">
                                    El precio del servicio de una camioneta cuesta un 20% más
                                </p>
                                )}

                                <p className="text-gray-700 font-medium">
                                    Precio del servicio: <span className="text-gray-900 font-bold">${item.price}</span>
                                </p>
                            </div>
                        </div>
                    ))
                    )}
                </div>
            </section>

    
    </div>

    <AddTurnButton show={showButton} handleSubmitTrun={handleSubmitTrun}/>

    </div>)
}

export default CurrentDates;
