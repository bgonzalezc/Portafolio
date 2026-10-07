# BG / SYSTEMS PORTFOLIO

Portafolio de Benjamín González. Next.js App Router, TypeScript, Tailwind CSS 4 y Three.js. Composición inspirada en la referencia Max Yinger proporcionada: canvas #12130f, texto #e4dfda, metadatos de 12px, grupos en las esquinas y artefacto cromado flotante. El rosa #f5c2c8 se usa exclusivamente en la iluminación de la escena 3D.

## Ejecutar

Requiere Node.js 20.9 o superior.

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:3000. Verificar con `npm run typecheck` y `npm run build`. El build exporta la web a `out/` para hosting estático. Si se requieren funciones de servidor, retirar `output: 'export'` de `next.config.ts`.

## Estructura

- `src/lib/portfolio.ts`: proyectos y enlaces personales verificados; CV pendiente.
- `src/components/hero.tsx`: composición en las esquinas y metadatos reales del viewport.
- `src/components/live-clock.tsx`: hora en vivo de America/Santiago y offset UTC dinámico.
- `src/components/scene-slot.tsx`: carga dinámica de la escena, sin render en servidor.
- `src/components/three-artifact.tsx`: cinco cubos de geometría biselada, material metálico, iluminación y reflejos de estudio. Respuesta sutil al puntero, sin giro automático. Pausa fuera de pantalla; libera recursos al desmontar y respeta movimiento reducido. Incluye imagen de respaldo si WebGL no está disponible.
- `src/components/portfolio.tsx`: secciones numeradas y diálogos de proyecto accesibles con Escape y cierre en backdrop.
- `src/app/globals.css`: tokens, densidad, estados de interacción y composición responsive. UI sin sombras, glassmorphism, cajas o acentos cromáticos.
- `src/app/fonts/`: Inter 400, JetBrains Mono 400 y VT323 400 con sus licencias OFL. Son sustitutos permitidos por la referencia, no las tipografías comerciales originales. Se sirven localmente mediante next/font/local.

## Pendiente

Incorporar CV en `public/cv.pdf` y asignar `links.cv = '/cv.pdf'`. Completar institución, período y fechas de ayudantía; añadir capturas, aportes, resultados y repositorios verificados. Los espacios de captura quedan en las fichas de detalle; la home solo utiliza el artefacto 3D como imagen.

Para un modelo 3D final, sustituir el ensamble en ThreeArtifact por un glTF conservando las reglas de pausa, cleanup y fallback.

## Referencias técnicas

[Exportación estática de Next.js](https://nextjs.org/docs/app/guides/static-exports), [RoundedBoxGeometry](https://threejs.org/docs/pages/RoundedBoxGeometry.html), [RoomEnvironment](https://threejs.org/docs/pages/RoomEnvironment.html).

El análisis graphify de la versión previa está separado en outputs/graphify-audit; no se publica dentro del sitio. Es una extracción estructural con aliases parcialmente resueltos; el informe declara sus limitaciones.
