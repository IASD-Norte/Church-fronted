import { useEffect } from "react"
import { gsap, ScrollTrigger } from "@/shared/lib/gsap" 

type Options = {
  panelSelector?: string
  pinSelector?: string
  snapDuration?: number
  snapEase?: string
  markers?: boolean
  disableOnMobile?: boolean
  endTrigger?: string
}

export function useScrollHomeTrigger({
  panelSelector = ".panel",
  pinSelector,
  snapDuration = 0.6,
  snapEase = "power2.out",
  markers = false,
  disableOnMobile = true,
  endTrigger,
}: Options = {}) {
  useEffect(() => {
    if (disableOnMobile && window.matchMedia("(max-width:640px)").matches) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(panelSelector)
      if (!panels.length) return

      // Asegurar altura mínima
      panels.forEach((p) => {
        if (!p.style.minHeight) p.style.minHeight = "100vh"
      })

      // 👇 EFECTO DE FADE OUT como en el CodePen
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
          pin: true,
          pinSpacing: false,
          markers,
        })

        // Fade out cuando el siguiente panel entra (excepto el último)
        if (i < panels.length - 1) {
          gsap.to(panel, {
            scrollTrigger: {
              trigger: panels[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
              markers,
            },
            opacity: 1,
            ease: "none",
          })
        }
      })

      // Crear ScrollTriggers para snap
     

      
      // 👇 SNAP INICIAL: Forzar scroll al inicio en carga
      ScrollTrigger.addEventListener("refresh", () => {
        // Si estamos cerca del principio, forzar scroll a 0
        if (window.scrollY < window.innerHeight * 0.5) {
          window.scrollTo(0, 0)
        }
      })
      
      // Snap inicial al cargar la página
      gsap.delayedCall(0.1, () => {
        if (window.scrollY < window.innerHeight * 0.5) {
          gsap.to(window, {
            scrollTo: 0,
            duration: 0.3,
            ease: "power2.out"
          })
        }
      })

      // Pin opcional adicional
      if (pinSelector) {
        ScrollTrigger.create({
          trigger: pinSelector,
          start: "top top",
          end: "+=20px",
          pin: true,
          pinSpacing: false,
          markers,
        })
      }

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener("resize", onResize)

      return () => {
        window.removeEventListener("resize", onResize)
      }
    })

    return () => {
      ctx.revert()
    }
  }, [panelSelector, pinSelector, snapDuration, snapEase, markers, disableOnMobile, endTrigger])
}