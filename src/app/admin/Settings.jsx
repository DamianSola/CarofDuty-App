import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";

const Settings = () => {
  return (
    <section id="ajustes" className="mt-10">
      <h2 className="mb-4 text-2xl font-bold text-primary">Ajustes</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-2 text-xl font-bold">Taller</h3>
          <p className="text-muted">Car of Duty · Ciudad de Salta, Argentina</p>
          <p className="mt-2 text-sm text-ink">
            Email:{" "}
            <a className="underline" href="mailto:damiansola99@gmail.com">
              damiansola99@gmail.com
            </a>
          </p>
          <p className="mt-1 text-sm text-muted">Horario de turnos: 08:00 a 16:00</p>
        </Card>

        <Card>
          <h3 className="mb-2 text-xl font-bold">Atajos</h3>
          <p className="mb-4 text-muted">Accesos a las pantallas que usás todos los días.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/admin/turnos">
              <Button>Ver turnos</Button>
            </a>
            <a href="/products">
              <Button variant="secondary">Abrir tienda</Button>
            </a>
            <a href="/manage">
              <Button variant="outline">Nueva reserva</Button>
            </a>
          </div>
        </Card>
      </div>
      <Alert className="mt-4">
        Este panel no tiene login: quien conozca la URL puede entrar. La gestión de cuentas de usuario
        todavía no está conectada a la API.
      </Alert>
    </section>
  );
};

export default Settings;
