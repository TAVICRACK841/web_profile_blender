import React, { useState, useEffect } from 'react';

// Como los archivos están en la carpeta "public", se acceden directamente desde la raíz "/"
const models = [
  { 
    id: 'habitacion', 
    name: 'Setup Completo', 
    // Verifica si tu archivo empieza con mayúscula o minúscula y ajústalo aquí si es necesario
    src: './Habitacion-v1.glb' 
  },
  { 
    id: 'setup', 
    name: 'Escritorio', 
    src: './Setup.glb' 
  },
  { 
    id: 'monitor', 
    name: 'Monitor', 
    src: '/Monitor.glb' 
  },
  { 
    id: 'teclado', 
    name: 'Teclado', 
    src: '/Teclado.glb' 
  },
  { 
    id: 'mouse', 
    name: 'Mouse', 
    src: '/mouse.glb' 
  },
  { 
    id: 'mousepad', 
    name: 'Mousepad', 
    src: '/damascus_mousepad.glb' 
  },
  { 
    id: 'laptop', 
    name: 'Laptop / PC', 
    src: '/Laptop.glb' 
  },
  { 
    id: 'chair', 
    name: 'Silla Gamer', 
    src: '/gaming_chair.glb' 
  },
  { 
    id: 'mic', 
    name: 'Micrófono', 
    src: '/mic_gamer_uso_libre_comercial.glb' 
  },
];

export default function Models3D() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Precargar modelos en caché para cambiar rápido
    const preloadModels = () => {
      models.forEach((model) => {
        if (model.id !== models[0].id) {
          fetch(model.src).catch(err => console.log('Error precargando', err));
        }
      });
    };

    setTimeout(preloadModels, 2000);
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
              style={{ width: '100%', height: '100%', minHeight: '400px', display: 'block' }}
            >
              <div slot="poster" className="poster">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '2rem', animation: 'blink 1.5s infinite' }}>⏳</div>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Cargando modelo...</span>
                  <small style={{ color: '#8b949e', fontSize: '0.8rem', textAlign: 'center', maxWidth: '250px' }}>
                    Los modelos pesados pueden tardar unos segundos en aparecer.
                  </small>
                </div>
              </div>
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