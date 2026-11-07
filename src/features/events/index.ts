import { useMemo, useSyncExternalStore } from 'react'
import type { CalendarEvent } from '@/domains/events/utils/calendar.utils'

const API_URL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL ?? 'http://localhost:3000')

/** Evento disparado por el bridge del CMS cuando el editor crea/edita/borra eventos. */
export const EVENTS_REFRESH_EVENT = 'cms:events-refresh'

type ApiEvent = {
  id: string
  title: string
  description?: string | null
  startDate: string
  endDate?: string | null
  location?: string | null
  type: string
  imageUrl?: string | null
}

/** Evento tal como lo usa el sitio (carrusel, calendario y modal de detalle). */
export type SiteEvent = {
  id: string
  title: string
  description: string
  type: string
  typeLabel: string
  start: Date
  /** null si el evento no tiene hora de fin. */
  end: Date | null
  location: string
  imageUrl: string
}

export const EVENT_TYPE_META: Record<string, { label: string; color: string }> = {
  CULTO: { label: 'Culto', color: '#dfa83d' },
  JOVEN: { label: 'Jóvenes', color: '#3b82f6' },
  FAMILIAR: { label: 'Familiar', color: '#10b981' },
  ESPECIAL: { label: 'Evento Especial', color: '#a855f7' },
  BAUTISMO: { label: 'Bautismo', color: '#0ea5e9' },
  SEMINARIO: { label: 'Seminario', color: '#f97316' },
}

export function eventTypeMeta(type: string) {
  return EVENT_TYPE_META[type] ?? { label: type, color: '#71717a' }
}

/** Las imágenes subidas desde el CMS (/uploads/...) las sirve la API, no el sitio. */
function resolveImageUrl(url?: string | null) {
  if (!url) return ''
  if (url.startsWith('/uploads/')) return `${API_URL.replace(/\/$/, '')}${url}`
  return url
}

function toSiteEvent(e: ApiEvent): SiteEvent {
  return {
    id: e.id,
    title: e.title,
    description: e.description ?? '',
    type: e.type,
    typeLabel: eventTypeMeta(e.type).label,
    start: new Date(e.startDate),
    end: e.endDate ? new Date(e.endDate) : null,
    location: e.location ?? '',
    imageUrl: resolveImageUrl(e.imageUrl),
  }
}

// ── Formato de fechas ────────────────────────────────────────────────────────

const dayFmt = new Intl.DateTimeFormat('es-CO', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const timeFmt = new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit' })

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString()
}

export function formatTime(date: Date) {
  return timeFmt.format(date)
}

/** "Sábado, 16 de noviembre de 2026" o "21 al 23 de noviembre de 2026". */
export function formatEventDay(event: SiteEvent) {
  const { start, end } = event
  if (end && !sameDay(start, end)) {
    const sameMonth =
      start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
    const endLabel = new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(end)
    const startLabel = sameMonth
      ? String(start.getDate())
      : new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long' }).format(start)
    return `${startLabel} al ${endLabel}`
  }
  return capitalize(dayFmt.format(start))
}

/** "7:00 p. m. – 9:00 p. m." */
export function formatEventTimeRange(event: SiteEvent) {
  const start = formatTime(event.start)
  if (!event.end) return start
  return `${start} – ${formatTime(event.end)}`
}

/** "2 h 30 min" (null si no hay fin o dura varios días). */
export function formatDuration(event: SiteEvent) {
  if (!event.end || !sameDay(event.start, event.end)) return null
  const minutes = Math.round((event.end.getTime() - event.start.getTime()) / 60_000)
  if (minutes <= 0) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return [h ? `${h} h` : '', m ? `${m} min` : ''].filter(Boolean).join(' ')
}

/** Etiqueta compacta para tarjetas: "Sábado, 16 de noviembre de 2026 · 7:00 p. m.". */
export function formatEventDateLabel(event: SiteEvent) {
  const day = formatEventDay(event)
  if (event.end && !sameDay(event.start, event.end)) return day
  return `${day} · ${formatTime(event.start)}`
}

export function isUpcoming(event: SiteEvent, now = Date.now()) {
  return (event.end ?? event.start).getTime() >= now
}

/** ¿El evento ocurre (total o parcialmente) en este día? */
export function occursOn(event: SiteEvent, day: Date) {
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime()
  const dayEnd = dayStart + 86_400_000
  const start = event.start.getTime()
  const end = (event.end ?? event.start).getTime()
  return start < dayEnd && end >= dayStart
}

/** Adaptador para las utilidades de "agregar al calendario". */
export function toCalendarEvent(event: SiteEvent): CalendarEvent {
  // Sin hora de fin: se asumen 2 horas
  const end = event.end ?? new Date(event.start.getTime() + 2 * 3600_000)
  return {
    id: event.id,
    name: event.title,
    description: event.description,
    category: event.typeLabel,
    dateLabel: formatEventDateLabel(event),
    startDate: event.start.toISOString(),
    endDate: end.toISOString(),
    location: event.location,
    imageUrl: event.imageUrl,
  }
}

// ── Store compartido (una sola petición para carrusel + calendario) ──────────

type State = { events: SiteEvent[]; status: 'loading' | 'ready' | 'error' }

let state: State = { events: [], status: 'loading' }
let inflight: Promise<void> | null = null
let started = false
const listeners = new Set<() => void>()

function setState(next: State) {
  state = next
  listeners.forEach((l) => l())
}

async function load() {
  if (inflight) return inflight
  inflight = (async () => {
    try {
      const res = await fetch(`${API_URL}/events?isPublished=true&limit=100`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = (await res.json()) as { data: ApiEvent[] }
      const events = json.data
        .map(toSiteEvent)
        .sort((a, b) => a.start.getTime() - b.start.getTime())
      setState({ events, status: 'ready' })
    } catch {
      setState({ ...state, status: 'error' })
    } finally {
      inflight = null
    }
  })()
  return inflight
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!started) {
    started = true
    void load()
    window.addEventListener(EVENTS_REFRESH_EVENT, () => void load())
  }
  return () => listeners.delete(listener)
}

/** Todos los eventos publicados (pasados y futuros), ordenados por fecha. */
export function usePublishedEvents() {
  return useSyncExternalStore(subscribe, () => state)
}

/** Próximos eventos publicados (los gestiona el CMS; ya no hay eventos por defecto). */
export function useUpcomingEvents() {
  const { events, status } = usePublishedEvents()
  const upcoming = useMemo(() => events.filter((e) => isUpcoming(e)), [events])
  return { events: upcoming, status }
}
