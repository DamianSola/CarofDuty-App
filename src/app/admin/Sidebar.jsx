import Image from 'next/image';
import LogoBlanco from '../components/DutyShiftBlanco.png'; // Cambia la ruta según corresponda

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-r from-blue-900 to-sky-500 p-6 text-white space-y-6">
      <div className="flex items-center space-x-2">
        <Image src={LogoBlanco} alt="logo" width={50} height={50} />
        <p className="text-lg font-bold">Car of Duty</p>
      </div>

      <nav className="flex flex-col space-y-4">
        <a href="#dashboard" className="hover:bg-sky-600 py-2 px-4 rounded-md">Dashboard</a>
        <a href="#ajustes" className="hover:bg-sky-600 py-2 px-4 rounded-md">Ajustes</a>
        <a href="#estadisticas" className="hover:bg-sky-600 py-2 px-4 rounded-md">Estadísticas</a>
        <a href="#datos" className="hover:bg-sky-600 py-2 px-4 rounded-md">Datos</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
