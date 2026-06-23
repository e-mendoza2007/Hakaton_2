# TropelCare Control Room

Consola operativa para la gestión de Tropeles, construida con React + TypeScript + Vite.

## Integrantes

- [Nombre del integrante 1]
- [Nombre del integrante 2]
- [Nombre del integrante 3]

## Instalación

```bash
npm install
```

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila y construye para producción |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run preview` | Previsualiza build de producción |

## Variables de Entorno

```env
VITE_API_BASE_URL=https://<backend-url>/api/v1
```

## Deploy

[Link del deploy en Vercel/Netlify]

## Decisiones Técnicas

- **Vite + React 19 + TypeScript estricto**: Stack obligatorio del proyecto.
- **Tailwind CSS**: Estilos utilitarios, sin librerías de componentes.
- **Axios**: Cliente HTTP con interceptor de token JWT y manejo de errores.
- **React Router v6**: Rutas protegidas con `ProtectedRoute`.
- **Paginación real del servidor**: Tropeles con paginación clásica (`page`/`size`), señales con cursor-based infinite scroll.
- **Estado en URL**: Todos los filtros y página se persisten en `useSearchParams`.
- **Race conditions**: Control con `requestIdRef` para descartar respuestas obsoletas.
- **Infinite scroll**: `IntersectionObserver` sin librerías externas.
- **Scrollytelling**: Sector Story con `IntersectionObserver`, progreso visual y métricas por etapa.
- **CSS Scroll-driven Animations**: `view-timeline-name` con fallback funcional.
- **View Transition API**: Transiciones suaves entre lista de sectores e historia.
- **`prefers-reduced-motion`**: Animaciones desactivadas respetando preferencias del usuario.
