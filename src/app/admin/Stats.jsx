import { CalendarDays, CalendarRange, ClipboardList, Car, Package, Wrench } from "lucide-react";
import Card from "../components/ui/Card";

const StatCard = ({ icon: Icon, label, value, hint }) => (
  <Card className="flex items-start gap-4">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
    <div>
      <h3 className="text-sm font-medium text-muted">{label}</h3>
      <p className="text-2xl font-bold text-heading">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  </Card>
);

const Stats = ({ today = 0, week = 0, totalTurns = 0, cars = 0, products = 0, services = 0 }) => {
  return (
    <section id="estadisticas" className="mt-10">
      <h2 className="mb-4 text-2xl font-bold text-primary">Estadísticas</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={CalendarDays} label="Turnos de hoy" value={today} hint="Según la fecha de cada turno" />
        <StatCard icon={CalendarRange} label="Turnos de la semana" value={week} hint="Desde el lunes" />
        <StatCard icon={ClipboardList} label="Turnos totales" value={totalTurns} />
        <StatCard icon={Car} label="Autos en catálogo" value={cars} />
        <StatCard icon={Package} label="Productos en tienda" value={products} />
        <StatCard icon={Wrench} label="Tipos de servicio" value={services} />
      </div>
    </section>
  );
};

export default Stats;
