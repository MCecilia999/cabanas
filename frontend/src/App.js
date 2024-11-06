// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta por defecto redirige al sitio público */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Rutas públicas */}
          <Route path="/*" element={<PublicRoutes />} />
          
          {/* Rutas del panel admin (protegidas) */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;