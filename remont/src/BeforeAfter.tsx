import { motion, useMotionValue, useTransform } from "motion/react"
import { ArrowsHorizontalIcon } from "@phosphor-icons/react"
import before from "./img/before.jpg"
import after from "./img/after.jpg"

/**
 * Сравнение «до/после». Управляется невидимым input[type=range] поверх фото:
 * работает мышью, пальцем и с клавиатуры, без ререндеров React.
 */
export function BeforeAfter() {
  const pos = useMotionValue(50)
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`)
  const left = useTransform(pos, (v) => `${v}%`)

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-muted select-none">
      <img src={after} alt="Гостиная после ремонта" className="absolute inset-0 size-full object-cover" loading="lazy" />
      <motion.img
        src={before}
        alt="Та же квартира на этапе демонтажа"
        style={{ clipPath: clip }}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />

      <span className="absolute top-4 left-4 rounded-md bg-graphite/80 px-2.5 py-1 text-xs font-medium text-white">До</span>
      <span className="absolute top-4 right-4 rounded-md bg-card/90 px-2.5 py-1 text-xs font-medium">После</span>

      <motion.div style={{ left }} className="pointer-events-none absolute inset-y-0 -translate-x-1/2">
        <div className="h-full w-0.5 bg-white/90" />
        <div className="absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full bg-white text-graphite shadow-[0_6px_24px_rgb(28_28_26/0.3)]">
          <ArrowsHorizontalIcon size={22} weight="bold" />
        </div>
      </motion.div>

      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label="Сдвиньте, чтобы сравнить квартиру до и после ремонта"
        onInput={(e) => pos.set(Number(e.currentTarget.value))}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
