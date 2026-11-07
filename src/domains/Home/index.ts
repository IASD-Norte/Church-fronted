/**
 * Punto de entrada del dominio Home
 * Exporta SOLO los recursos públicos del dominio para uso externo
 */

// Página principal - ÚNICA exportación pública
export { default as Home } from "./pages/Home";

// Los componentes internos, constantes y tipos son privados al dominio
// No se exportan para mantener la encapsulación

