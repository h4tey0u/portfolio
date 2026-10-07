import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"
import { CakePreview } from "./CakePreview"
import { COATINGS, DECOR, FILLINGS, TIER_FRAME, type CoatingId, type DecorId, type FillingId } from "./data"

const rub = new Intl.NumberFormat("ru-RU")
const GRAMS_PER_GUEST = 150
const MIN_KG = 1.5

export function Constructor() {
  const [guests, setGuests] = useState(16)
  const [filling, setFilling] = useState<FillingId>("pistachio")
  const [coating, setCoating] = useState<CoatingId>("velour")
  const [decor, setDecor] = useState<Set<DecorId>>(new Set(["berries"]))
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)

  const kg = Math.max(MIN_KG, Math.round(((guests * GRAMS_PER_GUEST) / 1000) * 2) / 2)
  const tiers = kg <= 2.5 ? 1 : kg <= 5 ? 2 : 3

  const price = useMemo(() => {
    const perKg = FILLINGS[filling].perKg + COATINGS[coating].perKg
    let decorSum = 0
    decor.forEach((d) => (decorSum += DECOR[d].price * (d === "berries" ? tiers : 1)))
    const total = kg * perKg + decorSum + (tiers - 1) * TIER_FRAME
    return { perKg, decorSum, total: Math.round(total / 100) * 100 }
  }, [kg, filling, coating, decor, tiers])

  function toggle(d: DecorId) {
    setDecor((s) => {
      const n = new Set(s)
      if (n.has(d)) n.delete(d)
      else n.add(d)
      return n
    })
  }

  const chip = (active: boolean) =>
    cn(
      "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all active:scale-95",
      active ? "border-primary bg-primary text-primary-foreground" : "border-ink/15 bg-card hover:border-primary/50",
    )

  return (
    <div className="grid overflow-hidden rounded-[32px] bg-card shadow-[0_30px_80px_-40px_rgb(31_42_30/0.35)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="relative flex flex-col items-center justify-center bg-[#f9e6ec] p-6 md:p-10">
        <div className="w-full max-w-[460px]">
          <CakePreview tiers={tiers} filling={filling} coating={coating} decor={decor} text={text} />
        </div>
        <p className="font-hand mt-2 text-2xl text-ink/70">
          {tiers} {tiers === 1 ? "ярус" : "яруса"}, примерно {String(kg).replace(".", ",")} кг
        </p>
      </div>

      <div className="grid min-w-0 content-start gap-8 p-6 md:p-10">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="guests" className="font-semibold">Сколько гостей?</label>
            <span className="text-2xl font-bold tabular-nums">{guests}</span>
          </div>
          <input
            id="guests"
            type="range"
            min={6}
            max={60}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-4 w-full accent-[var(--primary)]"
          />
          <p className="mt-1 text-xs text-muted-foreground">Считаем 150 г на человека. От 2,5 кг торт становится двухъярусным</p>
        </div>

        <fieldset>
          <legend className="mb-3 font-semibold">Начинка</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.keys(FILLINGS) as FillingId[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={filling === id}
                onClick={() => setFilling(id)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border-2 p-1.5 pr-3 text-left text-sm font-medium transition-all active:scale-95",
                  filling === id ? "border-primary bg-primary/5" : "border-ink/10 hover:border-primary/40",
                )}
              >
                <img src={FILLINGS[id].img} alt="" className="size-10 shrink-0 rounded-xl object-cover" />
                <span className="leading-tight">{FILLINGS[id].short}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-semibold">Покрытие</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(COATINGS) as CoatingId[]).map((id) => (
              <button key={id} type="button" aria-pressed={coating === id} onClick={() => setCoating(id)} className={chip(coating === id)}>
                {COATINGS[id].name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{COATINGS[coating].note}</p>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-semibold">Декор</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(DECOR) as DecorId[]).map((id) => (
              <button key={id} type="button" aria-pressed={decor.has(id)} onClick={() => toggle(id)} className={chip(decor.has(id))}>
                {DECOR[id].name}
              </button>
            ))}
          </div>
          {decor.has("text") && (
            <Input
              value={text}
              maxLength={18}
              onChange={(e) => setText(e.target.value)}
              placeholder="С днём рождения"
              aria-label="Текст надписи"
              className="mt-3 h-11 rounded-full border-2 border-ink/15 bg-background px-4"
            />
          )}
        </fieldset>

        <div className="flex flex-wrap items-end justify-between gap-5 rounded-3xl bg-ink p-5 text-background md:p-6" aria-live="polite">
          <div>
            <p className="text-sm text-background/65">
              {String(kg).replace(".", ",")} кг × {rub.format(price.perKg)} ₽{price.decorSum > 0 && ` + декор ${rub.format(price.decorSum)} ₽`}
              {tiers > 1 && ` + каркас`}
            </p>
            <p className="mt-1 text-4xl font-bold tabular-nums">{rub.format(price.total)} ₽</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:-rotate-2 active:scale-95"
          >
            Оформить заказ
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {FILLINGS[filling].name}, {String(kg).replace(".", ",")} кг
            </DialogTitle>
            <DialogDescription>
              {COATINGS[coating].name}
              {decor.size > 0 && `, ${[...decor].map((d) => DECOR[d].name.toLowerCase()).join(", ")}`}. Итого {rub.format(price.total)} ₽. Кондитер перезвонит, чтобы уточнить дату и детали.
            </DialogDescription>
          </DialogHeader>
          <LeadForm submitLabel="Отправить заказ" successText="Заказ у кондитера. Перезвоним в течение часа и пришлём эскиз декора." />
        </DialogContent>
      </Dialog>
    </div>
  )
}
