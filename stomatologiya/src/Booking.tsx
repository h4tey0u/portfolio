import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"
import { BOOK, BOOKING_SERVICES, DOCTORS, type DoctorId } from "./data"

const STEPS = ["Услуга", "Врач", "День", "Время", "Контакты"]
const SLOTS = ["09:00", "09:45", "10:30", "11:15", "12:00", "13:30", "14:15", "15:00", "16:30", "17:15", "18:00", "18:45", "19:30", "20:15"]
const WEEKDAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
const WEEKDAYS_FULL = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]

/** Детерминированная «занятость» слотов, чтобы расписание выглядело живым, но не прыгало при ререндере */
function isBusy(seed: string, slot: string) {
  let h = 0
  for (const ch of seed + slot) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h % 5 < 2
}

export function Booking() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [service, setService] = useState<string>()
  const [doctor, setDoctor] = useState<DoctorId | "any">()
  const [day, setDay] = useState<Date>()
  const [time, setTime] = useState<string>()

  const days = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Array.from({ length: 12 }, (_, i) => new Date(today.getTime() + (i + 1) * 86_400_000))
  }, [])

  const svc = BOOKING_SERVICES.find((s) => s.id === service)
  const dayLabel = day?.toLocaleDateString("ru-RU", { day: "numeric", month: "long", weekday: "long" })
  const doctorLabel = doctor === "any" ? "любой свободный врач" : doctor ? DOCTORS[doctor].short : ""

  function pick<T>(setter: (v: T) => void, value: T) {
    setter(value)
    setStep((s) => s + 1)
  }

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-2.5 text-sm font-medium transition-colors active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35",
      active ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-primary/60",
    )

  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          aria-label="Назад"
          className="grid size-9 place-items-center rounded-full border border-input transition-opacity disabled:opacity-0"
        >
          <ArrowLeftIcon size={16} />
        </button>
        <ol className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
                i === step ? "bg-tint text-primary" : i < step ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full text-[10px]",
                  i < step ? "bg-primary text-primary-foreground" : "border border-current",
                )}
              >
                {i < step ? <CheckIcon size={11} weight="bold" /> : i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid min-h-[340px] gap-8 p-5 md:p-8 lg:grid-cols-[1fr_280px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <Step title="С чем вам помочь?">
                <div className="flex flex-wrap gap-2">
                  {BOOKING_SERVICES.map((s) => (
                    <button key={s.id} type="button" className={chip(service === s.id)} onClick={() => { setDoctor(undefined); pick(setService, s.id) }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </Step>
            )}

            {step === 1 && svc && (
              <Step title="Выберите врача">
                <div className="grid gap-2 sm:grid-cols-2">
                  {svc.doctors.length > 1 && (
                    <button type="button" onClick={() => pick(setDoctor, "any" as const)} className={cn("flex items-center gap-3 rounded-2xl border p-3 text-left", doctor === "any" ? "border-primary bg-tint" : "border-input hover:border-primary/60")}>
                      <span className="grid size-12 place-items-center rounded-full bg-tint text-sm font-bold text-primary">Все</span>
                      <span>
                        <span className="block text-sm font-semibold">Любой врач</span>
                        <span className="text-xs text-muted-foreground">Ближайшее свободное время</span>
                      </span>
                    </button>
                  )}
                  {svc.doctors.map((id) => (
                    <button key={id} type="button" onClick={() => pick(setDoctor, id)} className={cn("flex items-center gap-3 rounded-2xl border p-3 text-left", doctor === id ? "border-primary bg-tint" : "border-input hover:border-primary/60")}>
                      <img src={DOCTORS[id].photo} alt="" className="size-12 rounded-full object-cover object-top" />
                      <span>
                        <span className="block text-sm font-semibold">{DOCTORS[id].name}</span>
                        <span className="text-xs text-muted-foreground">{DOCTORS[id].role}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step title="Когда удобно прийти?">
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {days.map((d) => {
                    const sunday = d.getDay() === 0
                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        disabled={sunday}
                        onClick={() => { setTime(undefined); pick(setDay, d) }}
                        className={cn("rounded-2xl border py-3 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-35", day?.getTime() === d.getTime() ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary/60")}
                      >
                        <span className="block text-xs opacity-75">{WEEKDAYS[d.getDay()]}</span>
                        <span className="text-lg font-bold tabular-nums">{d.getDate()}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">В воскресенье клиника не работает.</p>
              </Step>
            )}

            {step === 3 && day && (
              <Step title={`Свободное время, ${dayLabel}`}>
                <div className="flex flex-wrap gap-2">
                  {SLOTS.map((t) => (
                    <button key={t} type="button" disabled={isBusy(`${day.getDate()}${doctor}`, t)} onClick={() => pick(setTime, t)} className={cn(chip(time === t), "tabular-nums")}>
                      {t}
                    </button>
                  ))}
                </div>
              </Step>
            )}

            {step === 4 && (
              <Step title="Куда отправить подтверждение?">
                <LeadForm
                  className="max-w-md"
                  submitLabel={BOOK}
                  successText={`Ждём вас ${day?.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} (${day ? WEEKDAYS_FULL[day.getDay()] : ""}) в ${time}. За день до приёма пришлём напоминание в SMS.`}
                  note="Перезвоним, только если понадобится уточнить детали."
                />
              </Step>
            )}
          </motion.div>
        </AnimatePresence>

        <aside className="hidden rounded-2xl bg-background p-5 text-sm lg:block">
          <p className="font-semibold">Ваша запись</p>
          <dl className="mt-4 grid gap-3">
            <Row label="Услуга" value={svc?.label} />
            <Row label="Врач" value={doctorLabel} />
            <Row label="Дата" value={dayLabel} />
            <Row label="Время" value={time} />
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Первичная консультация и план лечения бесплатно.</p>
        </aside>
      </div>
    </div>
  )
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 text-xl font-bold tracking-tight first-letter:uppercase">{title}</h3>
      {children}
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("font-medium first-letter:uppercase", !value && "text-muted-foreground/60")}>{value || "не выбрано"}</dd>
    </div>
  )
}
