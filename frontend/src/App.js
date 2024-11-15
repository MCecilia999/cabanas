import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/auth/AuthContext';
import PrivateRoute from './services/auth/PrivateRoute';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import Cabins from './pages/public/Cabins';
import CabinDetail from './pages/public/CabinDetail';
import LoginPage from './pages/public/auth/LoginScreen';
import RegisterPage from './pages/public/auth/RegisterScreen';
import Dashboard from './pages/admin/Dashboard';
import ManageCabins from './pages/admin/ManageCabins';
import AddCabinForm from  './pages/admin/AddCabinForm';
import Users from './pages/admin/Users';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="cabins/:id" element={<CabinDetail />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="cabins" element={<ManageCabins />} />
            <Route path="cabins/add" element={<AddCabinForm />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;