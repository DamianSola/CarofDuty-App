const Settings = () => {
    return (
      <section id="ajustes" className="mt-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Ajustes</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Gestión de Usuarios</h3>
          <p className="text-gray-700 mb-4">Administra las cuentas de usuario.</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Ver Cuentas</button>
          <button className="bg-green-600 text-white py-2 px-4 ml-4 rounded-md hover:bg-green-700">Agregar Usuario</button>
        </div>
      </section>
    );
  };
  
  export default Settings;
  