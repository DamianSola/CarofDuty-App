"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { getAllProducts, getAllServiceTypes } from "../../redux/Slices/serviceSlice";
import { getAllBrandCars } from "../../redux/Slices/brandSlice";
import NavBar from "../components/NavBar";
import Filters from "./filters";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import { asProductList } from "./productUtils";
import { Input, EmptyState, Spinner, Alert, Button, Modal, Badge } from "../components/ui";

const Products = () => {
  const { products, serviceTypes, status, error } = useSelector((s) => s.service);
  const { brands } = useSelector((s) => s.brand);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedMotor, setSelectedMotor] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllServiceTypes());
    dispatch(getAllBrandCars());
  }, [dispatch]);

  const catalog = asProductList(products);
  const query = searchTerm.trim().toLowerCase();

  const filteredProducts = catalog.filter((product) => {
    const name = (product.name || "").toLowerCase();
    const description = (product.description || "").toLowerCase();
    const matchesName = !query || name.includes(query) || description.includes(query);
    const matchesCategory = selectedCategory
      ? product.Service_type?._id === selectedCategory
      : true;
    const matchesVehicle = selectedVehicle
      ? Array.isArray(product.brandCar) && product.brandCar.includes(selectedVehicle)
      : true;
    const matchesMotor = selectedMotor
      ? Array.isArray(product.motor) && product.motor.includes(selectedMotor)
      : true;

    return matchesName && matchesCategory && matchesVehicle && matchesMotor;
  });

  const hasActiveFilters = Boolean(
    searchTerm || selectedCategory || selectedVehicle || selectedMotor
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedVehicle("");
    setSelectedMotor("");
  };

  const filterProps = {
    selectedCategory,
    setSelectedCategory,
    selectedVehicle,
    setSelectedVehicle,
    selectedMotor,
    setSelectedMotor,
    serviceTypes,
    brands,
    onClear: clearFilters,
    hasActiveFilters,
  };

  const categoryName = serviceTypes?.find((s) => s._id === selectedCategory)?.name;
  const vehicleName = brands?.brands?.find((b) => b._id === selectedVehicle)?.name;

  return (
    <div className="min-h-screen bg-body">
      <NavBar />
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Tienda</p>
          <h1 className="mt-1 text-3xl font-bold text-heading sm:text-4xl">Productos y repuestos</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Aceites, filtros y más, filtrados por tipo de servicio, marca de auto y motor.
            Para instalarlos, reservá un turno.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside className="hidden w-full shrink-0 border-r border-border bg-surface p-5 lg:block lg:w-72">
          <Filters {...filterProps} />
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="search"
              placeholder="Buscar por nombre o descripción..."
              aria-label="Buscar productos"
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setFiltersOpen(true)}
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filtros
            </Button>
          </div>

          {hasActiveFilters ? (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {searchTerm ? <Badge>Busqueda: {searchTerm}</Badge> : null}
              {categoryName ? <Badge variant="accent">{categoryName}</Badge> : null}
              {vehicleName ? <Badge>{vehicleName}</Badge> : null}
              {selectedMotor ? <Badge>{selectedMotor}</Badge> : null}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Quitar filtros
              </Button>
            </div>
          ) : null}

          {status === "loading" || (status === "idle" && catalog.length === 0) ? (
            <Spinner label="Cargando productos..." />
          ) : null}

          {status === "failed" ? (
            <Alert variant="danger" role="alert">
              {error || "No pudimos cargar los productos."}
            </Alert>
          ) : null}

          {status === "succeeded" || catalog.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-muted">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "producto" : "productos"}
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      onOpen={setSelectedProduct}
                    />
                  ))
                ) : (
                  <EmptyState
                    className="sm:col-span-2 xl:col-span-3"
                    title="No se encontraron productos"
                    description="Probá con otro nombre o quitá algún filtro."
                  />
                )}
              </div>
            </>
          ) : null}
        </main>
      </div>

      <Modal isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filtros">
        <Filters {...filterProps} />
        <Button className="mt-6 w-full" onClick={() => setFiltersOpen(false)}>
          Ver resultados
        </Button>
      </Modal>

      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          brands={brands}
          onClose={() => setSelectedProduct(null)}
        />
      ) : null}
    </div>
  );
};

export default Products;
