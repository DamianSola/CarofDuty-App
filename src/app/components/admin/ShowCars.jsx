"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, filterByBrand } from "./../../../redux/Slices/carsSlice";
import { Modal, Select, Label, EmptyState } from "../ui";

const ShowCars = ({ brand, close }) => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.car);

  const handleChange = (e) => {
    let { value } = e.target;
    value && dispatch(filterByBrand(value));
  };

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <Modal isOpen onClose={close} title="Autos" className="max-w-2xl">
      <div className="mb-4">
        <Label htmlFor="filter-brand">Filtrar por marca</Label>
        <Select id="filter-brand" name="brand" onChange={(e) => handleChange(e)}>
          <option value="all">Todos</option>
          {brand.brands &&
            brand.brands.map((b, index) => (
              <option value={b._id} key={index}>
                {b.name}
              </option>
            ))}
        </Select>
      </div>

      <ul className="space-y-2">
        <li className="hidden border-b border-border pb-2 text-sm font-semibold text-muted sm:grid sm:grid-cols-3">
          <span>Nombre</span>
          <span>Modelo</span>
          <span>Motor</span>
        </li>
        {cars.length !== 0 ? (
          cars.map((car) => (
            <li
              key={car._id}
              className="grid gap-1 rounded-sm border border-border bg-body p-3 sm:grid-cols-3"
            >
              <span>
                <span className="mr-2 text-xs font-semibold text-muted sm:hidden">Nombre</span>
                {car.name}
              </span>
              <span>
                <span className="mr-2 text-xs font-semibold text-muted sm:hidden">Modelo</span>
                {car.model}
              </span>
              <span>
                <span className="mr-2 text-xs font-semibold text-muted sm:hidden">Motor</span>
                {car.motor}
              </span>
            </li>
          ))
        ) : (
          <EmptyState title="No hay autos de esta marca" />
        )}
      </ul>
    </Modal>
  );
};

export default ShowCars;
