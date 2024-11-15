import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CabinService from '../../services/api/CabinService';

// Step components
const LocationStep = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">¿Dónde te encuentras?</h2>
    <p className="text-center text-gray-600">Solo compartiremos la dirección con los huéspedes después de que hayan hecho la reservación.</p>
    <div className="space-y-3">
      <input
        type="text"
        name="ubicacion.nombre"
        placeholder="Nombre de la ubicación"
        className="w-full p-2 border rounded"
        value={formData.ubicacion.nombre}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ubicacion.estado"
        placeholder="Estado"
        className="w-full p-2 border rounded"
        value={formData.ubicacion.estado}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ubicacion.ciudad"
        placeholder="Ciudad"
        className="w-full p-2 border rounded"
        value={formData.ubicacion.ciudad}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ubicacion.codigo_postal"
        placeholder="Código Postal"
        className="w-full p-2 border rounded"
        value={formData.ubicacion.codigo_postal}
        onChange={handleChange}
      />
    </div>
    <div className="h-64 bg-gray-200 rounded">
      {/* Map placeholder - You can integrate your map component here */}
    </div>
  </div>
);

const BasicInfoStep = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">Datos básicos de tu espacio</h2>
    <p className="text-center text-gray-600">Más adelante podrás agregar más apartados</p>
    <input
      type="text"
      name="nombre"
      placeholder="Nombre de la cabaña"
      className="w-full p-2 border rounded"
      value={formData.nombre}
      onChange={handleChange}
    />
    <textarea
      name="descripcion"
      placeholder="Descripción"
      className="w-full p-2 border rounded h-32"
      value={formData.descripcion}
      onChange={handleChange}
    />
    <div className="flex justify-between items-center">
      <span>Capacidad</span>
      <div className="flex items-center space-x-2">
        <button 
          className="w-8 h-8 rounded-full border"
          onClick={() => handleChange({
            target: { name: 'capacidad', value: Math.max(1, formData.capacidad - 1) }
          })}
        >-</button>
        <span>{formData.capacidad}</span>
        <button 
          className="w-8 h-8 rounded-full border"
          onClick={() => handleChange({
            target: { name: 'capacidad', value: formData.capacidad + 1 }
          })}
        >+</button>
      </div>
    </div>
  </div>
);

const ServiciosStep = ({ servicios, selectedServicios, handleServiciosChange }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">¿Qué servicios ofreces?</h2>
    <p className="text-center text-gray-600">Selecciona las amenidades disponibles en tu propiedad</p>
    <div className="grid grid-cols-2 gap-4">
      {servicios.map((servicio) => (
        <label
          key={servicio.id}
          className={`p-2 border rounded cursor-pointer ${
            selectedServicios.includes(servicio.id) ? 'bg-blue-100 border-blue-500' : ''
          }`}
        >
          <input
            type="checkbox"
            className="hidden"
            value={servicio.id}
            checked={selectedServicios.includes(servicio.id)}
            onChange={handleServiciosChange}
          />
          {servicio.nombre}
        </label>
      ))}
    </div>
  </div>
);

const PricingStep = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">Precio por noche</h2>
    <p className="text-center text-gray-600">Define el precio que los huéspedes tendrán que pagar.</p>
    <div className="relative">
      <span className="absolute left-3 top-2">$</span>
      <input
        type="number"
        name="costo_por_noche"
        className="w-full p-2 pl-6 border rounded"
        placeholder="Precio por noche"
        value={formData.costo_por_noche}
        onChange={handleChange}
      />
    </div>
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="es_destacada"
        checked={formData.es_destacada}
        onChange={handleChange}
        className="rounded"
      />
      <label>Marcar como cabaña destacada</label>
    </div>
  </div>
);

const AddCabinForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [servicios, setServicios] = useState([]);
  const [selectedServicios, setSelectedServicios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    capacidad: 1,
    costo_por_noche: 0,
    es_destacada: false,
    ubicacion: {
      nombre: '',
      estado: '',
      ciudad: '',
      codigo_postal: '',
      latitud: '',
      longitud: ''
    }
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const serviciosData = await CabinService.getServicios();
      if (Array.isArray(serviciosData)) {
        setServicios(serviciosData);
      } else {
        console.error('Error: serviciosData is not an array');
        setError('Error cargando datos iniciales');
      }
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError('Error cargando datos iniciales');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('ubicacion.')) {
      const ubicacionField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        ubicacion: {
          ...prev.ubicacion,
          [ubicacionField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleServiciosChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedServicios([...selectedServicios, value]);
    } else {
      setSelectedServicios(selectedServicios.filter(id => id !== value));
    }
  };

  const handleSubmit = async () => {
    try {
      const ubicacionCreada = await CabinService.createUbicacion(formData.ubicacion);
      await CabinService.createCabin({
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        capacidad: formData.capacidad,
        costo_por_noche: formData.costo_por_noche,
        es_destacada: formData.es_destacada,
        ubicacion: ubicacionCreada.id,
        servicios: selectedServicios
      });
      navigate('/admin/cabins');
    } catch (err) {
      console.error('Error creating cabin:', err);
      setError('Error al crear la cabaña. Por favor intente nuevamente.');
    }
  };

  const steps = [
    <LocationStep formData={formData} handleChange={handleChange} />,
    <BasicInfoStep formData={formData} handleChange={handleChange} />,
    <ServiciosStep
      servicios={servicios}
      selectedServicios={selectedServicios}
      handleServiciosChange={handleServiciosChange}
    />,
    <PricingStep formData={formData} handleChange={handleChange} />
  ];

  const nextStep = () => {
    if (step === steps.length) {
      handleSubmit();
    } else {
      setStep(Math.min(step + 1, steps.length));
    }
  };

  const prevStep = () => setStep(Math.max(step - 1, 1));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <img src="/api/placeholder/100/50" alt="Logo" className="h-8" />
        <div className="space-x-4">
          <button className="text-gray-600">¿Necesitas ayuda?</button>
          <button className="text-gray-600">Guardar y salir</button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
          {steps[step - 1]}
        </div>
      </main>

      <footer className="bg-white shadow p-4 flex justify-between items-center">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-200 rounded"
          disabled={step === 1}
        >
          Anterior
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={false}
        >
          {step === steps.length ? 'Finalizar' : 'Siguiente'}
        </button>
      </footer>

      <div className="bg-gray-200 h-1">
        <div
          className="bg-blue-500 h-1 transition-all duration-300 ease-in-out"
          style={{ width: `${(step / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AddCabinForm;