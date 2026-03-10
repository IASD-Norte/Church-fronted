import { gsap, ScrollTrigger } from "@/shared/lib/gsap";

let lastScroll = window.scrollY;

type Opts = {
  duration?: number;
  panelSelector?: string;
  debug?: boolean;
  align?: "start" | "center" | "end"; // donde posicionar el panel
  offset?: number; // px extra (positivo -> baja más, negativo -> sube más)
  snapComp?: number; // factor para compensar al subir (0..1), default 0.12
};

export default function scrollToSection(
  id: string,
  opts: Opts = {}
) {
  const {
    duration = 1.2,
    panelSelector = ".panel",
    debug = false,
    align = "start",
    offset = 0,
    snapComp = 0.12,
  } = opts;

  const target = document.getElementById(id);
  if (!target) {
    if (debug) console.warn("scrollToSection: target no encontrado:", id);
    return;
  }

  const panels = Array.from(document.querySelectorAll<HTMLElement>(panelSelector));
  const headerHeight = document.querySelector("header")?.getBoundingClientRect().height || 0;
  const goingDown = window.scrollY >= lastScroll;
  lastScroll = window.scrollY;

  let y: number | null = null;
  const index = panels.findIndex((p) => p.id === id || p === target);

  // Helper para centrar/alinear según tamaño real del panel
  const computeAlignmentOffset = (panelHeight: number) => {
    switch (align) {
      case "center":
        return Math.round((window.innerHeight - panelHeight) / 2);
      case "end":
        return Math.round(window.innerHeight - panelHeight);
      case "start":
      default:
        return 0;
    }
  };

  if (panels.length && index >= 0) {
    const container = panels[0].parentElement ?? panels[0];

    // Intentamos encontrar un ScrollTrigger que pinée el container (o un ancestro)
    let st =
      ScrollTrigger.getAll().find(
        (s) =>
          s.pin &&
          (container.contains(s.trigger as HTMLElement) || (s.trigger as HTMLElement)?.contains(container))
      ) || null;

    if (!st) {
      if (debug) console.log("scrollToSection: no encontró ScrollTrigger, forzando refresh()");
      ScrollTrigger.refresh();
      st =
        ScrollTrigger.getAll().find(
          (s) =>
            s.pin &&
            (container.contains(s.trigger as HTMLElement) || (s.trigger as HTMLElement)?.contains(container))
        ) || null;
    }

    const panelHeight = target.getBoundingClientRect().height || window.innerHeight;
    const alignOffset = computeAlignmentOffset(panelHeight);

    if (st && typeof st.start === "number" && typeof st.end === "number" && st.end > st.start) {
      const total = st.end - st.start;
      const progressForIndex = panels.length > 1 ? index / (panels.length - 1) : 0;

      // compensación al subir (multiplica por snapComp, escalable)
      const adjust = goingDown ? 0 : Math.round(total * snapComp);

      // base: posición de scroll donde ese panel aparece en top (según trigger)
      const base = Math.round(st.start + total * progressForIndex);

      // aplicamos alineación, header y compensación, más offset manual
      y = Math.round(base - headerHeight - alignOffset - adjust + offset);

      if (debug) console.log("Usando ScrollTrigger pin:", { index, start: st.start, end: st.end, total, base, panelHeight, alignOffset, adjust, y });
    } else {
      // fallback: usar posiciones de DOM (menos preciso cuando hay pin)
      const containerTopDoc = container.getBoundingClientRect().top + window.scrollY;
      const targetTopDoc = target.getBoundingClientRect().top + window.scrollY;
      const distanceFromContainer = targetTopDoc - containerTopDoc;
      const base = Math.round(containerTopDoc + distanceFromContainer);

      const panelHeightFallback = target.getBoundingClientRect().height || window.innerHeight;
      const alignOffsetFallback = computeAlignmentOffset(panelHeightFallback);

      y = Math.round(base - headerHeight - alignOffsetFallback + offset);
      if (debug) console.log("Fallback doc:", { containerTopDoc, targetTopDoc, distanceFromContainer, base, alignOffsetFallback, y });
    }
  } else {
    // objetivo fuera de panels: posicion normal con alineación opcional
    const targetTopDoc = target.getBoundingClientRect().top + window.scrollY;
    const panelHeightNormal = target.getBoundingClientRect().height || window.innerHeight;
    const alignOffsetNormal = computeAlignmentOffset(panelHeightNormal);
    y = Math.round(targetTopDoc - headerHeight - alignOffsetNormal + offset);
    if (debug) console.log("Fallback normal elemento ->", { targetTopDoc, alignOffsetNormal, y });
  }

  if (y === null) return;

  // Clamp para no pasarnos del max scroll
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  y = Math.max(0, Math.min(y, maxScroll));

  if (debug) console.log("scrollToSection animando a y:", y);

  gsap.to(window, {
    duration,
    scrollTo: { y, autoKill: true },
    ease: "power2.inOut",
    onComplete: () => {
      lastScroll = y as number;
      if (debug) console.log("scrollToSection complete. lastScroll =", lastScroll);
    },
  });
}
