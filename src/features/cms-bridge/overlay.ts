import type { CmsRect } from './protocol'

const BLUE = '#2563eb'

let hoverBox: HTMLDivElement | null = null
let selectedBox: HTMLDivElement | null = null
let selectedTag: HTMLSpanElement | null = null

let selectedEl: Element | null = null
let selectedLabel = ''
let labels: Record<string, string> = {}
let rafId = 0
let onRectChange: ((rect: CmsRect | null) => void) | null = null
let lastRectKey = ''

const TAG_ICON =
  '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="2.5" width="12" height="11" rx="1.5"/><path d="M2 6.5h12"/></svg>'

function createBox(id: string, css: string[]) {
  const el = document.createElement('div')
  el.id = id
  el.style.cssText = [
    'position:fixed',
    'pointer-events:none',
    'box-sizing:border-box',
    'display:none',
    'transition:top 80ms ease,left 80ms ease,width 80ms ease,height 80ms ease',
    ...css,
  ].join(';')
  document.documentElement.appendChild(el)
  return el
}

function ensureBoxes() {
  if (!hoverBox) {
    hoverBox = createBox('cms-bridge-hover', [
      'z-index:2147483645',
      `border:1px solid ${BLUE}`,
      'opacity:0.6',
    ])
  }
  if (!selectedBox) {
    selectedBox = createBox('cms-bridge-selected', ['z-index:2147483646', `border:2px solid ${BLUE}`])
    selectedTag = document.createElement('span')
    selectedTag.style.cssText = [
      'position:absolute',
      'left:-2px',
      'bottom:100%',
      'display:inline-flex',
      'align-items:center',
      'gap:4px',
      `background:${BLUE}`,
      'color:#fff',
      'font:500 12px/16px Inter,system-ui,sans-serif',
      'padding:3px 6px',
      'border-radius:4px 4px 0 0',
      'white-space:nowrap',
      'max-width:280px',
      'overflow:hidden',
      'text-overflow:ellipsis',
    ].join(';')
    selectedBox.appendChild(selectedTag)
  }
}

/** Caja del elemento; si no tiene (p. ej. `display: contents`), la unión de sus hijos. */
export function rectOf(el: Element): DOMRect {
  const rect = el.getBoundingClientRect()
  if (rect.width > 0 || rect.height > 0) return rect
  let top = Infinity
  let left = Infinity
  let right = -Infinity
  let bottom = -Infinity
  for (const child of Array.from(el.children)) {
    const r = rectOf(child)
    if (r.width === 0 && r.height === 0) continue
    top = Math.min(top, r.top)
    left = Math.min(left, r.left)
    right = Math.max(right, r.right)
    bottom = Math.max(bottom, r.bottom)
  }
  if (top === Infinity) return rect
  return new DOMRect(left, top, right - left, bottom - top)
}

function place(box: HTMLDivElement, rect: DOMRect) {
  box.style.display = 'block'
  box.style.top = `${rect.top}px`
  box.style.left = `${rect.left}px`
  box.style.width = `${Math.max(rect.width, 4)}px`
  box.style.height = `${Math.max(rect.height, 4)}px`
}

/** Nombre legible: label enviado por el CMS para la sección/colección, o la clave tal cual. */
export function labelFor(sectionKey: string, path: string) {
  return labels[sectionKey] || labels[path.split('.')[0] ?? ''] || sectionKey || path
}

export function setLabels(next: Record<string, string>) {
  labels = next
}

export function setRectListener(listener: (rect: CmsRect | null) => void) {
  onRectChange = listener
}

export function showHover(el: Element) {
  ensureBoxes()
  if (el === selectedEl) {
    hideHover()
    return
  }
  place(hoverBox!, rectOf(el))
}

export function hideHover() {
  if (hoverBox) hoverBox.style.display = 'none'
}

function syncSelected() {
  rafId = 0
  if (!selectedEl || !selectedBox) return
  if (!selectedEl.isConnected) {
    clearSelected()
    return
  }
  const rect = rectOf(selectedEl)
  const visible =
    rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth
  place(selectedBox, rect)
  // Etiqueta dentro del borde si no hay espacio arriba
  if (selectedTag) {
    const inside = rect.top < 22
    selectedTag.style.bottom = inside ? 'auto' : '100%'
    selectedTag.style.top = inside ? '0' : 'auto'
    selectedTag.style.borderRadius = inside ? '0 0 4px 0' : '4px 4px 0 0'
  }

  const payload = visible
    ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
    : null
  const key = payload ? `${Math.round(payload.top)}:${Math.round(payload.left)}:${Math.round(payload.width)}:${Math.round(payload.height)}` : 'null'
  if (key !== lastRectKey) {
    lastRectKey = key
    onRectChange?.(payload)
  }
}

export function scheduleSync() {
  if (!selectedEl || rafId) return
  rafId = requestAnimationFrame(syncSelected)
}

export function selectElement(el: Element, label: string) {
  ensureBoxes()
  selectedEl = el
  selectedLabel = label
  if (selectedTag) selectedTag.innerHTML = `${TAG_ICON}<span></span>`
  const text = selectedTag?.querySelector('span')
  if (text) text.textContent = selectedLabel
  hideHover()
  lastRectKey = ''
  syncSelected()
}

export function clearSelected() {
  selectedEl = null
  if (selectedBox) selectedBox.style.display = 'none'
  if (lastRectKey !== 'null') {
    lastRectKey = 'null'
    onRectChange?.(null)
  }
}

export function hideAll() {
  hideHover()
  clearSelected()
}

function findPathElement(path: string): Element | null {
  let el: Element | null = document.querySelector(`[data-cms="${CSS.escape(path)}"]`)

  // Lista sin elemento propio (p. ej. "site_header.aboutLinks"): usar el contenedor de sus ítems
  if (!el) {
    const firstItem = document.querySelector(`[data-cms^="${CSS.escape(`${path}.`)}"]`)
    el = firstItem?.parentElement ?? null
  }

  if (!el && path.startsWith('collection.')) {
    const parts = path.split('.')
    const collection = parts[1]
    const id = parts.slice(2).join('.')
    if (collection && id) {
      el = document.querySelector(
        `[data-cms-collection="${CSS.escape(collection)}"][data-cms-id="${CSS.escape(id)}"]`,
      )
    }
  }
  return el
}

export function highlightPath(path: string, label?: string) {
  const el = findPathElement(path)
  // Campo sin elemento propio (p. ej. "stats.items"): resaltar la sección entera
  if (!el) return path.startsWith('collection.') ? null : highlightSection(path.split('.')[0] ?? '', label)
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  selectElement(el, label || labelFor(path.split('.')[0] ?? '', path))
  return el
}

export function highlightSection(sectionKey: string, label?: string) {
  const el = sectionKey.startsWith('collection:')
    ? document.querySelector(
        `[data-cms-collection="${CSS.escape(sectionKey.slice('collection:'.length))}"]`,
      )
    : document.querySelector(`[data-cms-section="${CSS.escape(sectionKey)}"]`)
  if (!el) return null
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  selectElement(el, label || labelFor(sectionKey, sectionKey))
  return el
}
