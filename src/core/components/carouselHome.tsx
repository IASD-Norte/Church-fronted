import { Button } from "react-day-picker";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { useEffect, useRef } from "react";

const words = `Iglesia Adventista Norte Bucaramanga.`

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Definimos el tiempo de inicio y el ciclo de repetición
    // El video inicia en 7590s y queremos que termine en 7603s (13 segundos de duración)
    const loopDurationMs = 12900; // 12.9 segundos para evitar que alcance a mostrar controles de fin de video

    const interval = setInterval(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        // Volver a iniciar el segmento
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: "command",
          func: "seekTo",
          args: [7590, true]
        }), "*");
      }
    }, loopDurationMs);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full h-[40vh] md:h-fit lg:aspect-auto lg:min-h-screen overflow-hidden">
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 h-[45vh] lg:h-[120vh] pointer-events-none overflow-hidden bg-zinc-900">
        <iframe
          ref={iframeRef}
          className="absolute top-1/2 left-1/2 w-[120vw] h-[56.25vw] lg:min-h-[100vh] lg:min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.25]"
          src="https://www.youtube.com/embed/sr6t9YlsQ3I?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&start=7590&end=7603&enablejsapi=1"
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT GRID */}
      <div className="relative z-10 grid min-h-[50vh] md:min-h-0 md:aspect-video lg:aspect-auto lg:min-h-screen grid-rows-[1fr_auto] pt-35 md:pt-10 lg:pt-35">

        {/* TOP TEXT */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-end md:justify-between text-white gap-6 md:gap-0 px-6 md:px-10 lg:px-0 h-full pb-10 md:pb-0">
          <div className="w-full md:w-auto text-left mt-auto md:mt-0">
            <TextGenerateEffect
              words={words}
              className="font-[Elgoc,ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] font-medium text-[rgb(249,245,240)] text-[55px] leading-[65px] md:text-[65px] md:leading-[75px] lg:text-[90px] lg:leading-[100px] text-left"
            />
          </div>
          <Link
            target="_blank"
            to="https://www.youtube.com/watch?v=sr6t9YlsQ3I&t=7601s"
            className="self-end md:self-auto"
          >
            <Button
              className="rounded-full border border-white text-white p-4 md:p-6 cursor-pointer hover:bg-white hover:text-black transition-colors duration-300"
            >
              <Play className="w-6 h-6" />
            </Button>
          </Link>
        </div>




      </div>
    </main>
  );
}