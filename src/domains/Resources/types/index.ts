import type { ReactNode } from "react";

/**
 * Tipo de recurso: descargar o comprar
 */
export type ResourceType = "download" | "buy";

/**
 * Item de recurso individual (libro, manual, etc.)
 */
export interface ResourceItem {
  id: number;
  title: string;
  text: string;
  role: string;
  author: string;
  type: ResourceType;
  bg: string;
  icon: ReactNode;
  actionLink: string;
  coverImage: string;
}

/**
 * Configuración del componente FlipPinnedOverlay
 */
export interface FlipOverlayConfig {
  flipEase: string;
  scrub: number;
  headerOffsetPx?: number;
  winStart?: number;
  winEnd?: number;
  forwardTrigger?: number;
  backwardTrigger?: number;
  autoScrollDuration?: number;
}

