import { useSyncExternalStore } from 'react'
import {
  DEFAULT_ABOUT_HERO,
  DEFAULT_ABOUT_INTRO,
  DEFAULT_ABOUT_MISSION,
  DEFAULT_CONTACT_FORM,
  DEFAULT_DEPARTMENTS_INDEX,
  DEFAULT_GRUPOS_PAGE,
  DEFAULT_SITE_HEADER,
  DEFAULT_HERO,
  DEFAULT_HOME_CHURCHES,
  DEFAULT_HOME_CTA,
  DEFAULT_HOME_HERO_CONTACT,
  DEFAULT_INTRO,
  DEFAULT_MISSION,
  DEFAULT_SOCIAL,
  DEFAULT_STATS,
  normalizeStats,
  type ContentMap,
} from './schema'

const API_URL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL ?? 'http://localhost:3000')

type Listener = () => void

let content: Partial<ContentMap> = {}
let ready = false
let promise: Promise<void> | null = null
const listeners = new Set<Listener>()

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return content
}

function getServerSnapshot(): Partial<ContentMap> {
  return {}
}

async function fetchPublished(): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/content`)
    if (!res.ok) {
      if (import.meta.env.DEV) {
        console.error(`[contentStore] GET /content → ${res.status}`)
      }
      return
    }
    const data = (await res.json()) as Partial<ContentMap>
    content = { ...data }
    if (content.stats) {
      content.stats = normalizeStats(content.stats as ContentMap['stats'])
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('[contentStore] GET /content failed:', err)
    }
  } finally {
    ready = true
    emit()
  }
}

/** Single fetch at boot. Safe to call multiple times. */
export function loadContent(): Promise<void> {
  if (!promise) {
    promise = fetchPublished()
  }
  return promise
}

/** Replace/merge content (used by cms-bridge preview). */
export function setContent(partial: Partial<ContentMap>) {
  const next = { ...content, ...partial }
  if (next.stats) {
    next.stats = normalizeStats(next.stats as ContentMap['stats'])
  }
  content = next
  ready = true
  emit()
}

export function getContent(): Partial<ContentMap> {
  return content
}

export function isContentReady(): boolean {
  return ready
}

const KEY_DEFAULTS: Partial<ContentMap> = {
  home_hero: DEFAULT_HERO,
  home_intro: DEFAULT_INTRO,
  stats: DEFAULT_STATS,
  mission: DEFAULT_MISSION,
  social: DEFAULT_SOCIAL,
  home_cta: DEFAULT_HOME_CTA,
  home_hero_contact: DEFAULT_HOME_HERO_CONTACT,
  home_churches: DEFAULT_HOME_CHURCHES,
  contact_form: DEFAULT_CONTACT_FORM,
  about_hero: DEFAULT_ABOUT_HERO,
  about_intro: DEFAULT_ABOUT_INTRO,
  about_mission: DEFAULT_ABOUT_MISSION,
  departments_index: DEFAULT_DEPARTMENTS_INDEX,
  grupos_page: DEFAULT_GRUPOS_PAGE,
  site_header: DEFAULT_SITE_HEADER,
}

export function useContent<K extends keyof ContentMap>(
  key: K,
  fallback?: ContentMap[K],
): ContentMap[K] {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const defaultValue = (fallback ?? KEY_DEFAULTS[key]) as ContentMap[K]


  const value = snapshot[key]
  if (value === undefined || value === null) {
    return defaultValue
  }

  if (key === 'home_hero') {
    return {
      ...DEFAULT_HERO,
      ...(value as object),
      mode: (value as { mode?: string }).mode === 'live' ? 'live' : 'clip',
    } as ContentMap[K]
  }

  if (key === 'home_intro') {
    return { ...DEFAULT_INTRO, ...(value as object) } as ContentMap[K]
  }

  if (key === 'stats') {
    return normalizeStats(value as ContentMap['stats']) as ContentMap[K]
  }

  return { ...(defaultValue as object), ...(value as object) } as ContentMap[K]
}

export function useContentReady(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  )
}
