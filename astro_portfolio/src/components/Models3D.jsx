import React, { useState, useEffect } from 'react';

const models = [
  { id: 'setup', name: 'Setup Completo', src: '/assets/3d/setup.glb' },
  { id: 'monitor', name: 'Monitor', src: '/assets/3d/monitor.glb' },
  { id: 'teclado', name: 'Teclado', src: '/assets/3d/teclado.glb' },
  { id: 'mouse', name: 'Mouse', src: '/assets/3d/mouse.glb' },
  { id: 'laptop', name: 'Laptop / PC', src: '/assets/3d/laptop.glb' },
  { id: 'extra', name: 'Accesorio Extra', src: '/assets/3d/extra.glb' },
];

export default function Models3D() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="models" className="models-section">
      <h2 className="section-title">Mi Setup en 3D</h2>
      
      <div className="models-container">
        {/* Menú de selección */}
        <div className="models-menu">
          <h3>Explorar Componentes</h3>
          <p className="menu-desc">Selecciona una pieza para verla a detalle.</p>
          <ul className="models-list">
            {models.map((model) => (
              <li key={model.id}>
                <button 
                  className={`model-btn ${selectedModel.id === model.id ? 'active' : ''}`}
                  onClick={() => setSelectedModel(model)}
                >
                  {model.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Visor 3D */}
        <div className="model-viewer-wrapper">
          {isClient && (
            <model-viewer 
              src={selectedModel.src} 
              alt={`Modelo 3D de ${selectedModel.name}`} 
              auto-rotate 
              camera-controls 
              shadow-intensity="1"
              environment-image="neutral"
              exposure="1"
              style={{ width: '100%', height: '100%', minHeight: '400px' }}
            >
              <div slot="poster" className="poster">Cargando modelo... (Asegúrate de agregar {selectedModel.src})</div>
            </model-viewer>
          )}
          <div className="model-info">
            <p>Viendo: <strong>{selectedModel.name}</strong></p>
            <small>Usa el mouse o tu dedo para rotar y hacer zoom.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
