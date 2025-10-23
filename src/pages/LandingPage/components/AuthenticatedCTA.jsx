import React from 'react';
import { Link } from 'react-router-dom';
import './AuthenticatedCTA.css';

const AuthenticatedCTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-soft-rose/20 to-sage-green/20">
      <div className="max-w-4xl mx-auto text-center reveal">
        <h2 className="font-display text-4xl lg:text-5xl font-medium mb-6">¡Bienvenido de nuevo!</h2>
        <p className="text-xl text-warm-gray mb-8 max-w-2xl mx-auto">Estás a un solo paso de empezar a gestionar tu negocio de belleza de una forma más inteligente.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/super-admin" className="heartbeat bg-soft-rose text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-opacity-90 transition-all text-center">
            Crea tu NailsNow!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthenticatedCTA;
