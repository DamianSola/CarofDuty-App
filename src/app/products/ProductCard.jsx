"use client";

import { Badge, Button, Card } from "../components/ui";
import { formatProductPrice, productStock } from "./productUtils";

export default function ProductCard({ product, onOpen }) {
  const price = formatProductPrice(product.price);
  const stock = productStock(product);
  const outOfStock = stock === 0;
  const motors = Array.isArray(product.motor) ? product.motor : [];

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[4/3] bg-body">
        {product.image ? (
          <img
            src={product.image}
            alt=""
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl font-bold text-divider">
            {product.name?.[0]?.toUpperCase() || "P"}
          </div>
        )}
        {outOfStock ? (
          <Badge variant="danger" className="absolute right-3 top-3">
            Sin stock
          </Badge>
        ) : stock != null ? (
          <Badge variant="success" className="absolute right-3 top-3">
            {stock} en stock
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {product.Service_type?.name ? (
          <Badge variant="accent">{product.Service_type.name}</Badge>
        ) : null}
        <h3 className="text-lg font-bold text-heading">{product.name}</h3>
        {product.description ? (
          <p className="line-clamp-2 text-sm text-muted">{product.description}</p>
        ) : null}

        {motors.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {motors.map((m) => (
              <Badge key={m}>{m}</Badge>
            ))}
          </div>
        ) : null}

        <p className="mt-auto text-xl font-bold text-primary">{price || "Consultar"}</p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1" size="sm" onClick={() => onOpen(product)}>
            Ver detalle
          </Button>
          <Button
            className="flex-1"
            size="sm"
            variant="outline"
            onClick={() => {
              window.location.href = "/manage";
            }}
          >
            Reservar
          </Button>
        </div>
      </div>
    </Card>
  );
}
