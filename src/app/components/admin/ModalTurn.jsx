"use client"
import { useState } from 'react';
import {useSelector} from 'react-redux'

const Modal = ({ isOpen, onClose, turn}) => {


    const {turnById, loading} = useSelector(state => state.turn)

    
    const {getSevices, getTurn} = turnById;
    const {date,customer,turnNumber, id} = getTurn;


  if (!isOpen) return null; // No mostrar nada si el modal está cerrado
  if(loading) return <div>cargando...</div>

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Datos del turno</h2>

    {/* Información del cliente */}
    <div className="mb-6 space-y-2">
      <p className="text-lg text-gray-700"><span className="font-bold">Nombre:</span> {customer.name}</p>
      <p className="text-lg text-gray-700"><span className="font-bold">Email:</span> {customer.email}</p>
      <p className="text-lg text-gray-700"><span className="font-bold">Teléfono:</span> {customer.phone}</p>
    </div>

    {/* Información del turno */}
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800">Número de Turno</h3>
      <p className="text-gray-700">{turnNumber}</p>
    </div>

    <div className="mb-6">
  <h3 className="text-lg font-medium text-gray-800">Fecha y Hora</h3>
  <p className="text-gray-700">{new Date(date).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</p>
</div>


    {/* Servicios */}
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800">Servicios</h3>
      {getSevices.length > 0 ? (
        getSevices.map((s, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
            <p className="text-gray-700">{s.name}</p>
            <p className="text-gray-700 font-semibold">${s.price.$numberDecimal}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">El turno no tiene servicios agregados</p>
      )}
    </div>

    {/* Botón para cerrar */}
    <div className="flex justify-end">
      <button
        onClick={() => onClose(false)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Cerrar
      </button>
    </div>
  </div>
</div>

  );
};

export default Modal;
