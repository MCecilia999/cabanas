// src/routes/PublicRoutes.js
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Cabins from '../pages/public/Cabins';
import CabinDetail from '../pages/public/CabinDetail';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import PublicLayout from '../layouts/PublicLayout';


export default function PublicRoutes() {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Cabins" element={<Cabins />} />
        <Route path="/cabins/:id" element={<CabinDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </PublicLayout>
  );
}