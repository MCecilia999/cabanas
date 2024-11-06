// src/pages/auth/LoginPage.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

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
      // Llamada a la API de autenticación
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password
      });

      // Guardar email si rememberMe está activo
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      }

      // Actualizar el contexto de autenticación
      await login(response);

      // Redireccionar al dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative" 
      style={{
        backgroundImage: "url('/assets/images/background.jpg')"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="w-full max-w-md bg-[rgba(34,34,34,0.85)] text-white shadow-lg rounded-2xl p-8 transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-xl relative z-10">
        <h1 className="text-3xl text-center mb-8">Iniciar Sesión</h1>
        
        {error && (
          <div classNam
          e="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex justify-between text-xs">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-1 accent-[#617321]"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              Recuérdame
            </label>
            <Link 
              to="/forgot-password" 
              className="text-[#DDE2C6] hover:text-[#8B4513] hover:underline transition-colors duration-300"
            >
              ¿Olvidó su contraseña?
            </Link>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-4/5 h-10 bg-[#617321] rounded-full text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#37410f] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>

        <div className="text-sm mt-4 text-center">
          ¿No tiene una cuenta?{' '}
          <Link 
            to="/register" 
            className="text-[#DDE2C6] hover:text-[#8B4513] hover:underline transition-colors duration-300 font-medium"
          >
            Registrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;