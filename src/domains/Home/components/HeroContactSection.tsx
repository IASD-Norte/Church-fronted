import { lazy } from "react";
import { HOME_MEDIA, HOME_TEXTS } from "../constants/homeConfig";

const HeroSection = lazy(() => import("@/core/components/HeroSection"));

export function HeroContactSection() {
  return (
    <HeroSection
      titulo1={HOME_TEXTS.HERO_TITLE_1}
      titulo2={HOME_TEXTS.HERO_TITLE_2}
      video={HOME_MEDIA.VIDEO_PATH}
      buttonText="Contactanos"
      buttonHref="#/contact"
    />
  );
}

