"use client";

import Link from "next/link";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { startOfDay } from "./helpers";

const UpcomingTurns = ({ turns = [] }) => {
  const from = startOfDay();
  const upcoming = [...turns]
    .filter((t) => t?.date && new Date(t.date) >= from)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  return (
    <section className="mt-10" id="proximos">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-primary">Próximos turnos</h2>
        <Link href="/admin/turnos">
          <Button variant="outline" size="sm">
            Ver agenda completa
          </Button>
        </Link>
      </div>
      <Card className="p-0 sm:p-0">
        {upcoming.length === 0 ? (
          <EmptyState
            className="m-4"
            title="No hay turnos próximos"
            description="Cuando se reserven, van a aparecer acá."
          />
        ) : (
          <ul className="divide-y divide-border">
            {upcoming.map((turn, index) => (
              <li key={turn._id || index} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-bold text-heading">#{turn.turnNumber}</p>
                <p className="text-muted">{turn.customer?.name || "Cliente"}</p>
                <p className="text-sm text-muted">
                  {new Date(turn.date).toLocaleString("es-ES", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default UpcomingTurns;
