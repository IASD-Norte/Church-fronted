import Home from "@/core/components/carouselHome";
import { HOME_SECTION_IDS } from "../constants/homeConfig";

export function CarouselSection() {
  return (
    <section
      id={HOME_SECTION_IDS.CAROUSEL}
      className="panel flex w-full justify-center bg-background p-20"
    >
      <Home />
    </section>
  );
}

