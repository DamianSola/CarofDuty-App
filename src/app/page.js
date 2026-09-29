"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandCars } from "../redux/Slices/brandSlice";
import BrandHome from "./components/BrandHome/BrandHome";
import NavBar from "./components/NavBar";
import { useRouter } from "next/navigation";
import Button from "./components/ui/Button";

export default function Home() {
  const dispatch = useDispatch();
  const { brands, status, error } = useSelector((state) => state.brand);
  const router = useRouter();

  const clickMange = () => {
    router.push("/manage");
  };

  useEffect(() => {
    dispatch(getAllBrandCars());
  }, [dispatch]);

  return (
    <main className="app-shell flex flex-col">
      <NavBar />
      <div className="flex w-full flex-col items-center">
        <div className="flex min-h-[calc(100vh-72px)] w-full flex-col gap-10 bg-heading px-5 py-16 sm:px-10 md:flex-row md:items-center md:justify-between md:px-14 lg:px-20">
          <div className="mb-6 flex w-full max-w-2xl flex-col space-y-6 text-center md:text-left">
            <div>
              <h1 className="font-display text-4xl font-bold text-body sm:text-5xl">
                Car of Duty
              </h1>
              <p className="mt-2 text-lg font-semibold text-divider">Servicio de autos</p>
            </div>

            <p className="max-w-xl text-base text-body/85 sm:text-lg">
              Bienvenido a Car of Duty, la plataforma que simplifica la gestión de servicios
              para tu auto. Acá podés detallar y cotizar servicios según tu vehículo y
              reservar turnos en línea.
            </p>

            <h2 className="text-2xl font-bold text-body sm:text-3xl">
              Gestioná tu servicio ahora
            </h2>

            <div className="flex w-full flex-col gap-3 self-start sm:flex-row">
            <Button
              className="w-full sm:w-fit"
              onClick={clickMange}
            >
              Empezar
            </Button>
            <Button
              variant="outline"
              className="w-full border-body text-body hover:bg-body hover:text-heading sm:w-fit"
              onClick={() => router.push("/products")}
            >
              Ver tienda
            </Button>
            </div>
          </div>

          <div className="flex w-full justify-center rounded-lg bg-body/10 p-4 sm:p-8 md:max-w-md">
            <BrandHome brand={brands} status={status} error={error} />
          </div>
        </div>
      </div>
    </main>
  );
}
