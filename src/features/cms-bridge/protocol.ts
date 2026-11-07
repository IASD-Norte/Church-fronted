/** Shared postMessage protocol between landing preview and CMS editor. Keep in sync with CMS copy. */
export const CMS_BRIDGE_VERSION = 1 as const

export type CmsFieldType = 'text' | 'textarea' | 'image' | 'video' | 'number' | 'list' | 'list-item'

export type CmsRect = { top: number; left: number; width: number; height: number }

export type CmsBridgeMessage =
  | { v: typeof CMS_BRIDGE_VERSION; type: 'ready' }
  | {
      v: typeof CMS_BRIDGE_VERSION
      type: 'select'
      path: string
      fieldType: CmsFieldType
      sectionKey: string
      rect: CmsRect
    }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'navigate'; path: string }
  /** CMS → landing: ir a otra página sin recargar el iframe (p. ej. "/eventos"). */
  | { v: typeof CMS_BRIDGE_VERSION; type: 'navigate:to'; path: string }
  /** Landing → CMS: posición actual del elemento seleccionado (null si salió de vista). */
  | { v: typeof CMS_BRIDGE_VERSION; type: 'selection:rect'; rect: CmsRect | null }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'content:replace'; content: Record<string, unknown> }
  /** `label`: nombre legible para la etiqueta del overlay (opcional). */
  | { v: typeof CMS_BRIDGE_VERSION; type: 'select:path'; path: string; label?: string }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'scroll:section'; sectionKey: string; label?: string }
  /** Ambos sentidos: quitar la selección (CMS → landing por la X; landing → CMS por Esc en el iframe). */
  | { v: typeof CMS_BRIDGE_VERSION; type: 'select:clear' }
  /** CMS → landing: nombres legibles por sectionKey (o colección) para la etiqueta del overlay. */
  | { v: typeof CMS_BRIDGE_VERSION; type: 'labels:set'; labels: Record<string, string> }
  /** CMS → landing: activar/desactivar hover y clic de selección. */
  | { v: typeof CMS_BRIDGE_VERSION; type: 'inspect:set'; enabled: boolean }
  /** CMS → landing: una colección cambió en la API (p. ej. eventos); el landing debe recargarla. */
  | { v: typeof CMS_BRIDGE_VERSION; type: 'collection:refresh'; collection: string }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'ping' }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'pong' }

export function isCmsBridgeMessage(data: unknown): data is CmsBridgeMessage {
  if (!data || typeof data !== 'object') return false
  const msg = data as { v?: unknown; type?: unknown }
  return msg.v === CMS_BRIDGE_VERSION && typeof msg.type === 'string'
}
