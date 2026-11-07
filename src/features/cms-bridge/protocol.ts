/** Shared postMessage protocol between landing preview and CMS editor. Keep in sync with CMS copy. */
export const CMS_BRIDGE_VERSION = 1 as const

export type CmsFieldType = 'text' | 'textarea' | 'image' | 'video' | 'number' | 'list' | 'list-item'

export type CmsBridgeMessage =
  | { v: typeof CMS_BRIDGE_VERSION; type: 'ready' }
  | {
      v: typeof CMS_BRIDGE_VERSION
      type: 'select'
      path: string
      fieldType: CmsFieldType
      sectionKey: string
      rect: { top: number; left: number; width: number; height: number }
    }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'navigate'; path: string }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'content:replace'; content: Record<string, unknown> }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'select:path'; path: string }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'scroll:section'; sectionKey: string }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'ping' }
  | { v: typeof CMS_BRIDGE_VERSION; type: 'pong' }

export function isCmsBridgeMessage(data: unknown): data is CmsBridgeMessage {
  if (!data || typeof data !== 'object') return false
  const msg = data as { v?: unknown; type?: unknown }
  return msg.v === CMS_BRIDGE_VERSION && typeof msg.type === 'string'
}
