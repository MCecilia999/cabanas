// src/layouts/DashboardLayout.js
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Bienvenido al Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Estadísticas de ejemplo */}
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-medium text-green-800">Total Reservas</h3>
              <p className="text-2xl font-bold text-green-900">0</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">Cabañas Disponibles</h3>
              <p className="text-2xl font-bold text-blue-900">0</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800">Usuarios Registrados</h3>
              <p className="text-2xl font-bold text-purple-900">0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
