/**
 * Tipos para el dominio About (Nosotros)
 */

export interface AboutScrollConfig {
  panelSelector: string;
  snapDuration: number;
  markers: boolean;
  disableOnMobile: boolean;
  endTrigger: string;
}

export interface AboutHeroData {
  title1: string;
  title2: string;
  description: string;
  backgroundImage: string;
  joinUsText: string;
  joinUsHref: string;
  visitUsText: string;
  buttonText: string;
  buttonHref: string;
}

export interface AboutContentData {
  title: string;
  sectionId: string;
}

