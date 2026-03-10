"use client";

import { Card, CardContent } from "@/core/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/core/components/ui/carousel";
import { CountdownTimer } from "@/core/components/ui/countdown-timer";
import { cn } from "@/shared/lib/utils";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Evento {
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  lugar?: string;
}

interface CarouselOrientationProps {
  eventos: Evento[];
  itemHeight?: string;
}

export function CarouselOrientation({
  eventos,
  itemHeight = "400px",
}: CarouselOrientationProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const carouselContainer = useRef<HTMLDivElement>(null);
  const [emblaApi, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  // Detectar orientación según el tamaño de pantalla
  useEffect(() => {
    const checkOrientation = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOrientation("vertical");
      } else {
        setOrientation("horizontal");
      }
    };

    checkOrientation(); // Ejecutar al montar
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Manejo del scroll con rueda del mouse (solo en vertical)
  useEffect(() => {
    const container = carouselContainer.current;
    if (!container || !emblaApi || orientation !== "vertical") return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [emblaApi, orientation]);

  return (
    <Carousel
      plugins={[autoplayPlugin.current]}
      opts={{ align: "start", loop: true }}
      orientation={orientation}
      className="w-full max-w-4xl overflow-hidden"
      setApi={(api) => setEmbla(api ?? null)}
    >
      <div ref={carouselContainer}>
        <CarouselContent
          className={cn(
            "space-y-4",
            orientation === "horizontal" ? "space-y-0 space-x-4" : "space-y-4"
          )}
          style={{
            ...(orientation === "vertical" && { height: itemHeight }),
            ...(orientation === "horizontal" && { height: "auto" }),
          }}
        >
          {eventos.map((evento, index) => (
            <CarouselItem
              key={index}
              className={cn(
                orientation === "vertical" ? "pt-4 md:basis-full" : "basis-full sm:basis-1/2 lg:basis-1/3"
              )}
            >
              <div
                className={cn(
                  "relative p-1 h-full overflow-hidden rounded-2xl",
                  "group cursor-pointer transition-all duration-300",
                  "hover:shadow-2xl"
                )}
                style={{ height: orientation === "vertical" ? "320px" : "auto" }}
              >
                {/* Imagen de fondo */}
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center",
                    "transition-transform duration-700 ease-out",
                    "group-hover:scale-110"
                  )}
                  style={{ backgroundImage: `url(${evento.imagen})` }}
                />

                {/* Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-black/60 backdrop-blur-[1px]",
                    "dark:bg-linear-to-t dark:from-background/65 dark:via-background/20 dark:to-background/80"
                  )}
                />


                {/* Contenido */}
                <Card className="relative z-10 bg-transparent border-none shadow-none h-full">
                  <CardContent className="flex flex-col justify-between h-full p-6 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-5 h-5 text-primary mt-1 shrink-0" />
                        <h3 className="font-bold text-2xl md:text-3xl text-white leading-tight tracking-tight line-clamp-2">
                          {evento.titulo}
                        </h3>
                      </div>

                      <p className="text-sm text-white line-clamp-2 leading-relaxed">
                        {evento.descripcion}
                      </p>

                      {evento.lugar && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{evento.lugar}</span>
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <CountdownTimer
                        targetDate={evento.fecha}
                        variant="compact"
                        className="scale-90 origin-left"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      {/* Mostrar botones solo en horizontal (móvil/tablet) */}
      {orientation === "horizontal" && (
        <>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </>
      )}

      {/* En vertical, ocultar botones en móvil, mostrar en lg+ si quieres */}
      {orientation === "vertical" && (
        <>
          <CarouselPrevious className="hidden lg:flex -top-12 left-1/2 -translate-x-1/2" />
          <CarouselNext className="hidden lg:flex -bottom-12 left-1/2 -translate-x-1/2" />
        </>
      )}
    </Carousel>
  );
}