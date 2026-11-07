let overlay: HTMLDivElement | null = null
let label: HTMLSpanElement | null = null

function ensureOverlay() {
  if (overlay) return overlay

  overlay = document.createElement('div')
  overlay.id = 'cms-bridge-overlay'
  overlay.style.cssText = [
    'position:fixed',
    'pointer-events:none',
    'z-index:2147483646',
    'border:2px solid #2563eb',
    'border-radius:4px',
    'box-sizing:border-box',
    'display:none',
    'transition:top 80ms ease,left 80ms ease,width 80ms ease,height 80ms ease',
  ].join(';')

  label = document.createElement('span')
  label.style.cssText = [
    'position:absolute',
    'top:-22px',
    'left:0',
    'background:#2563eb',
    'color:#fff',
    'font:11px/1.4 system-ui,sans-serif',
    'padding:2px 6px',
    'border-radius:3px',
    'white-space:nowrap',
    'max-width:280px',
    'overflow:hidden',
    'text-overflow:ellipsis',
  ].join(';')
  overlay.appendChild(label)
  document.documentElement.appendChild(overlay)
  return overlay
}

export function showOverlay(el: Element, path: string) {
  const box = ensureOverlay()
  const rect = el.getBoundingClientRect()
  box.style.display = 'block'
  box.style.top = `${rect.top}px`
  box.style.left = `${rect.left}px`
  box.style.width = `${Math.max(rect.width, 4)}px`
  box.style.height = `${Math.max(rect.height, 4)}px`
  if (label) label.textContent = path
}

export function hideOverlay() {
  if (overlay) overlay.style.display = 'none'
}

export function highlightPath(path: string) {
  let el: Element | null = document.querySelector(`[data-cms="${CSS.escape(path)}"]`)

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

  if (!el) return null
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  showOverlay(el, path)
  return el
}

export function highlightSection(sectionKey: string) {
  if (sectionKey.startsWith('collection:')) {
    const collection = sectionKey.slice('collection:'.length)
    const el = document.querySelector(
      `[data-cms-collection="${CSS.escape(collection)}"]`,
    )
    if (!el) return null
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    showOverlay(el, sectionKey)
    return el
  }

  const el = document.querySelector(`[data-cms-section="${CSS.escape(sectionKey)}"]`)
  if (!el) return null
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  showOverlay(el, sectionKey)
  return el
}
