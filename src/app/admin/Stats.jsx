const Stats = () => {
    return (
      <section id="estadisticas" className="mt-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Estadísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Turnos del Día</h3>
            <p className="text-2xl font-bold text-gray-700">10</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Turnos de la Semana</h3>
            <p className="text-2xl font-bold text-gray-700">50</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Ingresos por Turnos</h3>
            <p className="text-2xl font-bold text-gray-700">$5000</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Stats;
  