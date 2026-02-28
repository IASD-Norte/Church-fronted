import { Button } from "react-day-picker";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const words = `Iglesia Adventista Norte Bucaramanga.`

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-hidden">
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.15]"
          src="https://www.youtube.com/embed/sr6t9YlsQ3I?autoplay=1&mute=1&loop=1&playlist=sr6t9YlsQ3I&controls=0&rel=0&start=7601&end=7661"
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT GRID */}
      <div className="relative z-10 grid min-h-screen grid-rows-[1fr_auto] pt-35">

        {/* TOP TEXT */}
        <div className="flex items-center justify-between text-white">
          <TextGenerateEffect
            words={words}
            className="font-[Elgoc,ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] font-medium text-[rgb(249,245,240)] text-[90px] leading-[100px]"
          />
          <Link target="_blank" to="https://www.youtube.com/watch?v=sr6t9YlsQ3I&t=7601s">
            <Button
              className="rounded-full border border-white text-white p-6 cursor-pointer hover:bg-white hover:text-black transition-colors duration-300"
            >
              <Play className="w-6 h-6" />
            </Button>
          </Link>
        </div>




      </div>
    </main>
  );
}