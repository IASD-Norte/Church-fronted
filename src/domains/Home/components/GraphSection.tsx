import GraphHome from "@/core/components/graphsHome";
import { HOME_SECTION_IDS } from "../constants/homeConfig";

export function GraphSection() {
  return (
    <section
      id={HOME_SECTION_IDS.GRAPHS}
      className="panel w-full min-h-screen"
    >
      <GraphHome />
    </section>
  );
}

