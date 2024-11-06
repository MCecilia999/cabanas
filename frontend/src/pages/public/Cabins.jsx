// src/pages/public/Cabins.jsx
import { Link } from 'react-router-dom';  // Añadido import de Link


export default function Cabins() {
  const cabins = [
    {
      id: 1,
      name: "Cabaña del Bosque",
      description: "Perfecta para escapadas románticas",
      price: "150",
      capacity: 2
    },
    {
      id: 2,
      name: "Cabaña Familiar",
      description: "Ideal para familias grandes",
      price: "300",
      capacity: 6
    },
    {
      id: 3,
      name: "Cabaña del Lago",
      description: "Vista espectacular al lago",
      price: "200",
      capacity: 4
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Nuestras Cabañas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </div>
  );
}

// Componente auxiliar para las tarjetas de cabañas
function CabinCard({ cabin }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={`/api/placeholder/400/300`}
        alt={cabin.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{cabin.name}</h3>
        <p className="text-gray-600 mb-4">{cabin.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">${cabin.price}/noche</p>
          <Link
            to={`/cabins/${cabin.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
