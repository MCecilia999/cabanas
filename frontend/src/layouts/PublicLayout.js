import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Componente auxiliar para los enlaces de navegación (sin export)
const NavLink = ({ to, children, current }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        current === to
          ? "bg-primary-dark text-white"
          : "text-gray-800 hover:bg-primary hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

export default function PublicLayout({ children }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                Cabañas
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <NavLink to="/home" current={location.pathname}>
                Inicio
              </NavLink>
              <NavLink to="/cabins" current={location.pathname}>
                Cabañas
              </NavLink>
              <NavLink to="/login" current={location.pathname}>
                Iniciar Sesión
              </NavLink>
              <NavLink to="/register" current={location.pathname}>
                Registrarse
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <p>Email: info@cabanas.com</p>
              <p>Teléfono: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-gray-300">Sobre Nosotros</Link></li>
                <li><Link to="/privacy" className="hover:text-gray-300">Política de Privacidad</Link></li>
                <li><Link to="/terms" className="hover:text-gray-300">Términos y Condiciones</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Instagram</a>
                <a href="#" className="hover:text-gray-300">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 Cabañas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
