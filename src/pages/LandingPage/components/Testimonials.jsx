import React from 'react';

const Testimonials = ({ testimonialsSlider }) => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-sage-green/10 to-dusty-blue/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-6">Lo Que Dicen Nuestros <span className="text-soft-rose">Clientes</span></h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto">Más de 500 salones de belleza ya han transformado su operación con Nails Now.</p>
        </div>
        <div className="splide" id="testimonials-slider" ref={testimonialsSlider}>
          <div className="splide__track">
            <ul className="splide__list">
              <li className="splide__slide"><div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"><div className="flex items-center mb-6"><img src="https://via.placeholder.com/64" alt="María Rodríguez" className="w-16 h-16 rounded-full object-cover mr-4" /><div><div className="font-display text-xl font-medium">María Rodríguez</div><div className="text-warm-gray">Dueña de "Beauty Nails Studio"</div></div></div><p className="text-warm-gray italic text-lg leading-relaxed">"Nails Now ha transformado completamente mi salón. Antes pasaba horas administrando citas y lidiando con cancelaciones. Ahora todo es automático y he aumentado mis ingresos en un 45% en solo 6 meses."</p></div></li>
              <li className="splide__slide"><div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"><div className="flex items-center mb-6"><img src="https://via.placeholder.com/64" alt="Carla Mendoza" className="w-16 h-16 rounded-full object-cover mr-4" /><div><div className="font-display text-xl font-medium">Carla Mendoza</div><div className="text-warm-gray">Dueña de "Elegant Nails & Spa"</div></div></div><p className="text-warm-gray italic text-lg leading-relaxed">"El control de inventario me ha ahorrado tanto dinero. Antes compraba productos que no necesitaba y se me agotaban los más importantes. Ahora tengo exactamente lo que necesito cuando lo necesito."</p></div></li>
              <li className="splide__slide"><div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"><div className="flex items-center mb-6"><img src="https://via.placeholder.com/64" alt="Patricia López" className="w-16 h-16 rounded-full object-cover mr-4" /><div><div className="font-display text-xl font-medium">Patricia López</div><div className="text-warm-gray">Dueña de "Glamour Nail Bar"</div></div></div><p className="text-warm-gray italic text-lg leading-relaxed">"Mi sitio web personalizado con Nails Now ha traído tantos clientes nuevos. La gente puede ver mis trabajos y reservar directamente. Es como tener un empleado de tiempo completo trabajando las 24 horas."</p></div></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
