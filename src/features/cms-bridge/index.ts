import { setContent } from '@/features/content'
import {
  CMS_BRIDGE_VERSION,
  isCmsBridgeMessage,
  type CmsBridgeMessage,
  type CmsFieldType,
} from './protocol'
import { hideOverlay, highlightPath, highlightSection, showOverlay } from './overlay'

const CMS_ORIGIN = import.meta.env.VITE_CMS_ORIGIN as string | undefined

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
  const target = cmsTargetFrom(event)
  if (!target) {
    hideOverlay()
    return
  }
  const path = pathFromTarget(target)
  if (!path) return
  showOverlay(target, path)
}

function onClick(event: MouseEvent) {
  const target = cmsTargetFrom(event)
  if (!target) return

  event.preventDefault()
  event.stopPropagation()

  const path = pathFromTarget(target)
  if (!path) return

  const rect = target.getBoundingClientRect()
  post({
    v: CMS_BRIDGE_VERSION,
    type: 'select',
    path,
    fieldType: fieldTypeFrom(target),
    sectionKey: sectionKeyFromTarget(target),
    rect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    },
  })
  showOverlay(target, path)
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
      highlightPath(msg.path)
      break
    case 'scroll:section':
      highlightSection(msg.sectionKey)
      break
    case 'ping':
      post({ v: CMS_BRIDGE_VERSION, type: 'pong' })
      break
    default:
      break
  }
}

function reportHash() {
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
  document.addEventListener('mousemove', onMouseMove, true)
  document.addEventListener('click', onClick, true)
  window.addEventListener('message', onMessage)
  window.addEventListener('hashchange', reportHash)

  post({ v: CMS_BRIDGE_VERSION, type: 'ready' })
  reportHash()
}

boot()

export {}
