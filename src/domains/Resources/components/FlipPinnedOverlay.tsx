import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface FlipPinnedOverlayProps {
  children: ReactNode;
  headerOffsetPx?: number;
  flipEase?: string;
  scrub?: number;
  winStart?: number;
  winEnd?: number;
  forwardTrigger?: number;
  backwardTrigger?: number;
  autoScrollDuration?: number;
}

/**
 * Componente de overlay con efecto flip 3D
 * Crea una transición animada entre dos secciones con scroll pinning
 */
export function FlipPinnedOverlay({
  children,
  headerOffsetPx = 0,
  flipEase = "expo.inOut",
  scrub = 0.35,
  winStart = 0.08,
  winEnd = 0.92,
  forwardTrigger = 0.2,
  backwardTrigger = 0.8,
  autoScrollDuration = 0.5,
}: FlipPinnedOverlayProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const homeLayerRef = useRef<HTMLDivElement | null>(null);
  const aboutLayerRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  const [homeChild, aboutChild] = React.Children.toArray(children);

  // Detectar mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Mobile: sin efecto

    const root = rootRef.current;
    const homeLayer = homeLayerRef.current;
    const aboutLayer = aboutLayerRef.current;
    if (!root || !homeLayer || !aboutLayer) return;

    const homeText = homeLayer.querySelector<HTMLElement>('[data-card="home-text"]');
    const homeMedia = homeLayer.querySelector<HTMLElement>('[data-card="home-media"]');
    const aboutText = aboutLayer.querySelector<HTMLElement>('[data-card="about-text"]');
    const aboutMed = aboutLayer.querySelector<HTMLElement>('[data-card="about-media"]');
    const aboutTitle = aboutLayer.querySelector<HTMLElement>('[data-title="about"]');

    if (!homeText || !homeMedia || !aboutText || !aboutMed || !aboutTitle) {
      console.warn("FlipPinnedOverlay: faltan data-* en Home o AboutUs.");
      return;
    }

    const all = [homeText, homeMedia, aboutText, aboutMed, aboutTitle];

    // Preparación 3D
    gsap.set([homeLayer, aboutLayer], { perspective: 1200 });
    gsap.set(all, {
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      transformOrigin: "50% 50%",
      willChange: "transform, opacity",
      force3D: true,
    });

    [...homeLayer.querySelectorAll("iframe"), ...aboutLayer.querySelectorAll("iframe")].forEach(el =>
      gsap.set(el, { backfaceVisibility: "hidden", transform: "translateZ(0.001px)" })
    );

    // Estado inicial
    gsap.set([homeText, homeMedia], { rotateY: 0, opacity: 1 });
    gsap.set([aboutText, aboutMed], { rotateY: -180, opacity: 0 });
    gsap.set(aboutTitle, { y: -24, opacity: 0 });
    gsap.set(homeLayer, { opacity: 1, pointerEvents: "auto" });
    gsap.set(aboutLayer, { opacity: 0, pointerEvents: "none" });

    const ease = gsap.parseEase(flipEase);
    const clamp01 = gsap.utils.clamp(0, 1);

    let currentSection: "home" | "about" = "home";
    let isAutoScrolling = false;

    const st = ScrollTrigger.create({
      trigger: root,
      start: headerOffsetPx ? `${headerOffsetPx}px top` : "top top",
      end: "+=100%",
      scrub,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const p = self.progress;
        const dir = self.direction;

        const t = clamp01((p - winStart) / (winEnd - winStart));
        const s = ease(t);
        const inv = 1 - s;

        // Flip cruzado
        gsap.set(homeText, { rotateY: 180 * s, opacity: 1 - s });
        gsap.set(homeMedia, { rotateY: 180 * s, opacity: 1 - s });
        gsap.set(aboutText, { rotateY: -180 * inv, opacity: s });
        gsap.set(aboutMed, { rotateY: -180 * inv, opacity: s });

        // Título baja desde arriba
        gsap.set(aboutTitle, { y: -24 * inv, opacity: s });

        // Fundido de capas
        gsap.set(homeLayer, { opacity: 1 - s });
        gsap.set(aboutLayer, { opacity: s });

        // Normalizar extremos
        if (p <= 0.001) {
          currentSection = "home";
          gsap.set([homeText, homeMedia], { rotateY: 0, opacity: 1 });
          gsap.set([aboutText, aboutMed], { rotateY: -180, opacity: 0 });
          gsap.set(aboutTitle, { y: -24, opacity: 0 });
          gsap.set(homeLayer, { opacity: 1, pointerEvents: "auto" });
          gsap.set(aboutLayer, { opacity: 0, pointerEvents: "none" });
        } else if (p >= 0.999) {
          currentSection = "about";
          gsap.set([homeText, homeMedia], { rotateY: 180, opacity: 0 });
          gsap.set([aboutText, aboutMed], { rotateY: 0, opacity: 1 });
          gsap.set(aboutTitle, { y: 0, opacity: 1 });
          gsap.set(homeLayer, { opacity: 0, pointerEvents: "none" });
          gsap.set(aboutLayer, { opacity: 1, pointerEvents: "auto" });
        }

        // Empuje automático
        if (!isAutoScrolling) {
          if (dir === 1 && currentSection === "home" && p >= forwardTrigger) {
            isAutoScrolling = true;
            currentSection = "about";
            gsap.to(window, {
              duration: autoScrollDuration,
              ease: "power2.out",
              scrollTo: self.end,
              onComplete: () => { isAutoScrolling = false; }
            });
          }

          if (dir === -1 && currentSection === "about" && p <= backwardTrigger) {
            isAutoScrolling = true;
            currentSection = "home";
            gsap.to(window, {
              duration: autoScrollDuration,
              ease: "power2.out",
              scrollTo: self.start,
              onComplete: () => { isAutoScrolling = false; }
            });
          }
        }
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile, headerOffsetPx, flipEase, scrub, winStart, winEnd, forwardTrigger, backwardTrigger, autoScrollDuration]);

  if (isMobile) {
    return (
      <section id="flip-overlay" className="bg-white">
        {homeChild}
        {aboutChild}
      </section>
    );
  }

  return (
    <section
      id="flip-overlay"
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-white"
    >
      <div ref={homeLayerRef} className="absolute inset-0 z-10 will-change-transform">
        {homeChild}
      </div>
      <div ref={aboutLayerRef} className="absolute inset-0 z-20 will-change-transform">
        {aboutChild}
      </div>
    </section>
  );
}
