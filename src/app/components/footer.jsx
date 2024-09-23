import Image from 'next/image';
import LogoBlanco from "./DutyShiftBlanco.png";



const Footer = () => {
    return (
      <footer className="bg-blue-800 text-white py-10">
        <div className="container mx-auto px-4">
          {/* Contenedor principal */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex text-white text-2xl font-bold p-6">
            <Image src={LogoBlanco} alt="logo-blanco" width="120" height="120"/>
          </div>
            {/* Sección de enlaces */}
            <div className="w-full md:w-1/3">
              <h2 className="text-lg font-bold mb-4">Enlaces útiles</h2>
              <ul className="space-y-2">
                <li><a href="/home" className="hover:underline">Inicio</a></li>
                <li><a href="/productos" className="hover:underline">Productos</a></li>
                <li><a href="/contacto" className="hover:underline">Contacto</a></li>
                <li><a href="/acerca" className="hover:underline">Acerca de nosotros</a></li>
              </ul>
            </div>
  
            {/* Sección de contacto */}
            <div className="w-full md:w-1/3">
              
              <h2 className="text-lg font-bold mb-4">Contacto</h2>
              <p>Teléfono: <a href="tel:+123456789" className="hover:underline">+123 456 789</a></p>
              <p>Email: <a href="mailto:info@empresa.com" className="hover:underline">info@dutyshift.com</a></p>
              <p>Dirección: Ciudad de Salta, Argentina</p>
            </div>
  
            {/* Sección de redes sociales */}
            {/* <div className="w-full md:w-1/3">
              <h2 className="text-lg font-bold mb-4">Síguenos</h2>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
                  <img src="/facebook-icon.svg" alt="Facebook" className="h-6" />
                </a>
                <a href="https://twitter.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
                  <img src="/twitter-icon.svg" alt="Twitter" className="h-6" />
                </a>
                <a href="https://instagram.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
                  <img src="/instagram-icon.svg" alt="Instagram" className="h-6" />
                </a>
                <a href="https://linkedin.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
                  <img src="/linkedin-icon.svg" alt="LinkedIn" className="h-6" />
                </a>
              </div>
            </div> */}
          </div>
  
          {/* Línea separadora */}
          <div className="border-t border-blue-400 mt-8 pt-4 text-center items-center">
          
            <p>&copy; {new Date().getFullYear()} Nombre de la Empresa. Todos los derechos reservados Duty Shift.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  