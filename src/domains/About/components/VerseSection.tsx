import type { ElementRef } from "react";
import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

export const VerseSection = forwardRef<ElementRef<"section">, React.HTMLAttributes<HTMLElement>>(
    ({ className, ...props }, ref) => {
        return (
            <section
                ref={ref}
                id="versiculo"
                className={cn(
                    "w-full bg-black dark:bg-gray-300 py-14 md:py-22 flex flex-col items-center justify-center px-6 my-10",
                    className
                )}
                {...props}
            >
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-10">

                    {/* Decorative Line */}
                    <div className="w-12 h-[2px] bg-[#fcf9f4]/30 dark:bg-zinc-700 mx-auto" />

                    {/* Verse Text */}
                    <blockquote className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#fcf9f4] dark:text-black leading-snug lg:leading-tight">
                        "Todo el cuerpo, bien concertado y unido entre sí por todas las coyunturas que se ayudan mutuamente, según la actividad propia de cada miembro, recibe su crecimiento para ir edificándose en amor."
                    </blockquote>

                    {/* Verse Reference */}
                    <div className="flex flex-col items-center gap-4 pt-6">
                        <span className="text-[#fcf9f4]/80 dark:text-zinc-400 text-sm font-semibold tracking-[0.2em] uppercase">
                            1 Corintios 12:27 / Efesios 4:16
                        </span>
                    </div>

                </div>
            </section>
        );
    }
);

VerseSection.displayName = "VerseSection";
