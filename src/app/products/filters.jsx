

import { useState } from "react";

const Filters = ({products}) => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');

    const filteredProducts = products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesVehicle = selectedVehicle
          ? product.compatibleVehicles.includes(selectedVehicle)
          : true;
    
        return matchesName && matchesCategory && matchesVehicle;
      });

    return (
        <aside className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Filtrar Productos</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Categoría</h3>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Limpieza">Limpieza</option>
          </select>
        </div>

        {/* Filtro por tipo de vehículo */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tipo de Vehículo</h3>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Toyota">Toyota</option>
            <option value="Ford">Ford</option>
            <option value="Honda">Honda</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
            <option value="Chevrolet">Chevrolet</option>
          </select>
        </div>
      </aside>

    )
}

export default Filters;