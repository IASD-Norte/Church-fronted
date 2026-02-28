/**
 * Tipos para el dominio Home
 */

export interface HomeScrollConfig {
  panelSelector: string;
  snapDuration: number;
  markers: boolean;
  disableOnMobile: boolean;
  endTrigger: string;
}

export interface HeroSectionData {
  titulo1: string;
  titulo2: string;
  video: string;
  buttonText: string;
  buttonHref: string;
}

