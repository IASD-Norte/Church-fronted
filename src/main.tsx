import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './shared/hooks/i18n.js'
import App from './App.tsx'
import Loader from "@/core/components/loader/loader"
import { loadContent } from '@/features/content'

void loadContent()

const isCmsPreview =
  new URLSearchParams(window.location.search).has('cms-preview') &&
  window.parent !== window

if (isCmsPreview) {
  void import('./features/cms-bridge')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loader/>}>
      <App />
    </Suspense>
  </StrictMode>,
)
