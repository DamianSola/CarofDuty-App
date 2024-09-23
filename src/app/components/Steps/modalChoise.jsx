"use client"
import { useState } from 'react';
import {useSelector} from 'react-redux'

const Modal = ({ isOpen, onClose, catchProduct, product}) => {

  const [selectedProduct, setSelectedProduct] = useState({});

  // const {products} = useSelector(state => state.data)

  const handleProductChange = (e) => {
    
    setSelectedProduct(e.target.value);

  };

  const handleAccept = () => {
    // Lógica para manejar el producto seleccionado
   
    if(selectedProduct == {}) alert('porfavor debe elegir un producto')
      else{
        catchProduct(selectedProduct)
        onClose(); // Cierra el modal

      }
      

  };

  if (!isOpen) return null; // No mostrar nada si el modal está cerrado

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Elegir Producto</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Producto</label>
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">--- Seleccionar ---</option>
            {product && product.map((p,index) => {
                return <option key={index} name={p.name} value={p._id}>{p.name}</option>
            })}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAccept}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
