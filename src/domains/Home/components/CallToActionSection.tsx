import { HOME_SECTION_IDS, HOME_TEXTS } from "../constants/homeConfig";

export function CallToActionSection() {
  return (
    <section
      id={HOME_SECTION_IDS.CALL_TO_ACTION}
      className="bg-background panel flex items-center justify-center w-full h-[130vh] text-foreground text-center px-7"
    >
      <h2 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-serif text-primary">
        {HOME_TEXTS.CALL_TO_ACTION}
      </h2>
    </section>
  );
}

