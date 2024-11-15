import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <Outlet />
      </div>
    </>
  );
};

export default PublicLayout;