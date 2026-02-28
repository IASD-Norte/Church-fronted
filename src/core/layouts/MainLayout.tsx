import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { NavigationMenuDemo } from "@/core/components/menu-navegation"
import Footer from "@/core/components/footer/footer"
import Loader from "@/core/components/loader/loader"
import { ScrollToTop } from "@/core/components/ScrolltoTop"
import FloatingWhatsapp from "@/core/components/ui/FloatingWhatsapp"

export default function MainLayout() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen scroll-smooth relative">
      <ScrollToTop />

      <NavigationMenuDemo />

      <main>
        <Outlet />
      </main>

      <Footer />
      <FloatingWhatsapp />

      {isLoading && <Loader />}
    </div>
  )
}
