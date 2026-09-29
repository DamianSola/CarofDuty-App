import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTurns,
  fetchTurnById,
  getByNumber,
  getByCustomer,
} from "../../../redux/Slices/turnSlice";
import Pagination from "../ui/Pagination";
import ModalTurn from "./ModalTurn";
import { Input, Label, Button, Spinner, EmptyState, Card, Modal } from "../ui";

const ShowTurns = ({ close }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [day, setDay] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { turns, allTurns, turnById, status } = useSelector((state) => state.turn);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = turns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredCustomer = (e) => {
    let { value } = e.target;

    let byCustomer = allTurns.filter((data) =>
      data.customer.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(getByCustomer(byCustomer));
  };

  const filteredNumber = (e) => {
    let { value } = e.target;
    let byNumber = value ? allTurns.filter((data) => data.turnNumber == value) : allTurns;
    dispatch(getByNumber(byNumber));
  };

  const filteredDate = (e) => {
    let date = new Date().toISOString().slice(0, 10);
    let { value } = e.target;
    console.log(date);
  };

  const detailTurn = (data) => {
    dispatch(fetchTurnById(data));
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getAllTurns());
    let date = new Date().toISOString().slice(0, 10);
    setDay(date);
  }, [day]);

  const content =
    status === "loading" ? (
      <Spinner label="Cargando turnos..." />
    ) : (
      <div className="space-y-4">
        {!turnById ? null : <ModalTurn isOpen={open} onClose={setOpen} turn={turnById} />}

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={turns.length}
          paginate={paginate}
          currentPage={currentPage}
        />

        <Card className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="filter-number">Número</Label>
            <Input
              id="filter-number"
              type="text"
              placeholder="Buscar número..."
              onChange={filteredNumber}
            />
          </div>
          <div>
            <Label htmlFor="filter-customer">Cliente</Label>
            <Input
              id="filter-customer"
              type="text"
              placeholder="Buscar cliente..."
              onChange={filteredCustomer}
            />
          </div>
          <div>
            <Label htmlFor="filter-day">Fecha</Label>
            <Input id="filter-day" type="text" placeholder="Buscar día..." onChange={filteredDate} />
          </div>
          <p className="self-end text-sm font-semibold text-heading">Día: {day}</p>
        </Card>

        <ul className="space-y-2">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((turn, index) => (
              <li
                className="flex flex-col gap-3 rounded-sm border border-border bg-surface p-4 transition-colors hover:bg-body md:flex-row md:items-center"
                key={index}
              >
                <p className="max-w-40 flex-1 text-lg font-bold text-heading">{turn.turnNumber}</p>
                <p className="max-w-60 flex-1 text-muted">{turn.customer.name}</p>
                <p className="flex-1 text-sm text-muted">
                  {new Date(turn.date).toLocaleString("es-ES", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
                <Button variant="outline" size="sm" onClick={() => detailTurn(turn._id)}>
                  Ver detalles
                </Button>
              </li>
            ))
          ) : (
            <EmptyState title="Vacío" description="No hay turnos para mostrar." />
          )}
        </ul>
      </div>
    );

  if (close) {
    return (
      <Modal isOpen onClose={close} title="Turnos" className="max-w-4xl">
        {content}
      </Modal>
    );
  }

  return content;
};

export default ShowTurns;
