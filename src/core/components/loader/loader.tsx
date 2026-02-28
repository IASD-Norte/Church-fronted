import { useEffect, useState } from "react"

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Simula carga inicial (puedes ajustar tiempo)
    const timer = setTimeout(() => {
      setVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        
        {/* Logo / Imagen */}
        <img
          src="/logo-remove.png"
          alt="Logo"
          className="w-24 h-24 object-contain"
        />

        {/* Texto */}
        <span className="text-sm text-black/80 animate-pulse">
          Cargando...
        </span>
      </div>
    </div>
  )
}
