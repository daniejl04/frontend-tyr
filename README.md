# Héctor Severino - Grupo Turbos y Repuestos

Este proyecto es una aplicación web de comercio electrónico para una empresa líder industrial en sistemas de turbocompresores, suministros y mantenimiento especializado.

## Características

- **Diseño Moderno e Industrial**: Interfaz limpia y profesional utilizando Tailwind CSS v4.
- **Next.js 16 (App Router)**: Aprovecha las últimas convenciones de Next.js para un rendimiento óptimo.
- **Componentización**: Estructura modular y reutilizable.
- **Seguridad de Rutas**: Configuración de proxy y cabeceras de seguridad integradas.
- **Optimización de Fuentes**: Uso de `next/font/google` para Inter y Work Sans.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18.x o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación y Uso Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd frontend-tyr
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Ver el proyecto:**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

- `app/`: Contiene las páginas y componentes principales.
  - `components/`: Componentes esenciales (Navbar, Hero, Footer, etc.).
  - `proxy.ts`: Lógica de proxying y seguridad de rutas.
  - `layout.tsx`: Configuración global de fuentes y estilos.
  - `page.tsx`: Página de inicio.
- `public/`: Archivos estáticos.
- `next.config.ts`: Configuración de Next.js incluyendo cabeceras de seguridad.

## Tecnologías Utilizadas

- **Next.js 16**
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**

## Seguridad

El proyecto incluye:
- Cabeceras de seguridad HTTP (X-Content-Type-Options, X-Frame-Options, etc.) configuradas en `next.config.ts`.
- Un manejador de `proxy.ts` para filtrado de rutas y validación de accesos.

---
© 2026 Héctor Severino - Grupo Turbos y Repuestos.
