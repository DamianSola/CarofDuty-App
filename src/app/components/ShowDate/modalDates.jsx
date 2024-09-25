"use client"
import {useSelector, useDispatch} from 'react-redux';
import {setAllState} from '../../../redux/Slices/datesSlices'

const Modal = ({ isOpen, onClose, status, response}) => {

    const dispatch = useDispatch()

    const {error} = useSelector(state => state.turn)
    
    const newTurn = response ? response.newTurn : null
        
    if (!isOpen) return null;

    const handleAccept = () => {
        onClose(false)
        dispatch(setAllState())
    }


    if(status === 'loading'){
        return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <p className='m-auto text-bold text-2xl'>Cargando...</p>
            </div>
        </div>
    }


    if(status === 'failed' ){
        return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <p className='m-auto text-bold text-2xl'>Error</p>
                <p className='m-auto text-bold text-lg'>{error}</p>
                <div className="flex justify-end">
                    <button
                        onClick={handleAccept}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        aceptar
                    </button>
                </div>
            </div>
        </div>
    }

    if(status === 'succeeded' )return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">{response.message}</h2>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800">Número de Turno</h3>
                    <p className="text-gray-500 text-3xl font-bold">{newTurn.turnNumber}</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800">Fecha y Hora</h3>
                    <p className="text-blue-700">{new Date(newTurn.date).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</p>
                </div>


                <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800">Servicios</h3>
                {response.services.length > 0 ? (
                    response.services.map((s, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
                        <p className="text-gray-700">{s.name}</p>
                        <p className="text-gray-700 font-semibold">${s.price}</p>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">El turno no tiene servicios agregados</p>
                )}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => onClose(false)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        aceptar
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Modal;
