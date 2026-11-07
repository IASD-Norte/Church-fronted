import Home from "@/core/components/carouselHome";
import { HOME_SECTION_IDS } from "../constants/homeConfig";

export function CarouselSection() {
  return (
    <section
      id={HOME_SECTION_IDS.CAROUSEL}
      className="panel hidden md:block lg:flex w-full justify-center bg-background md:p-0 lg:p-20 md:!min-h-0 md:!h-fit lg:!min-h-[100vh] lg:!h-auto"
    >
      <Home />
    </section>
  );
}

