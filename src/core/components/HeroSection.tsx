import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/shared/lib/gsap";


interface HeroSectionProps {
  titulo1: string;
  titulo2: string;
  video?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonClassName?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  titulo1,
  titulo2,
  buttonText = "Contactanos",
  buttonHref = "/contact",
  buttonClassName = "",
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      text1Ref.current,
      { opacity: 0, yPercent: 50 },
      { opacity: 1, yPercent: 20, duration: 1, ease: "power3.out" }
    );

    tl.to(text1Ref.current, {
      opacity: 0,
      yPercent: -20,
      duration: 1,
      delay: 0.3,
      ease: "power2.inOut",
    });

    tl.fromTo(
      text2Ref.current,
      { opacity: 0, yPercent: 20 },
      { opacity: 1, yPercent: 0, duration: 1, ease: "power3.out" },
      "<"
    );

    tl.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        scale: 0.8,
        yPercent: 20,
        pointerEvents: "none",
        zIndex: 20,
      },
      {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 1,
        ease: "back.out(1.7)",
        pointerEvents: "auto",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Use the provided youtube video ID or default to the user's requested video
  const youtubeUrl = "https://www.youtube.com/embed/LenghWYt7Yc?autoplay=1&mute=1&loop=1&playlist=LenghWYt7Yc&controls=0&rel=0&start=19&end=60";

  return (
    <section
      ref={heroRef}
      className="relative z-0 w-full h-[100vh] flex items-center justify-center bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.15] opacity-60"
          src={youtubeUrl}
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]" />

      <div className="hero__content relative z-10 text-center flex flex-col items-center justify-center space-y-8 p-6 max-w-6xl mx-auto">
        <h1
          ref={text1Ref}
          className="text-5xl md:text-6xl lg:text-[80px] font-serif text-[#fcf9f4] leading-[1.1] tracking-tight drop-shadow-2xl"
        >
          {titulo1}
        </h1>
        <h2
          ref={text2Ref}
          className="text-xs md:text-sm lg:text-base tracking-[0.25em] uppercase font-semibold text-[#fcf9f4]/80 opacity-0 px-4 max-w-4xl leading-relaxed"
        >
          {titulo2}
        </h2>

        {buttonText && (
          <a
            href={buttonHref}
            ref={buttonRef}
            className={`group mt-10 flex items-center justify-center gap-4 px-8 py-4 border border-[#fcf9f4]/40 text-[#fcf9f4] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#fcf9f4] hover:text-black transition-all duration-300 relative z-20 pointer-events-auto opacity-0 ${buttonClassName}`}
          >
            {buttonText} <span className="text-xl font-light transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
