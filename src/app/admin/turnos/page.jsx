"use client";

import ShowTurns from "../../components/admin/Showturns";
import AdminShell from "../AdminShell";

const TurnsComponents = () => {
  return (
    <AdminShell>
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Agenda</p>
      <h1 className="mb-6 text-2xl font-bold text-heading sm:text-3xl">Turnos</h1>
      <ShowTurns />
    </AdminShell>
  );
};

export default TurnsComponents;
