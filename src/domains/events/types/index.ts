/**
 * Tipos e interfaces del dominio Events
 */

/**
 * Representa un evento en el sistema
 */
export interface Event {
  id: number;
  name: string;
  date: number;
  status: string;
  hours?: string;
  type?: string;
  category: string;
  client?: string;
  time: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  imageUrl?: string;
  details?: EventDetails;
  programa?: ProgramItem[];
  incluye?: string[];
  requisitos?: string[];
  organiza?: string;
  invitadoEspecial?: InvitadoEspecial;
  meta?: EventMeta;
}

/**
 * Detalles adicionales de un evento
 */
export interface EventDetails {
  fechaEvento: string;
  capacidad?: number;
  cuposDisponibles?: number;
  inversion?: string;
}

/**
 * Item del programa de un evento
 */
export interface ProgramItem {
  hora: string;
  actividad: string;
}

/**
 * Información del invitado especial
 */
export interface InvitadoEspecial {
  nombre: string;
  descripcion: string;
}

/**
 * Metadata del evento
 */
export interface EventMeta {
  categoriaGeneral: string;
  estado: string;
  visibilidad: string;
  creadoEl: string;
}

/**
 * Filtro de categoría de eventos
 */
export interface EventFilter {
  id: string;
  label: string;
  color: string;
  checked: boolean;
}

