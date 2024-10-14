const Card = ({ title, showAddButton = true }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex space-x-4">
          <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Ver</button>
          {showAddButton && (
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Agregar</button>
          )}
        </div>
      </div>
    );
  };
  
  export default Card;
  