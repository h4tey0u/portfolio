import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BOOK, ZONES } from "./data"
import face from "./img/face.jpg"

/** Интерактивная карта лица: точки на фото + список зон для телефона и клавиатуры */
export function FaceMap() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(ZONES[1].id)
  const zone = ZONES.find((z) => z.id === active)!

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[var(--radius)]">
        <img src={face} alt="Портрет девушки, на котором отмечены зоны лица" className="aspect-[4/5] w-full object-cover saturate-[0.85]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        {ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => setActive(z.id)}
            onMouseEnter={() => setActive(z.id)}
            aria-label={z.label}
            aria-pressed={z.id === active}
            style={{ left: `${z.x}%`, top: `${z.y}%` }}
            className="group absolute grid size-11 -translate-1/2 place-items-center"
          >
            <span
              className={cn(
                "absolute size-7 rounded-full border border-white/70 motion-safe:animate-ping",
                z.id === active ? "opacity-60" : "opacity-0",
              )}
            />
            <span
              className={cn(
                "relative size-4 rounded-full border-2 border-white transition-all duration-300",
                z.id === active ? "scale-125 bg-primary" : "bg-white/30 backdrop-blur group-hover:bg-white/70",
              )}
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Зоны лица">
          {ZONES.map((z) => (
            <button
              key={z.id}
              role="tab"
              aria-selected={z.id === active}
              onClick={() => setActive(z.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                z.id === active ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:text-foreground",
              )}
            >
              {z.label}
            </button>
          ))}
        </div>

        <div className="relative mt-10 min-h-[340px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={zone.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-4xl leading-[1.1] md:text-5xl">{zone.label}</h3>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">{zone.concern}</p>
              <ul className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius)] bg-border">
                {zone.procedures.map(([name, price]) => (
                  <li key={name} className="flex items-baseline justify-between gap-6 bg-card px-5 py-4">
                    <span>{name}</span>
                    <span className="shrink-0 font-medium text-primary tabular-nums">{price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Точный план врач составит на консультации. Иногда мы советуем отказаться от процедуры, и это нормально.
        </p>
        <Button asChild size="lg" className="mt-8 h-12 self-start rounded-full px-7 text-base">
          <a href="#contacts">{BOOK}</a>
        </Button>
      </div>
    </div>
  )
}
