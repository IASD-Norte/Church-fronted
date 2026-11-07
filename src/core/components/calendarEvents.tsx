import { useEffect, useMemo, useState } from "react";
import {
  CalendarX,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { EventDetailsModal } from "@/core/components/EventDetailsModal";
import {
  EVENT_TYPE_META,
  capitalize,
  eventTypeMeta,
  formatEventDay,
  formatEventTimeRange,
  formatTime,
  isUpcoming,
  occursOn,
  sameDay,
  usePublishedEvents,
  type SiteEvent,
} from "@/features/events";

type View = "Mes" | "Semana" | "Día" | "Lista";
const VIEWS: View[] = ["Mes", "Semana", "Día", "Lista"];
const WEEKDAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const WEEKDAYS_SHORT = ["D", "L", "M", "M", "J", "V", "S"];
const MAX_CHIPS = 3;

const monthYearFmt = new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric" });
const dayMonthFmt = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short" });
const fullDayFmt = new Intl.DateTimeFormat("es-CO", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const startOfWeek = (d: Date) => addDays(startOfDay(d), -d.getDay());
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

/** 6 semanas (42 días) que cubren el mes, empezando en domingo. */
function monthGrid(cursor: Date) {
  const first = startOfWeek(startOfMonth(cursor));
  return Array.from({ length: 42 }, (_, i) => addDays(first, i));
}

function eventsOn(events: SiteEvent[], day: Date) {
  return events.filter((e) => occursOn(e, day));
}

// ── Piezas ───────────────────────────────────────────────────────────────────

function EventChip({ event, onOpen }: { event: SiteEvent; onOpen: () => void }) {
  const color = eventTypeMeta(event.type).color;
  return (
    <button
      type="button"
      data-cms-collection="events"
      data-cms-id={event.id}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      title={`${event.title} · ${formatEventTimeRange(event)}`}
      className="group/chip flex w-full items-center gap-1.5 overflow-hidden bg-white/70 py-1 pl-1.5 pr-1 text-left text-[11px] leading-tight shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <span className="shrink-0 font-semibold tabular-nums text-muted-foreground">
        {formatTime(event.start).replace(/\s?([ap])\.\s?m\./, "$1")}
      </span>
      <span className="truncate font-medium text-primary group-hover/chip:text-[#b9872a] dark:text-zinc-100">
        {event.title}
      </span>
    </button>
  );
}

function EventRow({ event, onOpen }: { event: SiteEvent; onOpen: () => void }) {
  const meta = eventTypeMeta(event.type);
  const past = !isUpcoming(event);
  return (
    <button
      type="button"
      data-cms-collection="events"
      data-cms-id={event.id}
      onClick={onOpen}
      className={cn(
        "group flex w-full items-stretch gap-5 border-b border-border py-5 text-left transition hover:bg-white/60 dark:hover:bg-zinc-900 sm:px-4",
        past && "opacity-60",
      )}
    >
      <div className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-border pr-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dfa83d]">
          {WEEKDAYS[event.start.getDay()].slice(0, 3)}
        </span>
        <span className="font-serif text-4xl leading-none text-primary dark:text-zinc-100">
          {event.start.getDate()}
        </span>
      </div>
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt=""
          className="hidden h-20 w-28 shrink-0 object-cover sm:block"
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
          {meta.label}
        </span>
        <h4 className="mt-1 font-serif text-xl leading-snug text-primary transition-colors group-hover:text-[#dfa83d] dark:text-zinc-100">
          {event.title}
        </h4>
        <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {event.end && !sameDay(event.start, event.end)
              ? formatEventDay(event)
              : formatEventTimeRange(event)}
          </span>
          {event.location ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          ) : null}
        </div>
      </div>
      <ChevronRight className="my-auto h-5 w-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-[#dfa83d]" />
    </button>
  );
}

function EmptyNote({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted-foreground">
      <CalendarX className="h-8 w-8" />
      <p className="text-sm">{children}</p>
      {action}
    </div>
  );
}

// ── Calendario ───────────────────────────────────────────────────────────────

export function CalendarView() {
  const { events: allEvents, status } = usePublishedEvents();
  const today = startOfDay(new Date());

  const [view, setView] = useState<View>("Mes");
  const [cursor, setCursor] = useState(today);
  const [miniCursor, setMiniCursor] = useState(startOfMonth(today));
  const [search, setSearch] = useState("");
  const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [modal, setModal] = useState<{ events: SiteEvent[]; index: number }>({
    events: [],
    index: 0,
  });

  // En móvil la vista de lista es la más legible
  useEffect(() => {
    if (window.innerWidth < 768) setView("Lista");
  }, []);

  useEffect(() => setMiniCursor(startOfMonth(cursor)), [cursor]);

  const types = useMemo(() => {
    const present = new Set(allEvents.map((e) => e.type));
    return Object.keys(EVENT_TYPE_META)
      .filter((t) => present.has(t))
      .concat([...present].filter((t) => !EVENT_TYPE_META[t]));
  }, [allEvents]);

  const events = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allEvents.filter(
      (e) =>
        !hiddenTypes.has(e.type) &&
        (!q ||
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)),
    );
  }, [allEvents, hiddenTypes, search]);

  const open = (list: SiteEvent[], event?: SiteEvent) =>
    setModal({ events: list, index: event ? Math.max(0, list.indexOf(event)) : 0 });

  const monthEvents = useMemo(() => {
    const start = startOfMonth(cursor);
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    return events.filter(
      (e) => e.start < end && (e.end ?? e.start) >= start,
    );
  }, [events, cursor]);

  const nextEventAfterCursor = useMemo(() => {
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    return events.find((e) => e.start >= end) ?? null;
  }, [events, cursor]);

  const navigate = (dir: -1 | 1) => {
    if (view === "Mes" || view === "Lista")
      setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + dir, 1));
    else if (view === "Semana") setCursor(addDays(cursor, 7 * dir));
    else setCursor(addDays(cursor, dir));
  };

  const title = (() => {
    if (view === "Semana") {
      const s = startOfWeek(cursor);
      const e = addDays(s, 6);
      return `${dayMonthFmt.format(s)} – ${dayMonthFmt.format(e)} ${e.getFullYear()}`;
    }
    if (view === "Día") return capitalize(fullDayFmt.format(cursor));
    return capitalize(monthYearFmt.format(cursor));
  })();

  const toggleType = (type: string) =>
    setHiddenTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });

  const now = Date.now();
  const stats = {
    total: monthEvents.length,
    upcoming: monthEvents.filter((e) => isUpcoming(e, now)).length,
    past: monthEvents.filter((e) => !isUpcoming(e, now)).length,
  };

  // ── Vistas ─────────────────────────────────────────────────────────────────

  const renderMonth = () => (
    <div>
      <div className="grid grid-cols-7 border-b border-border">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="hidden lg:inline">{d}</span>
            <span className="lg:hidden">{d.slice(0, 3)}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {monthGrid(cursor).map((day) => {
          const inMonth = day.getMonth() === cursor.getMonth();
          const dayEvents = eventsOn(events, day);
          const isToday = sameDay(day, today);
          return (
            <div
              key={day.toISOString()}
              role={dayEvents.length ? "button" : undefined}
              tabIndex={dayEvents.length ? 0 : undefined}
              onClick={() => dayEvents.length && open(dayEvents)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && dayEvents.length) {
                  e.preventDefault();
                  open(dayEvents);
                }
              }}
              aria-label={
                dayEvents.length
                  ? `${fullDayFmt.format(day)}: ${dayEvents.length} evento(s)`
                  : undefined
              }
              className={cn(
                "min-h-[118px] border-b border-r border-border p-2 transition-colors [&:nth-child(7n)]:border-r-0",
                !inMonth && "bg-black/[0.015] dark:bg-white/[0.02]",
                dayEvents.length && "cursor-pointer hover:bg-white/70 dark:hover:bg-zinc-900",
              )}
            >
              <span
                className={cn(
                  "mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm tabular-nums",
                  isToday
                    ? "bg-[#dfa83d] font-semibold text-white"
                    : inMonth
                      ? "text-primary dark:text-zinc-100"
                      : "text-muted-foreground/50",
                )}
              >
                {day.getDate()}
              </span>
              <div className="space-y-1">
                {dayEvents.slice(0, MAX_CHIPS).map((ev) => (
                  <EventChip key={ev.id} event={ev} onOpen={() => open(dayEvents, ev)} />
                ))}
                {dayEvents.length > MAX_CHIPS ? (
                  <span className="block px-1 text-[11px] font-semibold text-[#b9872a]">
                    +{dayEvents.length - MAX_CHIPS} más
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {status === "ready" && monthEvents.length === 0 ? (
        <EmptyNote
          action={
            nextEventAfterCursor ? (
              <button
                type="button"
                onClick={() => setCursor(startOfMonth(nextEventAfterCursor.start))}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfa83d] hover:underline"
              >
                Ir al próximo evento →
              </button>
            ) : undefined
          }
        >
          No hay eventos este mes.
        </EmptyNote>
      ) : null}
    </div>
  );

  const renderWeek = () => {
    const start = startOfWeek(cursor);
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    return (
      <div className="grid grid-cols-1 sm:grid-cols-7">
        {days.map((day) => {
          const dayEvents = eventsOn(events, day);
          const isToday = sameDay(day, today);
          return (
            <div
              key={day.toISOString()}
              className="min-h-[140px] border-b border-border p-3 sm:min-h-[420px] sm:border-r sm:[&:nth-child(7n)]:border-r-0"
            >
              <div className="mb-3 flex items-baseline gap-2 sm:flex-col sm:items-start sm:gap-0">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {WEEKDAYS[day.getDay()].slice(0, 3)}
                </span>
                <span
                  className={cn(
                    "font-serif text-2xl leading-none",
                    isToday ? "text-[#dfa83d]" : "text-primary dark:text-zinc-100",
                  )}
                >
                  {day.getDate()}
                </span>
              </div>
              <div className="space-y-2">
                {dayEvents.map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    data-cms-collection="events"
                    data-cms-id={ev.id}
                    onClick={() => open(dayEvents, ev)}
                    className="block w-full bg-white/70 p-2 text-left transition hover:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800"
                    style={{ borderLeft: `3px solid ${eventTypeMeta(ev.type).color}` }}
                  >
                    <span className="block text-[11px] font-semibold text-muted-foreground">
                      {formatTime(ev.start)}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium leading-snug text-primary dark:text-zinc-100">
                      {ev.title}
                    </span>
                    {ev.location ? (
                      <span className="mt-1 block truncate text-[11px] text-muted-foreground">
                        {ev.location}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDay = () => {
    const dayEvents = eventsOn(events, cursor);
    if (dayEvents.length === 0)
      return <EmptyNote>No hay eventos programados para este día.</EmptyNote>;
    return (
      <div className="px-4 sm:px-6">
        {dayEvents.map((ev) => (
          <EventRow key={ev.id} event={ev} onOpen={() => open(dayEvents, ev)} />
        ))}
      </div>
    );
  };

  const renderList = () => {
    const from = startOfMonth(cursor);
    const list = events.filter((e) => (e.end ?? e.start) >= from);
    if (list.length === 0)
      return <EmptyNote>No hay eventos desde {monthYearFmt.format(from)}.</EmptyNote>;
    const groups = new Map<string, SiteEvent[]>();
    for (const ev of list) {
      const key = capitalize(monthYearFmt.format(ev.start));
      groups.set(key, [...(groups.get(key) ?? []), ev]);
    }
    return (
      <div className="px-4 sm:px-6">
        {[...groups.entries()].map(([month, items]) => (
          <section key={month} className="pt-6">
            <h3 className="font-['Brush_Script_MT',cursive,serif] text-2xl text-[#dfa83d]">
              {month}
            </h3>
            <div>
              {items.map((ev) => (
                <EventRow key={ev.id} event={ev} onOpen={() => open(list, ev)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  };

  // ── Layout ─────────────────────────────────────────────────────────────────

  const miniDays = monthGrid(miniCursor);

  return (
    <div
      data-cms-collection="events"
      className="grid border border-border bg-background dark:bg-zinc-950 lg:grid-cols-[290px_1fr]"
    >
      {/* Barra lateral */}
      <aside
        className={cn(
          "border-b border-border lg:block lg:border-b-0 lg:border-r",
          filtersOpen ? "block" : "hidden",
        )}
      >
        <div className="border-b border-border p-5">
          <label className="relative block">
            <span className="sr-only">Buscar eventos</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar eventos…"
              className="h-11 w-full border border-border bg-transparent pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/60"
            />
          </label>
        </div>

        {/* Mini calendario */}
        <div className="border-b border-border p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-serif text-lg text-primary dark:text-zinc-100">
              {capitalize(monthYearFmt.format(miniCursor))}
            </span>
            <div className="flex">
              <button
                type="button"
                aria-label="Mes anterior"
                onClick={() => setMiniCursor(new Date(miniCursor.getFullYear(), miniCursor.getMonth() - 1, 1))}
                className="flex h-8 w-8 items-center justify-center border border-border transition hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Mes siguiente"
                onClick={() => setMiniCursor(new Date(miniCursor.getFullYear(), miniCursor.getMonth() + 1, 1))}
                className="-ml-px flex h-8 w-8 items-center justify-center border border-border transition hover:bg-primary hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center">
            {WEEKDAYS_SHORT.map((d, i) => (
              <span key={i} className="py-1 text-[10px] font-semibold text-muted-foreground">
                {d}
              </span>
            ))}
            {miniDays.map((day) => {
              const inMonth = day.getMonth() === miniCursor.getMonth();
              const has = eventsOn(events, day).length > 0;
              const selected = sameDay(day, cursor);
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => {
                    setCursor(day);
                    if (view === "Lista") setView("Día");
                  }}
                  aria-label={fullDayFmt.format(day)}
                  aria-pressed={selected}
                  className={cn(
                    "relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs tabular-nums transition",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : sameDay(day, today)
                        ? "font-semibold text-[#dfa83d]"
                        : inMonth
                          ? "text-primary hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
                          : "text-muted-foreground/40",
                  )}
                >
                  {day.getDate()}
                  {has && !selected ? (
                    <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#dfa83d]" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtros por tipo */}
        <div className="border-b border-border p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Tipos de evento
            </span>
            {hiddenTypes.size > 0 ? (
              <button
                type="button"
                onClick={() => setHiddenTypes(new Set())}
                className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#dfa83d] hover:underline"
              >
                Ver todos
              </button>
            ) : null}
          </div>
          {types.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {status === "loading" ? "Cargando…" : "Aún no hay eventos."}
            </p>
          ) : (
            <ul className="space-y-1">
              {types.map((type) => {
                const meta = eventTypeMeta(type);
                const active = !hiddenTypes.has(type);
                const count = allEvents.filter((e) => e.type === type).length;
                return (
                  <li key={type}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={active}
                      onClick={() => toggleType(type)}
                      className="flex w-full items-center gap-3 py-1.5 text-left text-sm transition hover:text-[#dfa83d]"
                    >
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center border transition"
                        style={{
                          borderColor: meta.color,
                          backgroundColor: active ? meta.color : "transparent",
                        }}
                      >
                        {active ? (
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" aria-hidden>
                            <path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        ) : null}
                      </span>
                      <span className={cn("flex-1", !active && "text-muted-foreground line-through")}>
                        {meta.label}
                      </span>
                      <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Resumen del mes */}
        <div className="p-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {capitalize(monthYearFmt.format(cursor))}
          </span>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { label: "Eventos", value: stats.total },
              { label: "Próximos", value: stats.upcoming },
              { label: "Pasados", value: stats.past },
            ].map((s) => (
              <div key={s.label} className="border border-border py-3">
                <span className="block font-serif text-2xl leading-none text-primary dark:text-zinc-100">
                  {s.value}
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Calendario principal */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4 sm:p-5">
          <button
            type="button"
            onClick={() => setCursor(today)}
            className="h-10 border border-primary/40 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white dark:border-zinc-700 dark:text-zinc-100"
          >
            Hoy
          </button>
          <div className="flex">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center border border-border transition hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => navigate(1)}
              className="-ml-px flex h-10 w-10 items-center justify-center border border-border transition hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <h3 className="min-w-0 flex-1 truncate font-serif text-2xl text-primary dark:text-zinc-100 sm:text-[28px]">
            {title}
          </h3>
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="flex h-10 items-center gap-2 border border-border px-3 text-xs font-semibold uppercase tracking-[0.15em] lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </button>
          <div role="tablist" aria-label="Vista del calendario" className="flex w-full border border-border sm:w-auto">
            {VIEWS.map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={cn(
                  "h-10 flex-1 px-4 text-xs font-semibold uppercase tracking-[0.15em] transition sm:flex-none",
                  view === v
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary dark:hover:text-zinc-100",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {status === "loading" ? (
          <div className="grid grid-cols-7 gap-px p-4" aria-label="Cargando eventos">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="h-24 animate-pulse bg-black/[0.03] dark:bg-white/5" />
            ))}
          </div>
        ) : status === "error" ? (
          <EmptyNote>No se pudieron cargar los eventos. Intenta recargar la página.</EmptyNote>
        ) : view === "Mes" ? (
          renderMonth()
        ) : view === "Semana" ? (
          renderWeek()
        ) : view === "Día" ? (
          renderDay()
        ) : (
          renderList()
        )}
      </div>

      <EventDetailsModal
        events={modal.events}
        initialIndex={modal.index}
        onClose={() => setModal({ events: [], index: 0 })}
      />
    </div>
  );
}
