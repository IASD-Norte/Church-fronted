import { useContent, DEFAULT_HOME_CTA } from "@/features/content";
import { HOME_SECTION_IDS } from "../constants/homeConfig";

export function CallToActionSection() {
  const cta = useContent("home_cta", DEFAULT_HOME_CTA);

  return (
    <section
      id={HOME_SECTION_IDS.CALL_TO_ACTION}
      data-cms-section="home_cta"
      className="bg-background panel flex items-center justify-center w-full h-[130vh] text-foreground text-center px-7"
    >
      <h2
        data-cms="home_cta.headline"
        data-cms-type="text"
        className="text-[3rem] md:text-[4rem] lg:text-[5rem] leading-tight md:leading-tight lg:leading-tight font-serif text-primary"
      >
        {cta.headline}
      </h2>
    </section>
  );
}
