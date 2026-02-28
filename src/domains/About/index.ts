/**
 * Punto de entrada del dominio About (Nosotros)
 * Exporta SOLO los recursos públicos del dominio para uso externo
 */

// Página principal - ÚNICA exportación pública
export { default as About } from "./pages/About";

// Los componentes internos, constantes y tipos son privados al dominio
// No se exportan para mantener la encapsulación

