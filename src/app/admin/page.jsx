"use client";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandCars } from "../../redux/Slices/brandSlice";
import { getAllCars } from "../../redux/Slices/carsSlice";
import { getAllProducts, getAllServiceTypes } from "../../redux/Slices/serviceSlice";
import { getAllTurns } from "../../redux/Slices/turnSlice";
import AdminShell from "./AdminShell";
import Stats from "./Stats";
import Settings from "./Settings";
import UpcomingTurns from "./UpcomingTurns";
import Sections from "../components/Dashboard/Sections";
import Loading from "./loading";
import { asList, startOfDay, startOfWeekMonday, isSameDay } from "./helpers";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { brands, status } = useSelector((state) => state.brand);
  const { cars } = useSelector((state) => state.car);
  const { products, serviceTypes } = useSelector((state) => state.service);
  const { turns, allTurns } = useSelector((state) => state.turn);

  useEffect(() => {
    dispatch(getAllBrandCars());
    dispatch(getAllCars());
    dispatch(getAllProducts());
    dispatch(getAllServiceTypes());
    dispatch(getAllTurns());
  }, [dispatch]);

  const brandList = asList(brands);
  const carList = asList(cars);
  const productList = asList(products);
  const serviceList = asList(serviceTypes);
  const turnList = asList(allTurns?.length ? allTurns : turns);

  const stats = useMemo(() => {
    const today = startOfDay();
    const weekStart = startOfWeekMonday();
    const dated = turnList.filter((t) => t?.date);
    const todayCount = dated.filter((t) => isSameDay(new Date(t.date), today)).length;
    const weekCount = dated.filter((t) => new Date(t.date) >= weekStart).length;
    return {
      today: todayCount,
      week: weekCount,
      totalTurns: turnList.length,
      cars: carList.length,
      products: productList.length,
      services: serviceList.length,
    };
  }, [turnList, carList, productList, serviceList]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
  const todayLabel = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <AdminShell>
      <header id="dashboard" className="mb-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Panel</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-heading sm:text-4xl">{greeting}</h1>
            <p className="mt-1 capitalize text-muted">{todayLabel}</p>
          </div>
          {status === "failed" ? <Loading status={status} /> : null}
        </div>
      </header>

      <Stats {...stats} />
      <UpcomingTurns turns={turnList} />

      <section className="mt-10" id="datos">
        <h2 className="mb-4 text-2xl font-bold text-primary">Catálogo y agenda</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Sections title="Autos" date={brands} count={carList.length} />
          <Sections title="Marcas" date={brands} count={brandList.length} />
          <Sections title="Servicios" date={{}} count={serviceList.length} />
          <Sections title="Productos" date={{}} count={productList.length} />
          <Sections title="Turnos" date={{}} count={turnList.length} />
        </div>
      </section>

      <Settings />
    </AdminShell>
  );
};

export default AdminDashboard;
