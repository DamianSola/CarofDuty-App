"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceTypes, deleteServiceType } from "./../../../redux/Slices/serviceSlice";
import { Modal, Button, EmptyState } from "../ui";

const ShowServices = ({ close }) => {
  const dispatch = useDispatch();
  const { serviceTypes } = useSelector((s) => s.service);

  const deleteButton = (id) => {
    const isConfirmed = window.confirm("¿Seguro que quieres eliminar?");

    if (isConfirmed) {
      dispatch(deleteServiceType(id));
    } else {
      console.log("Eliminación cancelada");
    }
  };

  useEffect(() => {
    dispatch(getAllServiceTypes());
  }, []);

  const list = (
    <ul className="space-y-3 py-2">
      {serviceTypes && serviceTypes.length > 0 ? (
        serviceTypes.map((service, index) => (
          <li
            className="flex flex-col gap-2 rounded-sm border border-border bg-body p-4 md:flex-row md:items-start md:justify-between"
            key={index}
          >
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold text-heading">{service.name}</p>
              <p className="text-sm text-muted">Duración: {service.duration} minutos</p>
              <p className="text-sm text-muted">{service.description}</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => deleteButton(service._id)}>
              Borrar
            </Button>
          </li>
        ))
      ) : (
        <EmptyState title="No hay servicios" description="Todavía no hay tipos de servicio cargados." />
      )}
    </ul>
  );

  if (close) {
    return (
      <Modal isOpen onClose={close} title="Servicios" className="max-w-2xl">
        {list}
      </Modal>
    );
  }

  return <div>{list}</div>;
};

export default ShowServices;
