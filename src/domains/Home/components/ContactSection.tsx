import Contact from "@/core/components/contact";
import { HOME_SECTION_IDS } from "../constants/homeConfig";

export function ContactSection() {
  return (
    <section
      id={HOME_SECTION_IDS.CONTACT}
      className="w-full z-10 min-h-screen flex items-center justify-center bg-background"
    >
      <Contact />
    </section>
  );
}

