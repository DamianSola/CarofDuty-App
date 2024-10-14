'use client'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react';
import { getAllProducts, getAllServiceTypes } from "../../redux/Slices/serviceSlice";
import { getAllBrandCars } from "../../redux/Slices/brandSlice";

const productsData = [
    {
      id: 1,
      name: 'Cambio de Aceite',
      category: 'Mantenimiento',
      compatibleVehicles: ['Toyota', 'Ford', 'Honda'],
    },
    {
      id: 2,
      name: 'Lavado Completo',
      category: 'Limpieza',
      compatibleVehicles: ['BMW', 'Mercedes', 'Audi'],
    },
    {
      id: 3,
      name: 'Alineación de Ruedas',
      category: 'Mantenimiento',
      compatibleVehicles: ['Toyota', 'Honda'],
    },
    {
      id: 4,
      name: 'Pulido de Carrocería',
      category: 'Limpieza',
      compatibleVehicles: ['Ford', 'Chevrolet'],
    },
    // Agrega más productos según sea necesario
  ];


const Products = () => { 


    const {products, serviceTypes} = useSelector(s => s.service)
    const {brands} = useSelector(s => s.brand)
    const dispatch = useDispatch()

    console.log(brands)
    console.log(products)


    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');


  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllServiceTypes())
    dispatch(getAllBrandCars())
  },[])

  // Filtros dinámicos basados en el nombre, categoría y vehículo
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.Service_type._id === selectedCategory : true;
    const matchesVehicle = selectedVehicle
      ? product.brandCar.includes(selectedVehicle)
      : true;

    return matchesName && matchesCategory && matchesVehicle;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral de filtros */}
      <aside className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Filtrar Productos</h2>
        
        {/* Filtro por categoría */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Categoría</h3>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {serviceTypes && serviceTypes.map((s, i) => {
                return <option key={i} value={s._id}>{s.name}</option>
            })}
           
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
           {brands.brands && brands.brands.map(b => {
            return <option key={b._id} value={b._id}>{b.name}</option>
           })}
          </select>
        </div>
      </aside>

      {/* Contenido principal con productos */}
      <main className="flex-1 p-6">
        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Listado de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700">Categoría: {product.Service_type.name}</p>
                {/* <p className="text-gray-700">
                  Compatible con: {product.compatibleVehicles.join(', ')}
                </p> */}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No se encontraron productos.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Products;