"use client";

import { Label, Select, Button } from "../components/ui";

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  selectedVehicle,
  setSelectedVehicle,
  selectedMotor,
  setSelectedMotor,
  serviceTypes,
  brands,
  onClear,
  hasActiveFilters,
}) => {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-heading">Filtrar productos</h2>

      <div>
        <Label htmlFor="filter-category">Categoría</Label>
        <Select
          id="filter-category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas</option>
          {serviceTypes &&
            serviceTypes.map((s, i) => (
              <option key={i} value={s._id}>
                {s.name}
              </option>
            ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="filter-vehicle">Marca de vehículo</Label>
        <Select
          id="filter-vehicle"
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
        >
          <option value="">Todas</option>
          {brands.brands &&
            brands.brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="filter-motor">Variante de motor</Label>
        <Select
          id="filter-motor"
          value={selectedMotor}
          onChange={(e) => setSelectedMotor(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="nafta">Nafta</option>
          <option value="diesel">Diesel</option>
        </Select>
      </div>

      {hasActiveFilters ? (
        <Button variant="ghost" className="w-full" onClick={onClear}>
          Limpiar filtros
        </Button>
      ) : null}
    </div>
  );
};

export default Filters;
