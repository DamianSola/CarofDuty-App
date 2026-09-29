"use client"
import {useSelector, useDispatch} from 'react-redux';
import {setAllState} from '../../../redux/Slices/datesSlices'
import { Download } from 'lucide-react';
import ModalShell from '../ui/Modal';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Alert from '../ui/Alert';
import { downloadTurnReceipt } from '../../../lib/downloadTurn';

const Modal = ({ isOpen, onClose, status, response}) => {
    const dispatch = useDispatch()
    const {error} = useSelector(state => state.turn)
    const {car, services, customer} = useSelector((state) => state.data)
    const newTurn = response ? response.newTurn : null

    const handleDownload = () => {
      downloadTurnReceipt({
        turnNumber: newTurn?.turnNumber,
        date: newTurn?.date,
        customer,
        car,
        services: services?.length ? services : (response?.services || []),
        message: response?.message,
      })
    }

    const handleAccept = () => {
        onClose(false)
        dispatch(setAllState())
    }

    if(status === 'loading'){
        return (
          <ModalShell isOpen={isOpen} onClose={() => {}} title="Confirmando turno">
            <Spinner label="Cargando..." />
          </ModalShell>
        )
    }

    if(status === 'failed' ){
        return (
          <ModalShell isOpen={isOpen} onClose={handleAccept} title="Error">
                <Alert variant="danger" role="alert" className="mb-4">{error}</Alert>
                <div className="flex justify-end">
                    <Button onClick={handleAccept}>Aceptar</Button>
                </div>
          </ModalShell>
        )
    }

    if(status === 'succeeded' )return (
        <ModalShell isOpen={isOpen} onClose={() => onClose(false)} title={response.message}>
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-heading">Número de turno</h3>
                    <p className="text-3xl font-bold text-muted">{newTurn.turnNumber}</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-heading">Fecha y hora</h3>
                    <p className="text-accent">{new Date(newTurn.date).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</p>
                </div>
                {customer ? (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-heading">Cliente</h3>
                    <p className="font-semibold text-ink">{customer.name}</p>
                    <p className="text-sm text-muted">{customer.email}</p>
                    {customer.phone ? <p className="text-sm text-muted">{customer.phone}</p> : null}
                  </div>
                ) : null}
                {car ? (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-heading">Vehículo</h3>
                    <p className="font-semibold text-ink">{car.name}</p>
                    <p className="text-sm text-muted">
                      {[car.brand?.name, car.type, car.motor].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                ) : null}
                <div className="mb-6">
                <h3 className="text-lg font-medium text-heading">Servicios</h3>
                {response.services.length > 0 ? (
                    response.services.map((s, index) => (
                    <div key={index} className="mb-2 flex items-center justify-between rounded-sm bg-body p-2">
                        <p className="text-ink">{s.name}</p>
                        <p className="font-semibold text-ink">${s.price}</p>
                    </div>
                    ))
                ) : (
                    <p className="italic text-muted">El turno no tiene servicios agregados</p>
                )}
                </div>
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button variant="outline" onClick={handleDownload}>
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Descargar comprobante
                    </Button>
                    <Button onClick={() => onClose(false)}>Aceptar</Button>
                </div>
        </ModalShell>
    );

    return isOpen ? (
      <ModalShell isOpen={isOpen} onClose={() => onClose(false)} title="Turno">
        <Spinner />
      </ModalShell>
    ) : null;
};

export default Modal;
