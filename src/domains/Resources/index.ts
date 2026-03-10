/**
 * Punto de entrada del dominio Resources
 * Exporta SOLO los recursos públicos del dominio para uso externo
 */

// Página principal - ÚNICA exportación pública
export { default as Resources } from "./pages/Resources";

// Los componentes internos, constantes y tipos son privados al dominio
// No se exportan para mantener la encapsulación
