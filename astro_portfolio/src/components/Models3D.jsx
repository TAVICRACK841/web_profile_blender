import React, { useState, useEffect } from 'react';

// Ya no hay imports de archivos locales. Todo viene directo de la nube (CDN)

const models = [
  { 
    id: 'habitacion', 
    name: 'Setup Completo', 
    // BORRA ESTE TEXTO Y PEGA EL ENLACE QUE COPIASTE DE Habitacion.glb
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/Habitacion.glb' 
  },
  { 
    id: 'setup', 
    name: 'Escritorio', 
    // PEGA AQUÍ EL ENLACE DE Setup.glb
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/Setup.glb' 
  },
  { 
    id: 'monitor', 
    name: 'Monitor', 
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/Monitor.glb' 
  },
  { 
    id: 'teclado', 
    name: 'Teclado', 
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/Teclado.glb' 
  },
  { 
    id: 'mouse', 
    name: 'Mouse', 
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/Mouse.glb' 
  },
  { 
    id: 'mousepad', 
    name: 'Mousepad', 
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/damascus_mousepad.glb' 
  },
  { 
    id: 'laptop', 
    name: 'Laptop / PC', 
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/Laptop.glb' 
  },
  { 
    id: 'chair', 
    name: 'Silla Gamer', 
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/gaming_chair.glb' 
  },
  { 
    id: 'mic', 
    name: 'Micrófono', 
    src: 'https://github.com/TAVICRACK841/web_profile_blender/releases/download/v1.0.0/mic_gamer_uso_libre_comercial.glb' 
  },
];

export default function Models3D() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
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