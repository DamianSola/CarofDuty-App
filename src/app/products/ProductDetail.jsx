"use client";

import { Modal, Badge, Button } from "../components/ui";
import { formatProductPrice, productStock } from "./productUtils";

export default function ProductDetail({ product, brands, onClose }) {
  if (!product) return null;

  const price = formatProductPrice(product.price);
  const stock = productStock(product);
  const motors = Array.isArray(product.motor) ? product.motor : [];
  const brandIds = Array.isArray(product.brandCar) ? product.brandCar : [];
  const brandList = brands?.brands || [];
  const compatible = brandList.filter((b) => brandIds.includes(b._id));

  return (
    <Modal isOpen onClose={onClose} title={product.name} className="max-w-lg">
      {product.image ? (
        <img
          src={product.image}
          alt=""
          className="mb-4 max-h-56 w-full rounded-sm object-contain bg-body"
        />
      ) : null}

      <div className="mb-4 flex flex-wrap gap-2">
        {product.Service_type?.name ? (
          <Badge variant="accent">{product.Service_type.name}</Badge>
        ) : null}
        {stock === 0 ? (
          <Badge variant="danger">Sin stock</Badge>
        ) : stock != null ? (
          <Badge variant="success">{stock} disponibles</Badge>
        ) : null}
      </div>

      {product.description ? <p className="mb-4 text-ink">{product.description}</p> : null}

      <p className="mb-4 text-2xl font-bold text-primary">{price || "Consultar precio"}</p>

      {motors.length > 0 ? (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-heading">Variantes de motor</h3>
          <div className="flex flex-wrap gap-2">
            {motors.map((m) => (
              <Badge key={m}>{m}</Badge>
            ))}
          </div>
        </div>
      ) : null}

      {compatible.length > 0 ? (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-heading">Compatible con</h3>
          <ul className="flex flex-wrap gap-2">
            {compatible.map((b) => (
              <li key={b._id} className="flex items-center gap-2 rounded-full border border-border px-3 py-1">
                {b.image ? <img src={b.image} alt="" className="h-6 w-6 object-contain" /> : null}
                <span className="text-sm">{b.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : brandIds.length > 0 ? (
        <p className="mb-6 text-sm text-muted">Compatible con marcas seleccionadas en catálogo.</p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={onClose}>
          Cerrar
        </Button>
        <Button onClick={() => { window.location.href = "/manage"; }}>
          Reservar turno
        </Button>
      </div>
    </Modal>
  );
}
