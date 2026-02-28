'use client'

import { useState } from "react"
import { cn } from "@/shared/lib/utils"
import {
  CHURCH_BELIEFS,
  BELIEFS_SECTION_TEXTS,
  BELIEF_SECTION_IDS
} from "../constants/aboutConfig"

const CARDS_PER_PAGE = 8

export function BeliefsSection() {
  const [page, setPage] = useState(0)

  const start = page * CARDS_PER_PAGE
  const end = start + CARDS_PER_PAGE
  const visibleCards = CHURCH_BELIEFS.slice(start, end)

  const totalPages = Math.ceil(CHURCH_BELIEFS.length / CARDS_PER_PAGE)

  return (
    <section
      id={BELIEF_SECTION_IDS.CONTENT}
      className={cn(
        "w-full py-20 bg-background"
      )}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-6 lg:px-16 text-center lg:text-left items-center lg:items-start lg:justify-between mb-16">
        <div className="flex flex-col gap-6 w-full lg:w-auto items-center lg:items-start">
          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-[56px] font-serif",
              "text-primary dark:text-zinc-100 tracking-tight leading-tight"
            )}
          >
            {BELIEFS_SECTION_TEXTS.SECTION_TITLE}
          </h2>
          <div className="w-24 h-[1px] bg-[#dfa83d] rounded-full" />
        </div>

        <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed mt-2">
          {BELIEFS_SECTION_TEXTS.SECTION_SUBTITLE}
        </p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCards.map((card, i) => (
            <div
              key={i}
              className="group relative bg-[#fcf9f4] dark:bg-zinc-900 border border-border/50 overflow-hidden cursor-pointer w-full h-[400px] rounded-sm shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Imagen */}
              <div className="w-full h-[55%] overflow-hidden relative border-b border-border/50">
                <img
                  src={card.img}
                  alt={card.TITLE}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Contenido (Text) */}
              <div className="w-full h-[45%] p-6 flex flex-col justify-start bg-transparent transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="text-xl md:text-2xl font-serif text-primary dark:text-zinc-100 leading-tight mb-3 group-hover:text-[#dfa83d] transition-colors">
                  {card.TITLE}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {card.DESCRIPTION}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-16 pb-12">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            disabled={page === 0}
            className={cn(
              "px-8 py-3 border text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300",
              page === 0
                ? "border-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "border-primary/40 text-primary dark:text-zinc-300 dark:border-zinc-700 hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
            )}
          >
            Anterior
          </button>

          <span className="text-xs font-bold tracking-widest text-[#dfa83d]">
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className={cn(
              "px-8 py-3 border text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300",
              page === totalPages - 1
                ? "border-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "border-primary/40 text-primary dark:text-zinc-300 dark:border-zinc-700 hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
            )}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  )
}
