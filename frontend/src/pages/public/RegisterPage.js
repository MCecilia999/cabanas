// src/pages/auth/RegisterPage.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../api/auth';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Llamada a la API para registro
      await authAPI.register(formData);
      
      // Iniciar sesión automáticamente después del registro
      const loginResponse = await authAPI.login({
        email: formData.email,
        password: formData.password
      });

      // Redireccionar al dashboard después del registro exitoso
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Error al registrar. Por favor, intente nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center relative" 
         style={{backgroundImage: "url('/assets/images/background.jpg')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="w-full max-w-md bg-[rgba(34,34,34,0.85)] text-white shadow-lg rounded-2xl p-8 transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-xl relative z-10">
        <h1 className="text-3xl text-center mb-8">Registrarse</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              required
              className="w-full h-12 bg-transparent border-2 border-[#3b3b3b] rounded-full text-white text-base px-5 focus:outline-none focus:border-[#617321] transition-colors duration-300 disabled:opacity-50"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              required
              className="w-full h-12 bg-transparent border-2 border-[#3b3b3b] rounded-full text-white text-base px-5 focus:outline-none focus:border-[#617321] transition-colors duration-300 disabled:opacity-50"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              required
              className="w-full h-12 bg-transparent border-2 border-[#3b3b3b] rounded-full text-white text-base px-5 focus:outline-none focus:border-[#617321] transition-colors duration-300 disabled:opacity-50"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              className="w-full h-12 bg-transparent border-2 border-[#3b3b3b] rounded-full text-white text-base px-5 focus:outline-none focus:border-[#617321] transition-colors duration-300 disabled:opacity-50"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-4/5 h-10 bg-[#617321] rounded-full text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#37410f] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>

        <div className="text-sm mt-4 text-center">
          ¿Ya tiene una cuenta?{' '}
          <Link 
            to="/login" 
            className="text-[#DDE2C6] hover:text-[#8B4513] hover:underline transition-colors duration-300 font-medium"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;