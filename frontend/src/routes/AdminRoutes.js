// src/routes/AdminRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/admin/Dashboard';
import ManageCabins from '../pages/admin/ManageCabins';
import Users from '../pages/admin/Users';

export default function AdminRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cabins" element={<ManageCabins />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </DashboardLayout>
  );
}