import Image from "next/image";
import LogoBlanco from "./DutyShiftBlanco.png";

const Footer = () => {
  return (
    <footer className="bg-heading py-10 text-body">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="p-2">
            <Image src={LogoBlanco} alt="Logo Car of Duty" width={96} height={96} />
          </div>

          <div className="w-full md:w-1/3">
            <h2 className="mb-4 text-lg font-bold text-body">Enlaces útiles</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/products" className="hover:underline">
                  Tienda
                </a>
              </li>
              <li>
                <a href="/manage" className="hover:underline">
                  Reservar turno
                </a>
              </li>
              <li>
                <a href="mailto:damiansola99@gmail.com" className="hover:underline">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/3">
            <h2 className="mb-4 text-lg font-bold text-body">Contacto</h2>
            <p>
              Email:{" "}
              <a href="mailto:damiansola99@gmail.com" className="hover:underline">
                damiansola99@gmail.com
              </a>
            </p>
            <p>Dirección: Ciudad de Salta, Argentina</p>
          </div>
        </div>

        <div className="mt-8 border-t border-divider/50 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Car of Duty. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
