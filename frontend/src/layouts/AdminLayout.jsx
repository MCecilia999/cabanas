import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto py-8">
        <Outlet />
      </div>
      <footer>
        {/* Aquí puedes agregar componentes de pie de página específicos del administrador */}
      </footer>
    </div>
  );
};

export default AdminLayout;
