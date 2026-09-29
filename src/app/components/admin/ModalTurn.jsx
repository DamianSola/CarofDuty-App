"use client";
import { useSelector } from "react-redux";
import { Modal, Button, Spinner, EmptyState } from "../ui";

const ModalTurn = ({ isOpen, onClose, turn }) => {
  const { turnById, loading } = useSelector((state) => state.turn);

  if (!isOpen) return null;

  if (loading || !turnById?.getTurn) {
    return (
      <Modal isOpen onClose={() => onClose(false)} title="Datos del turno">
        <Spinner label="Cargando..." />
      </Modal>
    );
  }

  const { getSevices, getTurn } = turnById;
  const { date, customer, turnNumber } = getTurn;

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} title="Datos del turno">
      <div className="mb-6 space-y-2">
        <p className="text-ink">
          <span className="font-bold">Nombre:</span> {customer.name}
        </p>
        <p className="text-ink">
          <span className="font-bold">Email:</span> {customer.email}
        </p>
        <p className="text-ink">
          <span className="font-bold">Teléfono:</span> {customer.phone}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-heading">Número de turno</h3>
        <p className="text-ink">{turnNumber}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-heading">Fecha y hora</h3>
        <p className="text-ink">
          {new Date(date).toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" })}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-heading">Servicios</h3>
        {getSevices.length > 0 ? (
          getSevices.map((s, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-between rounded-sm bg-body p-2"
            >
              <p className="text-ink">{s.name}</p>
              <p className="font-semibold text-ink">${s.price.$numberDecimal}</p>
            </div>
          ))
        ) : (
          <EmptyState title="El turno no tiene servicios agregados" />
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onClose(false)}>Cerrar</Button>
      </div>
    </Modal>
  );
};

export default ModalTurn;
