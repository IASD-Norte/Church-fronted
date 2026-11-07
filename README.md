# ⛪ Church Frontend – Iglesia Adventista Norte Bucaramanga

**Frontend oficial de la Iglesia Adventista del Séptimo Día – Norte Bucaramanga**, desarrollado como una landing page moderna, modular y escalable, enfocada en comunicar información clave de la iglesia, sus departamentos, eventos, recursos y contacto con la comunidad.

## 📌 Propósito del Proyecto

Este proyecto tiene como objetivo:

- **Centralizar la información de la iglesia en un solo lugar**
- **Facilitar el acceso a:**
  - Departamentos
  - Eventos y calendario
  - Grupos pequeños
  - Recursos multimedia
  - Información de contacto
- **Ofrecer una experiencia moderna, clara y accesible para miembros y visitantes**

Está diseñado para crecer en el futuro (autenticación, panel administrativo, integración con APIs, etc.).

## 🧩 Funcionalidades Principales

### 🏠 Landing Page
- Sección Hero
- Anuncios importantes
- Llamados a la acción
- Información general de la iglesia

### 🏢 Departamentos
- Listado de departamentos
- Información detallada de cada ministerio

### 📅 Eventos
- Carrusel de eventos
- Calendario interactivo
- Opción de agregar eventos al calendario del usuario

### 👥 Grupos Pequeños
- Información de iglesias y grupos
- Ubicación geográfica (mapas)

### 📚 Recursos
- Videos (YouTube)
- Contenido de Instagram
- Testimonios
- Recursos visuales y multimedia

### 📞 Contacto
- Información de contacto
- Formularios
- Ubicación

### 🌍 Soporte Multilenguaje
### 🌓 Modo claro / oscuro
### 📱 Diseño responsive

## 🛠️ Tecnologías Utilizadas

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn/UI**
- **GSAP (animaciones)**
- **React Simple Maps**
- **Component Architecture / Domain Driven UI**

## 🗂️ Arquitectura del Proyecto

El proyecto está organizado siguiendo una arquitectura modular por dominios, facilitando el mantenimiento y la escalabilidad.

### 📁 core/
Componentes reutilizables y base del sistema:
- UI genérica
- Layouts
- Temas
- Navegación
- Modales
- Carruseles
- Calendarios
- Mapas
- Loader y animaciones

### 📁 domains/
Cada dominio representa una sección funcional de la aplicación:
- **Home** → Página principal
- **About** → Información institucional
- **Departaments** → Ministerios y departamentos
- **Events** → Eventos y calendario
- **Contact** → Contacto
- **Resources** → Recursos multimedia

Cada dominio contiene:
- components/
- pages/
- constants/
- types/

### 📁 shared/
Elementos compartidos entre dominios:
- Hooks personalizados
- Servicios
- Constantes
- Tipos
- Utilidades
- Assets

### 📁 features/
Funcionalidades específicas:
- Autenticación
- Configuración de API

## 🧭 Flujo General de la Aplicación

1. **main.tsx** inicializa la app
2. **App.tsx** gestiona el layout principal
3. Cada ruta carga una página desde domains/*/pages
4. Los componentes reutilizables provienen de core y shared
5. La información está centralizada en archivos de configuración (constants)

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Construir para producción
pnpm build
```

## 🧱 Estado del Proyecto

- ✅ Landing funcional
- ✅ Arquitectura escalable
- ✅ Componentes reutilizables
- 🔄 Integración con backend (futuro)
- 🔄 Panel administrativo (futuro)

## 🙏 Contexto

Este proyecto fue desarrollado para la Iglesia Adventista del Séptimo Día – Norte Bucaramanga, como una herramienta digital para fortalecer la comunicación, la organización y el acceso a la información de la comunidad.

## 👨‍💻 Autor

**Sebastián Betancourt**
FullStack Developer

Proyecto desarrollado para servicio comunitario y crecimiento tecnológico de la iglesia.