import React from 'react';

const projects = [
  {
    title: "Snacks Lizama",
    description: "Plataforma de comida rápida estilo McDonald's. Los clientes pueden pedir comida tanto para consumo en el local como para servicio a domicilio.",
    link: "https://snacks-lizama.netlify.app",
    status: "Activo"
  },
  {
    title: "Siena Joyería",
    description: "E-commerce de joyería estilo Shein o Mercado Libre. Cuenta con un carrito de compras interactivo y soporte para diferentes métodos de pago.",
    link: "https://sinea-joyeria.vercel.app",
    status: "En Mantenimiento"
  },
  {
    title: "Nova Soft",
    description: "Mi emprendimiento personal de desarrollo de software. Ofrece desde landing pages publicitarias hasta sistemas de gestión de inventarios y aplicaciones móviles. Nota: Actualmente en mantenimiento, la base de datos está en pausa temporalmente.",
    link: "https://nova-soft-web.vercel.app",
    status: "En Mantenimiento"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Mis Proyectos</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {/* Ventana de Navegador Mockup */}
            <div className="browser-mockup">
              <div className="browser-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <div className="browser-url">{project.link.replace('https://', '')}</div>
              </div>
              <div className="iframe-container">
                <iframe 
                  src={project.link} 
                  title={project.title}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                ></iframe>
              </div>
            </div>
            
            {/* Info del Proyecto */}
            <div className="project-info">
              <h3>
                {project.title} 
                {project.status === "En Mantenimiento" && (
                  <span className="status-badge maintenance">Mantenimiento</span>
                )}
              </h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                Visitar Sitio Oficial →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
