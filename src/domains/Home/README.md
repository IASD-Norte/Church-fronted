# Dominio Home

Este dominio contiene toda la lógica, componentes y configuraciones relacionadas con la página principal (Home/Landing Page) de la aplicación.

## 📁 Estructura

```
Home/
├── components/           # Componentes PRIVADOS del Home
│   ├── CarouselSection.tsx
│   ├── AnnouncementsSection.tsx
│   ├── GraphSection.tsx
│   ├── ChurchesSection.tsx
│   ├── CallToActionSection.tsx
│   ├── HeroContactSection.tsx
│   └── ContactSection.tsx
├── constants/           # Constantes PRIVADAS y configuraciones
│   └── homeConfig.ts    # Configuraciones del scroll, textos, IDs
├── hooks/              # Hooks personalizados (vacío por ahora)
├── pages/              # Páginas del dominio
│   └── Home.tsx        # Página principal (PÚBLICA)
├── services/           # Servicios y lógica de negocio (vacío por ahora)
├── types/              # TypeScript types e interfaces PRIVADAS
│   └── index.ts
├── index.ts            # Punto de entrada - SOLO exporta Home (público)
└── README.md           # Este archivo
```

## 🎯 Características

### Componentes Modulares

Cada sección del Home está separada en su propio componente para mejor:
- **Mantenibilidad**: Cada sección es independiente
- **Reutilización**: Los componentes pueden reutilizarse si es necesario
- **Testing**: Más fácil de testear componentes individuales
- **Legibilidad**: Código más limpio y organizado

### Configuración Centralizada

Todas las constantes están centralizadas en `constants/homeConfig.ts`:
- `HOME_SCROLL_CONFIG`: Configuración del scroll animado
- `HOME_SECTION_IDS`: IDs de las secciones
- `HOME_TEXTS`: Textos y contenido
- `HOME_MEDIA`: Rutas de archivos multimedia

### Tipos TypeScript

Todos los tipos están definidos en `types/index.ts` para mejor type-safety.

### Sistema de Temas

Los componentes usan las variables CSS de shadcn/ui para soporte automático de dark mode:
- `bg-background`: Fondo principal
- `bg-muted/50`: Fondo secundario con opacidad
- `text-foreground`: Texto principal
- `text-muted-foreground`: Texto secundario

## 🚀 Uso

### Exportación Pública (Desde fuera del dominio):

Solo el componente `Home` está disponible públicamente:

```typescript
import { Home } from "@/domains/Home";
```

### Importaciones Internas (Solo dentro del dominio):

Los componentes, constantes y tipos son privados y se importan directamente desde sus archivos:

```typescript
// Dentro de src/domains/Home/pages/Home.tsx
import { CarouselSection } from "../components/CarouselSection";
import { AnnouncementsSection } from "../components/AnnouncementsSection";
import { HOME_TEXTS, HOME_SECTION_IDS } from "../constants/homeConfig";
```

**Principio de Encapsulación**: 
- Los detalles de implementación permanecen privados
- Solo la interfaz pública (Home) se expone hacia afuera
- No usamos `index.ts` en carpetas internas para evitar re-exports innecesarios

## 🧩 Secciones del Home

1. **CarouselSection**: Carousel principal con imágenes destacadas
2. **AnnouncementsSection**: Sección de anuncios importantes
3. **GraphSection**: Gráficas y estadísticas
4. **ChurchesSection**: Mapa interactivo con tabla de iglesias
5. **CallToActionSection**: Mensaje motivacional principal
6. **HeroContactSection**: Hero section con video y CTA
7. **ContactSection**: Formulario de contacto

## 🔄 Flujo de Scroll

El Home utiliza `useScrollHomeTrigger` para crear una experiencia de scroll animada que conecta todas las secciones de manera fluida.

## 📝 Convenciones

- **Componentes**: Funciones normales (`export function`) en lugar de `React.FC`
- **Temas**: Uso de variables CSS de shadcn/ui (`bg-muted`, `text-foreground`, etc.)
- **Dark Mode**: Todos los componentes soportan tema claro/oscuro automáticamente
- **IDs**: Las secciones mantienen IDs en constantes centralizadas
- **Textos**: Contenido centralizado para fácil internacionalización futura
- **Responsabilidad única**: Cada componente tiene una única responsabilidad

## 🔮 Próximos Pasos

- Agregar hooks personalizados si se necesitan
- Implementar servicios para llamadas a API
- Añadir tests unitarios para cada componente
- Considerar internacionalización (i18n) para los textos

