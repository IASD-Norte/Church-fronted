import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Loader from "@/core/components/loader/loader"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loader/>}>
      <App />
    </Suspense>
  </StrictMode>,
)