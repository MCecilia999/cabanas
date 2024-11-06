// src/pages/public/Home.jsx
import { Link } from 'react-router-dom';  // Añadido import de Link
import heroImage from '../../assets/imgs/banner.jpg';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-32 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 flex justify-center items-center">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl font-bold mb-4">
              Cabañas Mexiquillo
            </h1>
            <p className="text-xl mb-8">
              Descubre nuevas cabañas con nosotros, lo mejor te espera.
            </p>
            <Link
              to="/cabins"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
            >
              Descubre Más
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Ubicación Privilegiada"
              description="Nuestras cabañas están situadas en lugares estratégicos con vistas espectaculares."
            />
            <FeatureCard
              title="Máximo Confort"
              description="Todas nuestras instalaciones están equipadas con lo último en comodidades."
            />
            <FeatureCard
              title="Experiencia Única"
              description="Creamos momentos inolvidables para ti y tu familia en medio de la naturaleza."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Componente auxiliar para las tarjetas de características
function FeatureCard({ title, description }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
