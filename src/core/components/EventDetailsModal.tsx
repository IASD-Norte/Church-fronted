import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Check,
  Clock,
  Download,
  MapPin,
  Share2,
  X,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  addToAppleCalendar,
  addToGoogleCalendar,
} from "@/domains/events/utils/calendar.utils";
import {
  eventTypeMeta,
  formatDuration,
  formatEventDay,
  formatEventTimeRange,
  isUpcoming,
  toCalendarEvent,
  type SiteEvent,
} from "@/features/events";

interface EventDetailsModalProps {
  /** Eventos a mostrar (p. ej. todos los de un día). Vacío = cerrado. */
  events: SiteEvent[];
  /** Índice inicial dentro de `events`. */
  initialIndex?: number;
  onClose: () => void;
}

function statusOf(event: SiteEvent) {
  const now = Date.now();
  const end = (event.end ?? event.start).getTime();
  if (event.start.getTime() <= now && end >= now) return { label: "En curso", tone: "live" as const };
  if (isUpcoming(event, now)) return { label: "Próximo", tone: "upcoming" as const };
  return { label: "Finalizado", tone: "past" as const };
}

const monthShort = new Intl.DateTimeFormat("es-CO", { month: "short" });
const weekdayShort = new Intl.DateTimeFormat("es-CO", { weekday: "long" });

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dfa83d]/40 text-[#dfa83d]">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 text-[15px] text-primary dark:text-zinc-100">{children}</div>
      </div>
    </div>
  );
}

export function EventDetailsModal({ events, initialIndex = 0, onClose }: EventDetailsModalProps) {
  const open = events.length > 0;
  const [index, setIndex] = useState(initialIndex);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIndex(Math.min(initialIndex, Math.max(0, events.length - 1)));
  }, [events, initialIndex]);

  // Escape, flechas, bloqueo de scroll y foco inicial
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, events.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, events.length, onClose]);

  const event = events[index];

  const share = async () => {
    if (!event) return;
    const url = `${window.location.origin}/#/eventos`;
    const text = `${event.title} — ${formatEventDay(event)}, ${formatEventTimeRange(event)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: event.title, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* el usuario canceló */
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && event ? (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            className="relative grid w-full max-w-5xl max-h-[92vh] overflow-hidden bg-background dark:bg-zinc-950 shadow-2xl md:grid-cols-[5fr_6fr] rounded-t-2xl sm:rounded-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/70 md:bg-transparent md:text-primary md:backdrop-blur-none md:hover:bg-primary/5 dark:md:text-zinc-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Imagen / bloque de fecha */}
            <div className="relative min-h-[220px] md:min-h-full bg-zinc-900">
              {event.imageUrl ? (
                <img
                  key={event.id}
                  src={event.imageUrl}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#dfa83d]">
                    {weekdayShort.format(event.start)}
                  </span>
                  <span className="font-serif text-8xl leading-none">{event.start.getDate()}</span>
                  <span className="text-sm uppercase tracking-[0.3em] text-white/70">
                    {monthShort.format(event.start).replace(".", "")} {event.start.getFullYear()}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span
                className="absolute left-4 top-4 inline-flex items-center gap-2 bg-background/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary dark:bg-zinc-900 dark:text-zinc-100"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: eventTypeMeta(event.type).color }}
                />
                {event.typeLabel}
              </span>
            </div>

            {/* Contenido */}
            <div className="flex min-h-0 flex-col overflow-y-auto">
              <div className="flex-1 px-6 pb-6 pt-8 sm:px-10 sm:pt-12">
                {events.length > 1 ? (
                  <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <button
                      type="button"
                      aria-label="Evento anterior"
                      disabled={index === 0}
                      onClick={() => setIndex((i) => i - 1)}
                      className="flex h-8 w-8 items-center justify-center border border-border transition hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    Evento {index + 1} de {events.length}
                    <button
                      type="button"
                      aria-label="Evento siguiente"
                      disabled={index === events.length - 1}
                      onClick={() => setIndex((i) => i + 1)}
                      className="flex h-8 w-8 items-center justify-center border border-border transition hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}

                {(() => {
                  const status = statusOf(event);
                  return (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]",
                        status.tone === "live" && "text-emerald-600",
                        status.tone === "upcoming" && "text-[#dfa83d]",
                        status.tone === "past" && "text-muted-foreground",
                      )}
                    >
                      {status.tone === "live" ? (
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" />
                      ) : null}
                      {status.label}
                    </span>
                  );
                })()}

                <h2
                  id="event-modal-title"
                  className="mt-2 pr-8 font-serif text-3xl leading-tight tracking-tight text-primary dark:text-zinc-100 sm:text-4xl"
                >
                  {event.title}
                </h2>
                <div className="mt-5 h-px w-16 bg-[#dfa83d]" />

                <div className="mt-7 space-y-5">
                  <DetailRow icon={CalendarDays} label="Fecha">
                    {formatEventDay(event)}
                  </DetailRow>
                  <DetailRow icon={Clock} label="Horario">
                    {formatEventTimeRange(event)}
                    {formatDuration(event) ? (
                      <span className="text-muted-foreground"> · {formatDuration(event)}</span>
                    ) : null}
                  </DetailRow>
                  {event.location ? (
                    <DetailRow icon={MapPin} label="Lugar">
                      <span>{event.location}</span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.location}, Bucaramanga`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#dfa83d] underline-offset-4 hover:underline"
                      >
                        Cómo llegar
                      </a>
                    </DetailRow>
                  ) : null}
                </div>

                {event.description ? (
                  <div className="mt-8 border-t border-border pt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Acerca del evento
                    </p>
                    <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-foreground/80">
                      {event.description}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Acciones */}
              <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-border bg-background/95 px-6 py-4 backdrop-blur dark:bg-zinc-950/95 sm:px-10">
                {isUpcoming(event) ? (
                  <>
                    <button
                      type="button"
                      onClick={() => addToGoogleCalendar(toCalendarEvent(event))}
                      className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-primary/85"
                    >
                      <CalendarPlus className="h-4 w-4" />
                      Google Calendar
                    </button>
                    <button
                      type="button"
                      onClick={() => addToAppleCalendar(toCalendarEvent(event))}
                      className="inline-flex items-center gap-2 border border-primary/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white dark:border-zinc-700 dark:text-zinc-100"
                    >
                      <Download className="h-4 w-4" />
                      Apple / Outlook
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">Este evento ya finalizó.</span>
                )}
                <button
                  type="button"
                  onClick={() => void share()}
                  className="ml-auto inline-flex items-center gap-2 px-2 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:text-[#dfa83d] dark:text-zinc-100"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  {copied ? "Copiado" : "Compartir"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
