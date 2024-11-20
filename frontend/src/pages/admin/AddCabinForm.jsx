import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CabinService from '../../services/api/CabinService';

const BasicInfoStep = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">Datos básicos de tu cabaña</h2>
    <p className="text-center text-gray-600">Cuéntanos sobre tu espacio</p>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la cabaña*
        </label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Cabaña El Pinar"
          className="w-full p-2 border rounded"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción*
        </label>
        <textarea
          name="descripcion"
          placeholder="Describe tu cabaña y lo que la hace especial..."
          className="w-full p-2 border rounded h-32"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ubicación
        </label>
        <div className="grid grid-cols-2 gap-4">
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
            name="ubicacion.nombre"
            placeholder="Dirección"
            className="w-full p-2 border rounded"
            value={formData.ubicacion.nombre}
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Capacidad de huéspedes
        </label>
        <div className="flex justify-between items-center max-w-[200px]">
          <button 
            className="w-8 h-8 rounded-full border hover:bg-gray-100"
            onClick={() => handleChange({
              target: { name: 'capacidad', value: Math.max(1, formData.capacidad - 1) }
            })}
          >-</button>
          <span>{formData.capacidad} personas</span>
          <button 
            className="w-8 h-8 rounded-full border hover:bg-gray-100"
            onClick={() => handleChange({
              target: { name: 'capacidad', value: formData.capacidad + 1 }
            })}
          >+</button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Precio por noche
        </label>
        <div className="relative max-w-[200px]">
          <span className="absolute left-3 top-2">$</span>
          <input
            type="number"
            name="costo_por_noche"
            className="w-full p-2 pl-6 border rounded"
            placeholder="0.00"
            value={formData.costo_por_noche}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  </div>
);

const ImageUploadStep = ({ images, handleImageUpload, handleRemoveImage }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">Fotos de tu cabaña</h2>
    <p className="text-center text-gray-600">Añade fotos que muestren lo mejor de tu espacio</p>
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square">
          <img
            src={URL.createObjectURL(image)}
            alt={`Cabaña ${index + 1}`}
            className="w-full h-full object-cover rounded"
          />
          <button
            onClick={() => handleRemoveImage(index)}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:bg-red-100"
          >
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      
      <label className="border-2 border-dashed border-gray-300 rounded aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="mt-2 text-sm text-gray-500">Agregar foto</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          multiple
        />
      </label>
    </div>
  </div>
);

const ServiciosStep = ({ servicios, selectedServicios, handleServiciosChange }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-center">Servicios disponibles</h2>
    <p className="text-center text-gray-600">Selecciona las amenidades que ofrece tu cabaña</p>
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {servicios.map((servicio) => (
        <label
          key={servicio.id}
          className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-500 ${
            selectedServicios.includes(servicio.id) ? 'bg-blue-50 border-blue-500' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 rounded"
              value={servicio.id}
              checked={selectedServicios.includes(servicio.id)}
              onChange={handleServiciosChange}
            />
            <span className="text-sm font-medium">{servicio.nombre}</span>
          </div>
        </label>
      ))}
    </div>
  </div>
);

const AddCabinForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [servicios, setServicios] = useState([]);
  const [selectedServicios, setSelectedServicios] = useState([]);
  const [images, setImages] = useState([]);
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
      const servicios = serviciosData.results 
        ? serviciosData.results 
        : (Array.isArray(serviciosData) ? serviciosData : []);
      setServicios(servicios);
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError('Error cargando datos iniciales');
      setServicios([]);
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

  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files);
    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleServiciosChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedServicios([...selectedServicios, value]);
    } else {
      setSelectedServicios(selectedServicios.filter(id => id !== value));
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.nombre || !formData.descripcion || !formData.ubicacion.nombre) {
          setError('Por favor completa todos los campos obligatorios');
          return false;
        }
        break;
      case 2:
        if (images.length === 0) {
          setError('Por favor agrega al menos una imagen');
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      setError('');
      
      const ubicacionData = {
        nombre: formData.ubicacion.nombre,
        estado: formData.ubicacion.estado,
        ciudad: formData.ubicacion.ciudad,
        codigo_postal: formData.ubicacion.codigo_postal,
        ...(formData.ubicacion.latitud && { latitud: formData.ubicacion.latitud }),
        ...(formData.ubicacion.longitud && { longitud: formData.ubicacion.longitud })
      };
      
      const ubicacionCreada = await CabinService.createUbicacion(ubicacionData);
      
      if (!ubicacionCreada?.id) {
        throw new Error('Error al crear la ubicación');
      }
      
      // TODO: Implementar la lógica para subir las imágenes
      // const imageUrls = await Promise.all(images.map(image => uploadImage(image)));
      
      const cabinData = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        capacidad: parseInt(formData.capacidad),
        costo_por_noche: parseFloat(formData.costo_por_noche),
        ubicacion: ubicacionCreada.id,
        servicios: selectedServicios,
        es_destacada: formData.es_destacada,
        // imagenes: imageUrls
      };
      
      await CabinService.createCabin(cabinData);
      navigate('/admin/cabins');
    } catch (err) {
      console.error('Error en la creación:', err);
      setError(err.message || 'Error al crear la cabaña. Por favor intente nuevamente.');
      
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const steps = [
    <BasicInfoStep formData={formData} handleChange={handleChange} />,
    <ImageUploadStep 
      images={images}
      handleImageUpload={handleImageUpload}
      handleRemoveImage={handleRemoveImage}
    />,
    <ServiciosStep
      servicios={servicios}
      selectedServicios={selectedServicios}
      handleServiciosChange={handleServiciosChange}
    />
  ];

  const nextStep = () => {
    // Realizamos validaciones específicas para cada paso
    const validateCurrentStep = () => {
      switch (step) {
        case 1: // Paso de información básica
          if (!formData.nombre || !formData.descripcion || !formData.ubicacion.ciudad) {
            setError('Por favor complete todos los campos obligatorios');
            return false;
          }
          break;
        case 2: // Paso de imágenes
          if (images.length === 0) {
            setError('Debe agregar al menos una imagen');
            return false;
          }
          break;
        case 3: // Paso de servicios
          if (selectedServicios.length === 0) {
            setError('Seleccione al menos un servicio');
            return false;
          }
          break;
        default:
          break;
      }
      return true;
    };
  
    // Limpiar errores antes de validar
    setError('');
  
    // Validar el paso actual
    if (!validateCurrentStep()) {
      return;
    }
  
    // Si es el último paso, enviar el formulario
    if (step === steps.length) {
      handleSubmit();
      return;
    }
  
    // Avanzar al siguiente paso
    setStep(prevStep => prevStep + 1);
  };
  
  const prevStep = () => {
    // Prevenir retroceder del primer paso
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
      // Limpiar cualquier error al retroceder
      setError('');
    }
  };
  
  const handleExit = () => {
    // Lógica para guardar borrador o salir
    const confirmExit = window.confirm('¿Estás seguro de que quieres salir? Se perderán los cambios no guardados.');
    if (confirmExit) {
      // Puedes implementar lógica de guardado de borrador aquí
      navigate('/admin/cabins'); // O a donde quieras redirigir
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Contenido del componente */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <img src="/api/placeholder/100/50" alt="Logo" className="h-8" />
        <div className="space-x-4">
          <button 
            className="text-gray-600 hover:text-gray-800"
            onClick={() => window.open('/help', '_blank')}
          >
            ¿Necesitas ayuda?
          </button>
          <button 
            className="text-gray-600 hover:text-gray-800"
            onClick={handleExit}
          >
            Guardar y salir
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded flex items-center">
            <svg 
              className="w-6 h-6 mr-3 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
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
          className={`px-4 py-2 rounded transition-colors ${
            step === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={step === 1}
        >
          Anterior
        </button>
        <div className="flex space-x-2">
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {step === steps.length ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
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

export default AddCabinForm; // Asegúrate de exportar por defecto
