import { motion, useReducedMotion } from "motion/react"
import type { CoatingId, DecorId, FillingId } from "./data"
import { FILLINGS } from "./data"

/**
 * Плоская иллюстрация торта, которая собирается из выбранных опций.
 * Ярусы, цвет покрытия и декор меняются с пружинной анимацией.
 */
export function CakePreview({
  tiers,
  filling,
  coating,
  decor,
  text,
}: {
  tiers: number
  filling: FillingId
  coating: CoatingId
  decor: Set<DecorId>
  text: string
}) {
  const reduce = useReducedMotion()
  const f = FILLINGS[filling]
  const coat = coating === "cream" ? "#fbf7f0" : coating === "velour" ? f.velour : f.sponge
  const shade = coating === "cream" ? "#ece4d6" : coating === "velour" ? "rgb(0 0 0 / 0.08)" : "rgb(0 0 0 / 0.18)"

  // Геометрия ярусов снизу вверх
  const W = 400
  const base = 360
  // Одноярусный торт выше и уже, иначе он выглядит как блин
  const sizes =
    tiers === 1
      ? [{ w: 220, h: 128 }]
      : [
          { w: 250, h: 92 },
          { w: 186, h: 80 },
          { w: 128, h: 70 },
        ].slice(0, tiers)
  let y = base
  const rects = sizes.map((s) => {
    y -= s.h
    return { ...s, x: (W - s.w) / 2, y }
  })
  const top = rects[rects.length - 1]
  // Область рисунка подгоняется под высоту торта, чтобы он всегда заполнял панель
  const minY = Math.max(0, top.y - (decor.has("topper") ? 100 : 48))
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 160, damping: 18 }

  return (
    <svg viewBox={`20 ${minY} 360 ${414 - minY}`} className="h-auto w-full" role="img" aria-label={`Превью торта: ${tiers} яруса, ${f.name}`}>
      {/* подставка */}
      <ellipse cx="200" cy="372" rx="170" ry="16" fill="#1f2a1e" opacity="0.08" />
      <rect x="40" y="356" width="320" height="12" rx="6" fill="#bfd8a6" />
      <rect x="150" y="368" width="100" height="34" rx="6" fill="#a8c78b" />
      <rect x="120" y="398" width="160" height="10" rx="5" fill="#bfd8a6" />

      {rects.map((r, i) => (
        <motion.g
          key={`${tiers}-${i}`}
          initial={reduce ? false : { opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: reduce ? 0 : i * 0.08 }}
        >
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="14" fill={coat} style={{ transition: "fill .5s" }} />
          {/* тень справа для объёма */}
          <rect x={r.x + r.w - 26} y={r.y} width="26" height={r.h} rx="14" fill={shade} />
          {/* верхняя грань */}
          <ellipse cx={200} cy={r.y + 2} rx={r.w / 2 - 4} ry="7" fill={coat} style={{ filter: "brightness(1.05)", transition: "fill .5s" }} />

          {coating === "cream" && (
            <g fill="#fffdf8" stroke="#e5dccb" strokeWidth="1">
              {Array.from({ length: Math.floor(r.w / 22) }, (_, k) => (
                <circle key={k} cx={r.x + 14 + k * 22} cy={r.y + r.h - 3} r="7" />
              ))}
            </g>
          )}
          {coating === "glaze" && (
            <path
              d={dripPath(r.x, r.y, r.w)}
              fill={f.cream}
              style={{ transition: "fill .5s" }}
            />
          )}
          {coating === "glaze" && <rect x={r.x + 16} y={r.y + 12} width="8" height={r.h - 30} rx="4" fill="#fff" opacity="0.35" />}
          {coating === "velour" && (
            <g fill="#fff" opacity="0.12">
              {Array.from({ length: 30 }, (_, k) => (
                <circle key={k} cx={r.x + ((k * 37) % r.w)} cy={r.y + 10 + ((k * 23) % (r.h - 16))} r="1.6" />
              ))}
            </g>
          )}
        </motion.g>
      ))}

      {/* надпись на нижнем ярусе */}
      {decor.has("text") && (
        <motion.g initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={spring} style={{ transformOrigin: "200px 320px" }}>
          <rect x="130" y={base - 60} width="140" height="34" rx="17" fill="#fff" opacity="0.92" />
          <text x="200" y={base - 37} textAnchor="middle" fontFamily="Caveat Variable, cursive" fontSize="22" fill="#d6336c">
            {(text.trim() || "С днём рождения").slice(0, 18)}
          </text>
        </motion.g>
      )}

      {/* ягоды сверху */}
      {decor.has("berries") && (
        <motion.g initial={reduce ? false : { y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={spring}>
          {[-40, -18, 6, 28, 46, -30, 16].map((dx, k) => (
            <circle key={k} cx={200 + dx * (top.w / 128) * 0.85} cy={top.y - 4 - (k > 4 ? 8 : 0)} r={k % 3 === 0 ? 9 : 7} fill={k % 2 ? "#3b3f8f" : "#d6336c"} stroke="#fff" strokeOpacity=".5" />
          ))}
        </motion.g>
      )}

      {/* цветы сбоку */}
      {decor.has("flowers") && (
        <motion.g initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={spring} style={{ transformOrigin: `${rects[0].x + 30}px ${rects[0].y}px` }}>
          {[
            [rects[0].x + 22, rects[0].y + 6, 1],
            [rects[0].x + 44, rects[0].y - 2, 0.8],
            [top.x + top.w - 14, top.y - 2, 0.9],
          ].map(([cx, cy, s], k) => (
            <g key={k} transform={`translate(${cx} ${cy}) scale(${s})`}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="0" cy="-10" rx="7" ry="11" fill="#f7a8c2" transform={`rotate(${a})`} />
              ))}
              <circle r="5" fill="#ffd27a" />
            </g>
          ))}
          <path d={`M${rects[0].x + 10} ${rects[0].y + 14} q 14 -16 34 -6`} stroke="#6f9a52" strokeWidth="4" fill="none" strokeLinecap="round" />
        </motion.g>
      )}

      {/* топпер */}
      {decor.has("topper") && (
        <motion.g initial={reduce ? false : { y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={spring}>
          <rect x="198" y={top.y - 70} width="4" height="62" rx="2" fill="#c9a04a" />
          <path
            transform={`translate(200 ${top.y - 78})`}
            d="M0 -18 L5 -6 L18 -6 L8 2 L12 15 L0 7 L-12 15 L-8 2 L-18 -6 L-5 -6 Z"
            fill="#ffd27a"
            stroke="#c9a04a"
            strokeWidth="2"
          />
        </motion.g>
      )}
    </svg>
  )
}

/** Подтёки глазури по верхнему краю яруса */
function dripPath(x: number, y: number, w: number) {
  const n = Math.max(5, Math.round(w / 30))
  const step = w / n
  let d = `M${x + 6} ${y} H${x + w - 6} V${y + 10}`
  for (let i = n; i > 0; i--) {
    const cx = x + (i - 0.5) * step
    const len = 12 + ((i * 17) % 22)
    d += ` L${cx + step / 2} ${y + 10} Q${cx + 5} ${y + 10} ${cx + 4} ${y + len} a4 4 0 0 1 -8 0 Q${cx - 5} ${y + 10} ${cx - step / 2} ${y + 10}`
  }
  return d + ` L${x + 6} ${y + 10} Z`
}
