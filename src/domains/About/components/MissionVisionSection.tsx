import { useContent, DEFAULT_ABOUT_MISSION } from "@/features/content";

export function MissionVisionSection() {
  const mission = useContent("about_mission", DEFAULT_ABOUT_MISSION);
  const items = mission.items?.length ? mission.items : DEFAULT_ABOUT_MISSION.items;

  return (
    <div
      data-cms-section="about_mission"
      className="w-full max-w-7xl mx-auto py-12 px-6 lg:px-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {items.map((item, index) => (
          <div
            key={item.id}
            data-cms={`about_mission.items.${index}`}
            data-cms-type="list-item"
            className="group relative bg-[#fcf9f4] dark:bg-zinc-900/50 p-10 md:p-14 border border-border/50 transition-all duration-300 hover:shadow-xl rounded-sm hover:-translate-y-1"
          >
            {/* Elegant Number */}
            <span className="absolute top-8 right-8 text-5xl lg:text-7xl font-['Brush_Script_MT',cursive,serif] text-primary/10 dark:text-zinc-700/50 group-hover:text-[#dfa83d]/20 transition-colors duration-500 select-none -rotate-6">
              {item.id}
            </span>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-serif text-primary dark:text-zinc-100 mb-6 relative z-10 leading-tight">
              {item.title}
            </h3>

            {/* Separator line */}
            <div className="w-12 h-[1px] bg-[#dfa83d]/50 mb-6 group-hover:w-24 transition-all duration-500" />

            {/* Description */}
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed relative z-10 font-medium max-w-sm">
              {item.description}
            </p>

            {/* Sutil decorativo esquinero */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-[#dfa83d]/30 transition-all duration-500 m-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
