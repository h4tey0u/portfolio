import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type RepairType = "cosmetic" | "capital" | "design"

export const REPAIR_TYPES: Record<RepairType, { label: string; perM2: number; days: [number, number] }> = {
  cosmetic: { label: "Косметический", perM2: 6900, days: [30, 45] },
  capital: { label: "Капитальный", perM2: 14900, days: [60, 90] },
  design: { label: "Дизайнерский", perM2: 22500, days: [90, 120] },
}

const SECONDARY_MARKUP = 1.12 // вторичка: демонтаж старой отделки
const ROUGH_MATERIALS_M2 = 4200 // черновые материалы под ключ

const rub = new Intl.NumberFormat("ru-RU")

function formatMln(n: number) {
  return n >= 1_000_000
    ? `${(n / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} млн`
    : `${rub.format(Math.round(n / 1000))} тыс.`
}

function formatRange(low: number, high: number) {
  // «1,01 - 1,13 млн», а если границы в разных единицах, пишем обе полностью
  if (low >= 1_000_000) {
    const f = (n: number) => (n / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 2 })
    return `${f(low)} - ${f(high)} млн`
  }
  if (high < 1_000_000) return `${rub.format(Math.round(low / 1000))} - ${rub.format(Math.round(high / 1000))} тыс.`
  return `${formatMln(low)} - ${formatMln(high)}`
}

export function Calculator({ onOrder }: { onOrder: () => void }) {
  const [area, setArea] = useState(56)
  const [type, setType] = useState<RepairType>("capital")
  const [secondary, setSecondary] = useState(false)
  const [materials, setMaterials] = useState(true)

  const result = useMemo(() => {
    const t = REPAIR_TYPES[type]
    let total = area * t.perM2 * (secondary ? SECONDARY_MARKUP : 1)
    if (materials) total += area * ROUGH_MATERIALS_M2
    // Срок растёт с площадью, но не линейно: бригада расширяется на больших объектах
    const k = Math.min(1.5, Math.max(0.8, Math.sqrt(area / 60)))
    return {
      low: Math.round((total * 0.94) / 10000) * 10000,
      high: Math.round((total * 1.06) / 10000) * 10000,
      days: [Math.round(t.days[0] * k), Math.round(t.days[1] * k)] as const,
    }
  }, [area, type, secondary, materials])

  return (
    <div className="grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[1.25fr_1fr]">
      <div className="grid gap-9 p-6 md:p-10">
        <div className="grid gap-4">
          <div className="flex items-baseline justify-between">
            <label htmlFor="area" className="font-medium">Площадь квартиры</label>
            <span className="font-mono text-2xl font-semibold tabular-nums">{area} м²</span>
          </div>
          <input
            id="area"
            type="range"
            min={20}
            max={200}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="range"
          />
          <div className="flex justify-between font-mono text-xs text-muted-foreground">
            <span>20 м²</span>
            <span>200 м²</span>
          </div>
        </div>

        <fieldset className="grid gap-3">
          <legend className="mb-3 font-medium">Тип ремонта</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {(Object.keys(REPAIR_TYPES) as RepairType[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={type === key}
                onClick={() => setType(key)}
                className={cn(
                  "rounded-lg border px-4 py-3 text-left transition-colors active:scale-[0.98]",
                  type === key
                    ? "border-graphite bg-graphite text-white"
                    : "border-input bg-background hover:border-graphite/50",
                )}
              >
                <span className="block text-sm font-medium">{REPAIR_TYPES[key].label}</span>
                <span className={cn("font-mono text-xs", type === key ? "text-white/70" : "text-muted-foreground")}>
                  {rub.format(REPAIR_TYPES[key].perM2)} ₽/м²
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Toggle
            checked={secondary}
            onChange={setSecondary}
            title="Вторичное жильё"
            hint="Добавим демонтаж старой отделки"
          />
          <Toggle
            checked={materials}
            onChange={setMaterials}
            title="Черновые материалы"
            hint="Закупаем и привозим сами"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-10 bg-graphite p-6 text-white md:p-10">
        <div className="grid gap-8" aria-live="polite">
          <div>
            <p className="text-sm text-white/65">Стоимость работ{materials ? " и черновых материалов" : ""}</p>
            <p className="mt-2 font-mono text-4xl font-semibold tracking-tight tabular-nums md:text-5xl">
              {formatRange(result.low, result.high)} ₽
            </p>
          </div>
          <div>
            <p className="text-sm text-white/65">Срок по договору</p>
            <p className="mt-2 font-mono text-2xl font-semibold tabular-nums">
              {result.days[0]} - {result.days[1]} дней
            </p>
          </div>
          <p className="max-w-[40ch] text-sm leading-relaxed text-white/65">
            Это предварительная вилка. Точную смету замерщик составит на объекте, и после подписания договора она уже не изменится.
          </p>
        </div>
        <Button size="lg" onClick={onOrder} className="h-12 w-full text-base">
          Вызвать замерщика
        </Button>
      </div>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  title,
  hint,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  title: string
  hint: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-input bg-background p-4 transition-colors has-[:checked]:border-graphite">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
      />
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">{hint}</span>
      </span>
    </label>
  )
}
