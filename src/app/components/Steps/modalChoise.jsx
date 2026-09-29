"use client"
import { useState } from 'react';
import ModalShell from "../ui/Modal";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Label from "../ui/Label";
import Alert from "../ui/Alert";

const Modal = ({ isOpen, onClose, catchProduct, product}) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [error, setError] = useState(null);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    setError(null);
  };

  const handleAccept = () => {
    if(selectedProduct == {}) {
      setError('Por favor elegí un producto')
    } else {
        catchProduct(selectedProduct)
        onClose();
      }
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Elegir producto">
        {error ? <Alert variant="danger" role="alert" className="mb-3">{error}</Alert> : null}
        <div className="mb-4">
          <Label htmlFor="product-choice">Producto</Label>
          <Select
            id="product-choice"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <option value="">--- Seleccionar ---</option>
            {product && product.map((p,index) => {
                return <option key={index} name={p.name} value={p._id}>{p.name}</option>
            })}
          </Select>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAccept}>
            Aceptar
          </Button>
        </div>
    </ModalShell>
  );
};

export default Modal;
