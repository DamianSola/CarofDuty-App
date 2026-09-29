import Image from "next/image";
import Logo from "./logoBlue.png";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";
import Alert from "../ui/Alert";

const BrandHome = ({ brand, status, error }) => {
  const list = brand?.brands;

  if (status === "failed") {
    return (
      <Alert variant="danger" role="alert">
        {error || "No pudimos cargar las marcas."}
      </Alert>
    );
  }

  if (!list) {
    return (
      <div className="flex min-h-64 w-full flex-col items-center p-4 text-center">
        <Image
          width={180}
          height={180}
          className="m-auto rounded-md"
          src={Logo}
          alt=""
        />
        <Spinner label="Cargando marcas..." />
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <EmptyState
        title="Sin marcas"
        description="Todavía no hay marcas para mostrar."
      />
    );
  }

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 p-2 sm:gap-4">
      {list.map((b) => (
        <div
          className="flex w-fit flex-col items-center rounded-sm border border-divider bg-body p-2 shadow-sm transition-transform duration-200 hover:scale-[1.03]"
          key={b._id || b.name}
        >
          <img
            src={b.image}
            width="90"
            height="90"
            alt={`Logo de ${b.name}`}
            className="m-auto rounded-sm object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default BrandHome;
