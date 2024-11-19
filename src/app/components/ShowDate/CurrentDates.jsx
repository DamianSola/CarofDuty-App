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
        <div className="flex flex-col p-4 bg-zinc-100 border-2 border-gray-300 rounded-lg shadow-xl text-center mx-auto w-full md:max-w-xl">
            <h1 className="text-xl py-4 font-extrabold text-gray-800">Datos Agregados</h1>
    
            {showButton && <AddTurnButton show={showButton} handleSubmitTrun={handleSubmitTrun} />}

            <div className="flex flex-wrap gap-6 my-2">
                <ModalDates onClose={() => setOpen(false)} isOpen={open} status={status} response={response} />

                {car ? (
                    <section className="flex flex-col md:flex-grow text-left space-y-2 p-4 bg-white shadow-lg border-gray-200 rounded-lg w-full">
                        <p className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-3">VEHÍCULO</p>

                        <div className="flex items-center space-x-4">
                            <img 
                            src={car.brand.image} 
                            width="70" 
                            alt={`${car.brand.name} logo`} 
                            className="rounded-full border border-gray-200 p-1 shadow-sm"/>
                            <p className="text-xl text-red-600 font-bold">{car.name.toUpperCase()}</p>
                        </div>

                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-blue-700">{car.type}</p>
                        </div>

                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-blue-700">{car.motor}</p>
                        </div>
                    </section>
                    ) : (
                    <p className="text-base font-semibold text-red-500">No hay auto agregado</p>
                )}

                
        <section className="bg-white p-6 rounded-lg shadow-lg w-full">
            <p className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-3">SERVICIOS</p>
            <div className="md:flex md:flex-wrap block gap-4">
                {services.length === 0 ? (
                    <p className="text-gray-500 w-full">Vacío</p>
                ) : (
                    services.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-start m-2 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 w-full"
                        >
                            <div className="flex flex-col w-full space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-lg text-blue-700">{item.name}</p>
                                    <p className="text-sm text-gray-600">Duración: {item.duration}</p>
                                </div>

                                <div className="flex flex-col">
                                    <p className="font-semibold text-gray-900">Producto:</p>
                                    <p className="text-sm text-gray-700">{item.product.name}</p>
                                    <p className="text-lg text-gray-900">${parseFloat(item.product.price.$numberDecimal).toFixed(2)}</p>
                                </div>

                                {car.type === 'camioneta' && (
                                    <p className="text-sm text-yellow-600 font-medium">El precio del servicio de una camioneta cuesta un 20% más</p>
                                )}

                                <p className="font-medium text-gray-700">
                                    Precio del servicio: <span className="font-bold text-gray-900">${item.price}</span>
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
        <section className="bg-white p-6 border-gray-200 rounded-lg shadow-lg w-full">
                    <p className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-3">DATOS DEL CLIENTE</p>
                    {customer && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm text-blue-700">Nombre y Apellido</h3>
                                <p className="text-lg font-semibold text-gray-900">{customer.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-blue-700">e-mail</h3>
                                <p className="text-lg font-semibold text-gray-900">{customer.email}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-blue-700">Teléfono</h3>
                                <p className="text-lg font-semibold text-gray-900">{customer.phone}</p>
                            </div>
                        </div>
                    )}
                </section>

                <section className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <p className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-3">FECHA Y HORA</p>
                    <div className="flex flex-col text-blue-700">
                        <p className="text-md">{dataTime.day}</p>
                        <p className="text-lg">{dataTime.time && `${dataTime.time} hs`}</p>
                    </div>
                </section>
    </div>

    <AddTurnButton show={showButton} handleSubmitTrun={handleSubmitTrun} />
</div>
)
}

export default CurrentDates;
