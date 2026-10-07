import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"
import { BOOK, HALLS } from "./data"

const OPEN = 8
const CLOSE = 24
const HOURS = Array.from({ length: CLOSE - OPEN }, (_, i) => OPEN + i)
const EVENING = 18 // с 18:00 час дороже
const EVENING_K = 1.2
const WEEKEND_K = 1.25
const LONG_DISCOUNT = 0.1 // от 3 часов
const WD = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
const rub = new Intl.NumberFormat("ru-RU")

/** Детерминированная занятость: одни и те же часы заняты при каждом открытии страницы */
function busyHours(seed: string) {
  let h = 2166136261
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0
  const set = new Set<number>()
  // 2-3 брони по 2-3 часа
  for (let k = 0; k < 2 + (h % 2); k++) {
    h = Math.imul(h ^ (k + 1), 2654435761) >>> 0
    const start = OPEN + (h % (CLOSE - OPEN - 3))
    const len = 2 + ((h >> 4) % 2)
    for (let i = 0; i < len; i++) set.add(start + i)
  }
  return set
}

const pad = (n: number) => `${String(n).padStart(2, "0")}:00`

export function HourBooking() {
  const days = useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return Array.from({ length: 14 }, (_, i) => new Date(t.getTime() + i * 86_400_000))
  }, [])
  const [hallId, setHallId] = useState(HALLS[0].id)
  const [dayIdx, setDayIdx] = useState(1)
  const [range, setRange] = useState<[number, number] | null>(null)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)

  const hall = HALLS.find((h) => h.id === hallId)!
  const day = days[dayIdx]
  const weekend = day.getDay() === 0 || day.getDay() === 6
  const busy = useMemo(() => busyHours(`${hallId}-${day.toDateString()}`), [hallId, day])

  function reset(fn: () => void) {
    fn()
    setRange(null)
    setError("")
  }

  function clickHour(h: number) {
    setError("")
    // Первый клик выбирает начало, второй задаёт конец. Третий начинает заново
    if (!range || range[0] !== range[1]) return setRange([h, h])
    const [a, b] = [Math.min(range[0], h), Math.max(range[0], h)]
    for (let i = a; i <= b; i++)
      if (busy.has(i)) {
        setRange([h, h])
        return setError("В этом промежутке зал уже занят. Выберите другое время.")
      }
    setRange([a, b])
  }

  const calc = useMemo(() => {
    if (!range) return null
    const hours = range[1] - range[0] + 1
    let sum = 0
    let evening = 0
    for (let h = range[0]; h <= range[1]; h++) {
      const isEvening = h >= EVENING
      if (isEvening) evening++
      sum += hall.price * (isEvening ? EVENING_K : 1) * (weekend ? WEEKEND_K : 1)
    }
    const discount = hours >= 3 ? sum * LONG_DISCOUNT : 0
    return { hours, evening, base: Math.round(sum), discount: Math.round(discount), total: Math.round((sum - discount) / 10) * 10 }
  }, [range, hall, weekend])

  const dateLabel = day.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 rounded-[var(--radius)] border-2 border-ink bg-card p-5 shadow-hard-lg md:p-8">
        <p className="font-heading text-sm font-semibold">Зал</p>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {HALLS.map((h) => (
            <button
              key={h.id}
              type="button"
              aria-pressed={h.id === hallId}
              onClick={() => reset(() => setHallId(h.id))}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-[var(--radius)] border-2 border-ink py-1 pr-3 pl-1 text-sm font-medium transition-colors",
                h.id === hallId ? "bg-signal" : "bg-background hover:bg-muted",
              )}
            >
              <img src={h.img} alt="" className="size-8 rounded-[3px] object-cover" />
              {h.name}
            </button>
          ))}
        </div>

        <p className="mt-7 font-heading text-sm font-semibold">День</p>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {days.map((d, i) => {
            const we = d.getDay() === 0 || d.getDay() === 6
            return (
              <button
                key={d.toISOString()}
                type="button"
                aria-pressed={i === dayIdx}
                onClick={() => reset(() => setDayIdx(i))}
                className={cn(
                  "w-14 shrink-0 rounded-[var(--radius)] border-2 border-ink py-2 text-center transition-colors",
                  i === dayIdx ? "bg-ink text-signal" : "bg-background hover:bg-muted",
                )}
              >
                <span className={cn("block text-xs", we && i !== dayIdx && "text-red-700")}>{i === 0 ? "Сег" : WD[d.getDay()]}</span>
                <span className="font-heading text-lg font-bold tabular-nums">{d.getDate()}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-heading text-sm font-semibold">Время</p>
          <p className="text-xs text-muted-foreground">Нажмите на час начала, затем на последний час</p>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-8">
          {HOURS.map((h) => {
            const isBusy = busy.has(h)
            const inRange = range && h >= range[0] && h <= range[1]
            return (
              <button
                key={h}
                type="button"
                disabled={isBusy}
                onClick={() => clickHour(h)}
                aria-label={`${pad(h)}${isBusy ? ", занято" : ""}`}
                className={cn(
                  "relative h-14 rounded-[var(--radius)] border-2 text-sm font-medium tabular-nums transition-colors",
                  isBusy && "cursor-not-allowed border-dashed border-ink/30 bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgb(14_14_14/0.08)_6px_8px)] text-ink/35",
                  !isBusy && (inRange ? "border-ink bg-signal" : "border-ink bg-background hover:bg-muted"),
                )}
              >
                {pad(h)}
                {h >= EVENING && !isBusy && <span className="absolute top-1 right-1.5 text-[10px] text-muted-foreground">+20%</span>}
              </button>
            )
          })}
        </div>
        {error && <p className="mt-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
      </div>

      <aside className="flex flex-col rounded-[var(--radius)] border-2 border-ink bg-ink p-6 text-background shadow-hard-lg md:p-7" aria-live="polite">
        <p className="font-heading text-xl font-bold">{hall.name}</p>
        <p className="mt-1 text-sm text-background/65">
          {hall.area} м², потолки {hall.height}
        </p>
        <dl className="mt-6 grid gap-3 border-t border-background/20 pt-5 text-sm">
          <Row label="Дата" value={`${dateLabel}${weekend ? ", выходной" : ""}`} />
          <Row label="Время" value={calc && range ? `${pad(range[0])} - ${pad(range[1] + 1)}, ${calc.hours} ч` : "не выбрано"} />
          <Row label="Тариф" value={`${rub.format(hall.price)} ₽/ч${weekend ? " × 1,25" : ""}`} />
          {calc && calc.evening > 0 && <Row label="Вечерние часы" value={`${calc.evening} ч × 1,2`} />}
          {calc && calc.discount > 0 && <Row label="Скидка от 3 часов" value={`−${rub.format(calc.discount)} ₽`} />}
        </dl>
        <div className="mt-auto pt-8">
          <p className="text-sm text-background/65">Итого</p>
          <p className="font-heading text-4xl font-bold text-signal tabular-nums">{calc ? `${rub.format(calc.total)} ₽` : "0 ₽"}</p>
          <button
            type="button"
            disabled={!calc}
            onClick={() => setOpen(true)}
            className="press mt-5 w-full rounded-[var(--radius)] border-2 border-ink bg-signal py-3.5 font-heading text-sm font-bold text-ink shadow-[4px_4px_0_0_#ffd40055] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {BOOK}
          </button>
          <p className="mt-3 text-xs text-background/55">Предоплата 50%. Бесплатная отмена за 48 часов.</p>
        </div>
      </aside>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-2 border-ink sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              {hall.name}, {dateLabel}
            </DialogTitle>
            <DialogDescription>
              {range && `${pad(range[0])} - ${pad(range[1] + 1)}`}, {calc && `${rub.format(calc.total)} ₽`}. Пришлём ссылку на предоплату в SMS.
            </DialogDescription>
          </DialogHeader>
          <LeadForm submitLabel="Подтвердить бронь" successText="Бронь закреплена на 2 часа. Ссылка на предоплату придёт в SMS." />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-background/65">{label}</dt>
      <dd className="text-right font-medium first-letter:uppercase">{value}</dd>
    </div>
  )
}
