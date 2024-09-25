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
        <div className='flex-col p-4 w-full bg-gray-100 border-2 rounded-lg border-gray-300 shadow-lg text-center'>
            <h1 className='text-2xl py-2 font-bold text-gray-800'>Datos Agregados</h1>
            {showButton && <AddTurnButton show={showButton} handleSubmitTrun={handleSubmitTrun}/>}

            <div className='max-h-lvh overflow-y-auto'>
           <ModalDates onClose={() => setOpen(false)} isOpen={open} status={status} response={response}/>
           
            {car ? (
            <section className="flex flex-col text-left mb-4 p-4 bg-gray-50 shadow-sm rounded-md w-full">
                <p className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4">VEHÍCULO</p>
                
                <div className="flex items-center space-x-4 mb-4">
                <p className="text-xl text-red-600 font-bold">{car.brand.name}</p>
                <p className="text-xl text-blue-600 font-bold">- {car.name}</p>
                <img 
                    src={car.brand.image} 
                    width="50" 
                    alt={`${car.brand.name} logo`} 
                    className="rounded-full border border-gray-200 p-1 shadow-sm"
                />
                </div>

                <div className="mb-2 flex items-center">
                <p className="text-sm font-semibold text-gray-700">Tipo:</p>
                <p className="text-lg text-center font-semibold text-blue-700 px-2">
                    {car.type}
                </p>
                </div>

                <div className="mb-2 flex items-center" >
                <p className="text-sm font-semibold text-gray-700">Motor:</p>
                <p className="text-lg text-center font-semibold text-blue-700 px-2">
                    {car.motor}
                </p>
                </div>
            </section>
            ) : (
            <p className="text-lg font-bold text-red-500">No hay auto agregado</p>
            )}

            <section className="text-base bg-gray-50 py-4 text-left rounded-md shadow-md p-4 mb-4">
                <p className="font-semibold text-lg text-gray-800 border-b border-gray-300 pb-2 mb-4">SERVICIOS</p>
                <div className=" ">
                    {services.length === 0 ? (
                    <p className="text-gray-500">Vacío</p>
                    ) : (
                    services.map((item, index) => (
                        <div
                        key={index}
                        className="flex justify-between items-start py-2 border-b border-gray-200 last:border-none"
                        >
                            <div className="flex flex-col space-y-3">
                                <p className="font-semibold text-lg text-gray-900">{item.name}</p>

                                <div className="flex flex-col">
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
                        </div>
                    ))
                    )}
                </div>
            </section>


    <section className="text-base py-4 text-left bg-gray-50 p-4 rounded-md shadow-md mb-4">
        <p className="font-semibold text-lg text-gray-800 border-b border-gray-300 pb-2 mb-4">DATOS DEL CLIENTE</p>
        {customer && (
            <div className="space-y-4">
            <div>
                <h3 className="text-sm font-semibold text-gray-700">Nombre y Apellido</h3>
                <p className="text-base text-gray-900">{customer.name}</p>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-700">e-mail</h3>
                <p className="text-base text-gray-900">{customer.email}</p>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-700">Teléfono</h3>
                <p className="text-base text-gray-900">{customer.phone}</p>
            </div>
            </div>
        )}
    </section>

    <section className="text-left bg-gray-50 p-4 rounded-md shadow-md">
        <p className="font-semibold text-lg text-gray-800 border-b border-gray-300 pb-2 mb-4">FECHA Y HORA</p>
        <div className='flex flex-wrap bg-gray-100 rounded-md font-semibold text-blue-700'>
            <p className="px-4 py-2 text-base ">
                {/* {new Date().toLocaleDateString()} */}
                {dataTime.day}
            </p>
            <p className="px-4 py-2 text-base ">
                {dataTime.time} horas
                {/* {new Date().toLocaleTimeString()} */}
            </p>
        </div>
        
    </section>
    </div>

    <AddTurnButton show={showButton} handleSubmitTrun={handleSubmitTrun}/>

    </div>)
}

export default CurrentDates;
