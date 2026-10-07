import { useEffect, useRef, type ReactNode } from "react"
import { animate, motion, useInView, useReducedMotion } from "motion/react"

/** Плавное появление блока при попадании в экран */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Число, которое «досчитывается» при появлении. Пишет в DOM напрямую, без ререндеров */
export function CountUp({ to, format = (n) => String(Math.round(n)) }: { to: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) {
      el.textContent = format(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, to, format])

  return <span ref={ref}>{format(0)}</span>
}
