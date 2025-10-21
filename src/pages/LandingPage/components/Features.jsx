import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-6">
            Productividad y Eficiencia + Comodidad y Personalización
            <span className="text-soft-rose"></span>
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto">
            Nails Now es un software que automatiza tareas operativas (citas, inventario, reportes) Alem de ofrecer la Comodidad y facilidad de uso (solución todo en uno, en la nube, lista para usar), todo personalizado ya que nos gusta ( a las mujeres) saber que nuestro salón de belleza tiene su propia identidad. También podrías decir que ofrecerías a los dueños, fuerte reducción de costos operativos, porque el salón no tendrá empleados que no sean los estilistas que trabajan directamente en la belleza del cliente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card p-8 rounded-2xl reveal">
            <div className="w-16 h-16 bg-soft-rose rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Agendamiento Inteligente</h3>
            <p className="text-warm-gray mb-6">Sistema automatizado de citas que permite a tus clientes reservar 24/7, reduce no-shows y optimiza la disponibilidad de tu equipo.</p>
            <ul className="text-sm text-warm-gray space-y-2">
              <li>• Reservas online 24/7</li>
              <li>• Recordatorios automáticos</li>
              <li>• Sincronización con calendarios</li>
              <li>• Gestión de múltiples estilistas</li>
            </ul>
          </div>

          <div className="feature-card p-8 rounded-2xl reveal">
            <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Control de Inventario</h3>
            <p className="text-warm-gray mb-6">Mantén un control preciso de tus productos y suministros con alertas automáticas para reabastecer antes de agotarse.</p>
            <ul className="text-sm text-warm-gray space-y-2">
              <li>• Seguimiento en tiempo real</li>
              <li>• Alertas de stock bajo</li>
              <li>• Historial de movimientos</li>
              <li>• Reportes de consumo</li>
            </ul>
          </div>

          <div className="feature-card p-8 rounded-2xl reveal">
            <div className="w-16 h-16 bg-dusty-blue rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Reportes Financieros</h3>
            <p className="text-warm-gray mb-6">Obtén insights valiosos sobre el rendimiento de tu negocio con reportes detallados de ingresos, gastos y rentabilidad.</p>
            <ul className="text-sm text-warm-gray space-y-2">
              <li>• Reportes diarios, semanales y mensuales</li>
              <li>• Análisis de rentabilidad por servicio</li>
              <li>• Control de gastos operativos</li>
              <li>• Proyecciones de crecimiento</li>
            </ul>
          </div>

          <div className="feature-card p-8 rounded-2xl reveal">
            <div className="w-16 h-16 bg-muted-gold rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Gestión de Clientes</h3>
            <p className="text-warm-gray mb-6">Crea perfiles detallados de tus clientes, registra sus preferencias y mejora su experiencia con un servicio personalizado.</p>
            <ul className="text-sm text-warm-gray space-y-2">
              <li>• Historial de servicios y preferencias</li>
              <li>• Notas personalizadas por cliente</li>
              <li>• Sistema de fidelización integrado</li>
              <li>• Comunicación automatizada</li>
            </ul>
          </div>

          <div className="feature-card p-8 rounded-2xl reveal">
            <div className="w-16 h-16 bg-soft-rose rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882H19.24a1 1 0 01.94 1.336l-2.5 7.5A1 1 0 0116.74 15H13V7.5L11 5.882zM11 5.882V15m0 0H6.26a1 1 0 01-.94-1.336l2.5-7.5A1 1 0 017.74 5H11z"></path>
              </svg>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Cupones y Promociones</h3>
            <p className="text-warm-gray mb-6">Atrae nuevos clientes y fideliza a los existentes con campañas de marketing integradas y cupones personalizados.</p>
            <ul className="text-sm text-warm-gray space-y-2">
              <li>• Creación de cupones personalizados</li>
              <li>• Campañas de email marketing</li>
              <li>• Programa de referidos</li>
              <li>• Análisis de efectividad</li>
            </ul>
          </div>

          <div className="feature-card p-8 rounded-2xl reveal">
            <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Presencia Digital</h3>
            <p className="text-warm-gray mb-6">Sitio web personalizado con chatbot integrado para resolver dudas y promocionar tus servicios las 24 horas del día.</p>
            <ul className="text-sm text-warm-gray space-y-2">
              <li>• Sitio web personalizado</li>
              <li>• Chatbot para atención automática</li>
              <li>• Integración con redes sociales</li>
              <li>• SEO optimizado para salones</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
