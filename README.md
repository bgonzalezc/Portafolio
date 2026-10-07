# BG / SYSTEMS PORTFOLIO

Primera versión del portafolio de Benjamín González. Next.js App Router, TypeScript y Tailwind CSS 4. Sin servicios externos ni credenciales.

## Ejecutar

Requiere Node.js 20.9 o superior.

```sh
npm install
npm run dev
```

Abrir http://127.0.0.1:3000. Para validar: `npm run typecheck` y `npm run build`. El build exporta la web a `out/`; se puede servir en cualquier hosting estático. Eliminar `output: 'export'` de `next.config.ts` si se necesitan funciones de servidor en el futuro.

## Editar contenido

- `src/lib/portfolio.ts`: proyectos, tecnologías y enlaces personales. Agregar el CV en `public/cv.pdf` y cambiar `links.cv` a `/cv.pdf`.
- `src/components/portfolio.tsx`: secciones, tarjetas, fichas de proyecto y contacto.
- `src/components/live-clock.tsx`: hora en vivo de America/Santiago y offset UTC según horario de verano.
- `src/components/scene-slot.tsx`: límite de integración del objeto Three.js. Aún no incluye Three.js ni un modelo 3D; muestra un visor geométrico de referencia.
- `src/app/globals.css`: sistema visual, responsive y movimiento reducido.

## Próxima integración 3D

Crear un componente cliente SceneCanvas, importarlo desde un wrapper cliente con `next/dynamic` y `ssr: false`. Instalar `three` y sus tipos (opcionalmente React Three Fiber). Montar el canvas dentro de SceneSlot conservando el fallback, la altura reservada y la descripción accesible. Liberar renderer, geometrías y materiales al desmontar. Respetar `prefers-reduced-motion`, pausar fuera de pantalla y ofrecer fallback sin WebGL.

## Contenido pendiente

Los gráficos de proyecto son placeholders estilizados, no capturas ni resultados reales. Incorporar screenshots, repositorios, aporte individual y métricas verificadas. Completar institución, período académico y fechas de ayudantía. La ficha actual no inventa resultados ni fechas. GitHub, LinkedIn, email y teléfono corresponden a los datos facilitados por Benjamín; CV pendiente.

La referencia adjunta a la conversación original no estuvo disponible como imagen; se siguió la descripción visual y la dirección indicada por el usuario.

Documentación de configuración: [exportación estática de Next.js](https://nextjs.org/docs/app/guides/static-exports) y [Tailwind CSS con Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
