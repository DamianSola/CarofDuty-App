"use client";
import { useState } from "react";
import { Car, Tags, Wrench, Package, CalendarDays } from "lucide-react";
import AddCar from "./../admin/AddCars";
import AddBrand from "./../admin/AddBrand";
import ShowCars from "./../admin/ShowCars";
import AddProduct from "./../admin/AddProduct";
import ShowProducts from "./../admin/ShowProducts";
import ShowService from "./../admin/ShowServices";
import ShowTurns from "../admin/Showturns";
import BrandHome from "../BrandHome/BrandHome";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Modal from "../ui/Modal";

const meta = {
  Autos: {
    icon: Car,
    description: "Modelos disponibles para reservar un servicio.",
    canAdd: true,
  },
  Marcas: {
    icon: Tags,
    description: "Marcas que se muestran en la web y en filtros.",
    canAdd: true,
  },
  Servicios: {
    icon: Wrench,
    description: "Tipos de servicio (aceite, filtros, etc.).",
    canAdd: false,
  },
  Productos: {
    icon: Package,
    description: "Repuestos y productos de la tienda.",
    canAdd: true,
  },
  Turnos: {
    icon: CalendarDays,
    description: "Reservas de clientes. Se crean desde el sitio público.",
    canAdd: false,
  },
};

const DashSection = ({ title, date, count = 0 }) => {
  const [add, setAdd] = useState(false);
  const [see, setSee] = useState(false);
  const info = meta[title] || { description: "", canAdd: false, icon: Package };
  const Icon = info.icon;

  const closeSee = () => setSee(false);
  const closeAdd = () => setAdd(false);

  return (
    <Card className="flex h-full flex-col font-semibold">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm font-normal text-muted">{info.description}</p>
        </div>
      </div>
      <p className="my-4 text-3xl font-bold text-heading">{count}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setSee(true);
            setAdd(false);
          }}
        >
          Ver
        </Button>
        {info.canAdd ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setAdd(true);
              setSee(false);
            }}
          >
            Agregar
          </Button>
        ) : null}
        {title === "Turnos" ? (
          <a href="/admin/turnos">
            <Button size="sm" variant="outline">
              Agenda
            </Button>
          </a>
        ) : null}
      </div>

      {title === "Autos" && add ? (
        <Modal isOpen onClose={closeAdd} title="Agregar auto" className="max-w-lg">
          <AddCar open={add} brand={date} />
        </Modal>
      ) : null}
      {title === "Marcas" && add ? (
        <Modal isOpen onClose={closeAdd} title="Agregar marca" className="max-w-lg">
          <AddBrand open={add} />
        </Modal>
      ) : null}
      {title === "Productos" && add ? (
        <Modal isOpen onClose={closeAdd} title="Agregar producto" className="max-w-4xl">
          <AddProduct apen={add} />
        </Modal>
      ) : null}

      {title === "Autos" && see ? <ShowCars brand={date} close={closeSee} /> : null}
      {title === "Marcas" && see ? (
        <Modal isOpen onClose={closeSee} title="Marcas" className="max-w-2xl">
          <BrandHome brand={date} />
        </Modal>
      ) : null}
      {title === "Servicios" && see ? <ShowService close={closeSee} /> : null}
      {title === "Productos" && see ? <ShowProducts close={closeSee} /> : null}
      {title === "Turnos" && see ? <ShowTurns close={closeSee} /> : null}
    </Card>
  );
};

export default DashSection;
