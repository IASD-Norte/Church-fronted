import { setContent } from '@/features/content'
import { EVENTS_REFRESH_EVENT } from '@/features/events'
import {
  CMS_BRIDGE_VERSION,
  isCmsBridgeMessage,
  type CmsBridgeMessage,
  type CmsFieldType,
} from './protocol'
import {
  clearSelected,
  hideAll,
  hideHover,
  highlightPath,
  highlightSection,
  labelFor,
  rectOf,
  scheduleSync,
  selectElement,
  setLabels,
  setRectListener,
  showHover,
} from './overlay'

const CMS_ORIGIN = import.meta.env.VITE_CMS_ORIGIN as string | undefined

/** Evento para que componentes con contenido oculto (p. ej. submenús) se muestren al editarse. */
export const CMS_SELECT_EVENT = 'cms:select'

function revealAndHighlight(path: string, label?: string) {
  window.dispatchEvent(new CustomEvent(CMS_SELECT_EVENT, { detail: path }))
  // Esperar a que el contenido revelado sea visible antes de medir
  requestAnimationFrame(() => highlightPath(path, label))
  window.setTimeout(scheduleSync, 350)
}

let inspectEnabled = true

function post(message: CmsBridgeMessage) {
  if (!CMS_ORIGIN) return
  window.parent.postMessage(message, CMS_ORIGIN)
}

function sectionKeyFrom(el: Element): string {
  const section = el.closest('[data-cms-section]')
  return section?.getAttribute('data-cms-section') || el.getAttribute('data-cms')?.split('.')[0] || ''
}

function fieldTypeFrom(el: Element): CmsFieldType {
  const raw = el.getAttribute('data-cms-type')
  if (
    raw === 'text' ||
    raw === 'textarea' ||
    raw === 'image' ||
    raw === 'video' ||
    raw === 'number' ||
    raw === 'list' ||
    raw === 'list-item'
  ) {
    return raw
  }
  return 'text'
}

function cmsTargetFrom(event: MouseEvent): Element | null {
  const el = event.target as Element | null
  if (!el?.closest) return null
  return el.closest('[data-cms], [data-cms-collection]')
}

function pathFromTarget(target: Element): string | null {
  const fieldPath = target.getAttribute('data-cms')
  if (fieldPath) return fieldPath

  const collection = target.getAttribute('data-cms-collection')
  const id = target.getAttribute('data-cms-id')
  if (collection && id) return `collection.${collection}.${id}`
  return null
}

function sectionKeyFromTarget(target: Element): string {
  const collection = target.getAttribute('data-cms-collection')
  if (collection) return `collection:${collection}`
  return sectionKeyFrom(target)
}

function onMouseMove(event: MouseEvent) {
  if (!inspectEnabled) return
  const target = cmsTargetFrom(event)
  if (!target || !pathFromTarget(target)) {
    hideHover()
    return
  }
  showHover(target)
}

function onClick(event: MouseEvent) {
  if (!inspectEnabled) return
  const target = cmsTargetFrom(event)
  if (!target) return

  event.preventDefault()
  event.stopPropagation()

  const path = pathFromTarget(target)
  if (!path) return

  const sectionKey = sectionKeyFromTarget(target)
  const rect = rectOf(target)
  post({
    v: CMS_BRIDGE_VERSION,
    type: 'select',
    path,
    fieldType: fieldTypeFrom(target),
    sectionKey,
    rect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    },
  })
  selectElement(target, labelFor(sectionKey, path))
}

function onMessage(event: MessageEvent) {
  if (CMS_ORIGIN && event.origin !== CMS_ORIGIN) return
  if (!isCmsBridgeMessage(event.data)) return

  const msg = event.data
  switch (msg.type) {
    case 'content:replace':
      setContent(msg.content)
      break
    case 'select:path':
      revealAndHighlight(msg.path, msg.label)
      break
    case 'scroll:section':
      highlightSection(msg.sectionKey, msg.label)
      break
    case 'navigate:to': {
      const target = msg.path.startsWith('/') ? msg.path : `/${msg.path}`
      if (window.location.hash.replace(/^#/, '') !== target) {
        window.location.hash = target
        window.scrollTo(0, 0)
      }
      break
    }
    case 'select:clear':
      clearSelected()
      break
    case 'labels:set':
      setLabels(msg.labels)
      break
    case 'collection:refresh':
      if (msg.collection === 'events') window.dispatchEvent(new Event(EVENTS_REFRESH_EVENT))
      break
    case 'inspect:set':
      inspectEnabled = msg.enabled
      if (!inspectEnabled) hideHover()
      break
    case 'ping':
      post({ v: CMS_BRIDGE_VERSION, type: 'pong' })
      break
    default:
      break
  }
}

function onKeyDown(event: KeyboardEvent) {
  // Esc dentro del iframe: el CMS no recibe el evento, así que se reenvía
  if (event.key !== 'Escape') return
  clearSelected()
  post({ v: CMS_BRIDGE_VERSION, type: 'select:clear' })
}

function reportHash() {
  hideAll()
  post({
    v: CMS_BRIDGE_VERSION,
    type: 'navigate',
    path: window.location.hash || '#/',
  })
}

function boot() {
  if (!CMS_ORIGIN) {
    console.warn('[cms-bridge] VITE_CMS_ORIGIN no configurado; bridge inactivo')
    return
  }

  document.documentElement.setAttribute('data-cms-preview', '1')
  setRectListener((rect) => post({ v: CMS_BRIDGE_VERSION, type: 'selection:rect', rect }))
  window.addEventListener('scroll', scheduleSync, { capture: true, passive: true })
  window.addEventListener('resize', scheduleSync)
  // El contenido puede cambiar de tamaño al editar (content:replace); re-medir.
  new ResizeObserver(scheduleSync).observe(document.body)
  document.documentElement.addEventListener('mouseleave', hideHover)
  document.addEventListener('mousemove', onMouseMove, true)
  document.addEventListener('click', onClick, true)
  document.addEventListener('keydown', onKeyDown)
  window.addEventListener('message', onMessage)
  window.addEventListener('hashchange', reportHash)

  post({ v: CMS_BRIDGE_VERSION, type: 'ready' })
  reportHash()
}

boot()

export {}
