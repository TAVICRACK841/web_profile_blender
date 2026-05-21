import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    // Aquí le decimos a Vite que empaquete los modelos 3D
    assetsInclude: ['**/*.glb', '**/*.gltf']
  }
});