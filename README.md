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

2. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto (puedes copiar el contenido de `.env.example` si existe) y asegúrate de configurar la URL del API:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3005
   ```

3. **Instalar las dependencias:**
   ```bash
   npm install
   ```

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Ver el proyecto:**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Integración con API de Productos

El proyecto está configurado para conectarse con un backend en `http://localhost:3005`. El servicio de productos (`services/product-service.ts`) permite realizar búsquedas y filtrados avanzados:

### Endpoints y Filtros
- **GET /products**: Obtiene la lista de productos paginada.
  - `page`: Número de página (ej. `1`).
  - `limit`: Cantidad de productos por página (ej. `10`).
  - `name`: Filtrar por nombre exacto.
  - `sku`: Filtrar por SKU exacto.
  - `status`: Filtrar por estado (ej. `in stock`).
  - `q`: Búsqueda global por nombre, descripción o SKU.

Ejemplo de uso en el código:
```typescript
const response = await productService.getAll({
  q: 'turbo',
  page: 1,
  limit: 10,
  status: 'in stock'
});
```

### Hooks Personalizados
- **useProducts**: Hook para gestionar el estado de los productos, carga, errores y paginación.
  ```typescript
  const { products, loading, search, updateFilters } = useProducts({ limit: 12 });
  ```

## Estructura del Proyecto

- `app/`: Contiene las páginas y componentes principales.
  - `[locale]/`: Soporte para internacionalización (i18n).
  - `components/`: Componentes esenciales (Navbar, Hero, Footer, etc.).
- `hooks/`: Hooks personalizados de React.
- `lib/`: Utilidades y clientes (API client, validación de env, etc.).
- `services/`: Lógica de comunicación con servicios externos (API).
- `types/`: Definiciones de interfaces y tipos de TypeScript.
- `public/`: Archivos estáticos.
- `next.config.ts`: Configuración de Next.js.

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
