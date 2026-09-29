import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {postNewTurn} from './../../../redux/Slices/datesSlices';
import AddTurnButton from './AddTurnButton';
import {validateSubmit} from './ValidateSubmit';
import ModalDates from './modalDates';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';

const CurrentDates = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    const {car,services,customer, date, status, response} = data
    const [dataTime, setDataTime] = useState({ time: '', day: '' });
    const [showButton, setShowButton] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSubmitTrun = () => {
        if(validateSubmit(data)){
            setOpen(true)
            dispatch(postNewTurn(data))
        }
    }

    const convertDates = () => {
        if (date) {
            const newdate = new Date(date);
            const day = newdate.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            const time = newdate.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setDataTime((prevDataTime) => ({
                ...prevDataTime,
                day: day,
                time: time
            }));
        }
    }

    useEffect(() => {
        convertDates();
        setShowButton(validateSubmit(data))
    },[date])

    return(
        <Card className="mx-auto flex w-full flex-col p-4 text-center sm:p-6 lg:sticky lg:top-24 lg:max-w-xl">
            <h2 className="py-4 text-xl font-extrabold">Tu reserva</h2>

            {showButton && <AddTurnButton show={showButton} handleSubmitTrun={handleSubmitTrun} />}

            <div className="my-2 flex flex-wrap gap-6">
                <ModalDates onClose={() => setOpen(false)} isOpen={open} status={status} response={response} />

                {car ? (
                    <section className="flex w-full flex-col space-y-2 rounded-sm border border-border bg-surface p-4 text-left md:flex-grow">
                        <p className="border-b border-divider pb-3 text-lg font-bold">Vehículo</p>
                        <div className="flex flex-wrap items-center gap-2">
                            <img
                            src={car.brand.image}
                            width="70"
                            alt={`Logo de ${car.brand.name}`}
                            className="rounded-full border border-border p-1 shadow-sm"/>
                            <p className="text-xl font-bold text-accent">{car.name.toUpperCase()}</p>
                             <p className="text-lg font-semibold text-muted">{car.type}</p>
                              <p className="text-lg font-semibold text-muted">{car.motor}.</p>
                        </div>
                    </section>
                    ) : (
                    <EmptyState className="w-full" title="Todavía no hay un auto" description="Completá el paso 1 para verlo acá." />
                )}

        <section className="w-full rounded-sm border border-border bg-surface p-5">
            <p className="border-b border-divider pb-3 text-sm font-bold">Servicios</p>
            <div className="block gap-4 md:flex md:flex-wrap">
                {services.length === 0 ? (
                    <EmptyState className="mt-3 w-full" title="Sin servicios" description="Se van a listar cuando los elijas." />
                ) : (
                    services.map((item, index) => (
                        <div
                            key={index}
                            className="m-2 flex w-full items-start justify-between rounded-sm border border-border bg-body p-4 shadow-sm"
                        >
                            <div className="flex w-full flex-col space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-semibold text-heading">{item.name}</p>
                                    <p className="text-sm text-muted">Duración: {item.duration}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-heading">Producto:</p>
                                    <p className="text-sm text-muted">{item.product.name}</p>
                                    <p className="text-lg text-ink">${parseFloat(item.product.price.$numberDecimal).toFixed(2)}</p>
                                </div>
                                {car.type === 'camioneta' && (
                                    <p className="text-sm font-medium text-warning">El precio del servicio de una camioneta cuesta un 20% más</p>
                                )}
                                <p className="font-medium text-muted">
                                    Precio del servicio: <span className="font-bold text-ink">${item.price}</span>
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
        <section className="w-full rounded-sm border border-border bg-surface p-5">
                <p className="border-b border-divider pb-3 text-sm font-bold">Datos del cliente</p>
                    {customer ? (
                        <div className="space-y-4 text-left">
                            <div>
                                <h3 className="text-sm text-accent">Nombre y apellido</h3>
                                <p className="text-lg font-semibold text-ink">{customer.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-accent">Correo electrónico</h3>
                                <p className="text-lg font-semibold text-ink">{customer.email}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-accent">Teléfono</h3>
                                <p className="text-lg font-semibold text-ink">{customer.phone}</p>
                            </div>
                        </div>
                    ) : (
                      <EmptyState className="mt-3" title="Sin datos de contacto" description="Se van a mostrar en el paso 3." />
                    )}
                </section>

                <section className="w-full rounded-sm border border-border bg-surface p-5">
                    <p className="border-b border-divider pb-3 text-sm font-bold">Fecha y hora</p>
                    {dataTime.day ? (
                    <div className="flex flex-col text-heading">
                        <p className="text-md">{dataTime.day}</p>
                        <p className="text-lg">{dataTime.time && `${dataTime.time} hs`}</p>
                    </div>
                    ) : (
                      <EmptyState className="mt-3" title="Sin fecha" description="Elegila en el paso 4." />
                    )}
                </section>
    </div>

    <AddTurnButton show={showButton} handleSubmitTrun={handleSubmitTrun} />
</Card>
)
}

export default CurrentDates;
