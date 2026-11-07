import { lazy } from "react";
import { useContent, DEFAULT_HOME_HERO_CONTACT } from "@/features/content";

const HeroSection = lazy(() => import("@/core/components/HeroSection"));

export function HeroContactSection() {
  const hero = useContent("home_hero_contact", DEFAULT_HOME_HERO_CONTACT);

  return (
    <HeroSection
      titulo1={hero.title1}
      titulo2={hero.title2}
      buttonText={hero.buttonText}
      buttonHref={hero.buttonHref}
      youtubeId={hero.youtubeId}
      startSeconds={hero.startSeconds}
      endSeconds={hero.endSeconds}
    />
  );
}
