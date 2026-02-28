"use client";

export default function WorldMapChurch() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6">
        {/* Google Map */}
        <div className="relative w-full h-[320px] md:h-[520px] rounded-2xl overflow-hidden border border-border dark:border-white/10 bg-card dark:bg-neutral-900 shadow-lg">
          <iframe
            title="Iglesia Adventista Norte de Bucaramanga"
            src="https://www.google.com/maps?q=7.139538,-73.127435&z=16&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Label flotante */}
          <div className="absolute bottom-6 left-15 max-w-sm rounded-xl border border-border dark:border-white/10 bg-card/95 dark:bg-black/80 backdrop-blur px-4 py-3 shadow-lg">
            <h3 className="font-semibold text-foreground dark:text-white">
              Iglesia Adventista del Séptimo Día
            </h3>
            <p className="text-sm text-muted-foreground">
              Norte de Bucaramanga
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
