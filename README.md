# Benjamín González — Systems Portfolio

Portafolio web con Next.js App Router, TypeScript, Tailwind CSS 4 y Three.js. Inspirado en la referencia Dala: fondo negro puro, composición espaciosa, titulares Inter 400 de hasta 113px, cuerpo Inter 200 de 18px y una constelación procedural de triángulos. Violeta #8052ff para la acción principal; ámbar #ffb829 para énfasis; turquesa #15846e en la visualización y el logo.

## Ejecutar

Node.js 20.9 o superior.

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:3000. Validar con `npm run typecheck` y `npm run build`.

El build exporta a `out/`; se puede servir en cualquier hosting estático. No depende de Sites para ejecutarse. `.openai/hosting.json` conserva la asociación a la vista privada en Sites. Nunca contiene credenciales. Retirar `output: 'export'` de `next.config.ts` si más adelante se necesitan funciones de servidor.

## Contenido y estructura

- `src/lib/portfolio.ts`: los seis proyectos, stack y destinos personales verificados.
- `src/components/hero.tsx`: cabecera, portada, enlace principal y reloj de Santiago.
- `src/components/particle-constellation.tsx`: 2.500 triángulos de generación determinista, dos lóbulos orgánicos y partículas ambientales. Render limitado a 30 FPS, movimiento reducido, pausa fuera de pantalla y cleanup. Sin descargas de modelos o texturas. La imagen de respaldo mantiene el diseño en equipos sin WebGL.
- `src/components/scene-slot.tsx`: carga cliente dinámica de la constelación.
- `src/components/portfolio.tsx`: secciones y fichas de proyectos mediante dialog nativo.
- `src/components/live-clock.tsx`: hora de America/Santiago y offset UTC dinámico.
- `src/app/globals.css`: tokens, layout responsive, estados de interacción y movimiento reducido.
- `src/app/fonts/`: fuentes locales y licencias OFL. Inter sustituye PPNeueMontreal manteniendo los pesos 200, 400 y 600. Las fuentes del diseño anterior se conservan como material de archivo.
- `docs/design-reference-dala.md`: referencia visual aportada por el usuario.
- `docs/graphify/`: análisis estructural de la primera versión, previo a los rediseños. Declara sus limitaciones; no describe el código actual.

El historial conserva los diseños anteriores. `three-artifact.tsx` y `public/artifact-fallback.jpg` pertenecen a la versión de cubos; no se cargan en la home actual.

## Datos pendientes

Añadir CV a `public/cv.pdf` y cambiar `links.cv` a `/cv.pdf`. Completar institución, período y fechas de ayudantía; incorporar capturas, aportes individuales, resultados y repositorios verificados. Las fichas tienen espacios de captura, sin inventar imágenes ni métricas.

Los botones GitHub, LinkedIn, correo y teléfono usan los datos indicados por Benjamín. Un clic en Email abre el cliente de correo; el sitio no envía mensajes.

## Verificación

TypeScript, build estático de producción, navegación, dialog de proyecto, cierre con Escape, estado del CV pendiente y revisión visual de escritorio y móvil. La constelación usa el renderer WebGL de [Three.js](https://threejs.org/docs/pages/WebGLRenderer.html).
