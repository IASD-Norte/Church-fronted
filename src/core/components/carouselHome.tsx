import { Button } from "react-day-picker";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { useContent, DEFAULT_HERO } from "@/features/content";

function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const v = url.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "").slice(0, 11);
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    const match = url.pathname.match(
      /\/(live|embed|shorts|v)\/([a-zA-Z0-9_-]{11})/,
    );
    if (match) return match[2];
  } catch {
    // ignore
  }
  const fallback = trimmed.match(/[a-zA-Z0-9_-]{11}/);
  return fallback ? fallback[0] : null;
}

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hero = useContent("home_hero", DEFAULT_HERO);

  const isLive = hero.mode === "live";
  const videoId =
    (isLive
      ? extractYouTubeId(hero.liveUrl) || hero.youtubeId
      : hero.youtubeId) || DEFAULT_HERO.youtubeId;

  useEffect(() => {
    if (isLive) return;

    const interval = setInterval(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "seekTo",
            args: [hero.startSeconds, true],
          }),
          "*",
        );
      }
    }, hero.loopDurationMs);

    return () => clearInterval(interval);
  }, [isLive, hero.startSeconds, hero.loopDurationMs]);

  const embedSrc = isLive
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&enablejsapi=1`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&start=${hero.startSeconds}&end=${hero.endSeconds}&enablejsapi=1`;

  const playHref =
    isLive && hero.liveUrl
      ? hero.liveUrl
      : hero.playUrl || `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <main
      data-cms-section="home_hero"
      className="w-full h-[40vh] md:h-fit lg:aspect-auto lg:min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 h-[45vh] lg:h-[120vh] pointer-events-none overflow-hidden bg-zinc-900">
        <iframe
          key={embedSrc}
          ref={iframeRef}
          data-cms="home_hero.youtubeId"
          data-cms-type="video"
          className="absolute top-1/2 left-1/2 w-[120vw] h-[56.25vw] lg:min-h-[100vh] lg:min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.25]"
          src={embedSrc}
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 grid min-h-[50vh] md:min-h-0 md:aspect-video lg:aspect-auto lg:min-h-screen grid-rows-[1fr_auto] pt-35 md:pt-10 lg:pt-35">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-end md:justify-between text-white gap-6 md:gap-0 px-6 md:px-10 lg:px-0 h-full pb-10 md:pb-0">
          <div className="w-full md:w-auto text-left mt-auto md:mt-0">
            {isLive ? (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                En vivo
              </span>
            ) : null}
            <div data-cms="home_hero.headline" data-cms-type="text">
              <TextGenerateEffect
                words={hero.headline}
                className="font-[Elgoc,ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] font-medium text-[rgb(249,245,240)] text-[55px] leading-[65px] md:text-[65px] md:leading-[75px] lg:text-[90px] lg:leading-[100px] text-left"
              />
            </div>
          </div>
          <Link target="_blank" to={playHref} className="self-end md:self-auto">
            <Button className="rounded-full border border-white text-white p-4 md:p-6 cursor-pointer hover:bg-white hover:text-black transition-colors duration-300">
              <Play className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
