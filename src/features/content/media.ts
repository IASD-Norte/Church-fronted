const API_URL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL ?? 'http://localhost:3000')

/** Las imágenes subidas desde el CMS (/uploads/...) las sirve la API, no el sitio. */
export function resolveMediaUrl(url?: string | null) {
  if (!url) return ''
  if (url.startsWith('/uploads/')) return `${API_URL.replace(/\/$/, '')}${url}`
  return url
}
