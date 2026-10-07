import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowCounterClockwiseIcon, CheckCircleIcon, InfoIcon, WarningIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CTA } from "./data"

type Answer = string
const QUESTIONS: { id: string; q: string; hint: string; options: [Answer, string][] }[] = [
  {
    id: "debt",
    q: "Какая общая сумма долгов?",
    hint: "Кредиты, микрозаймы, кредитные карты, долги по ЖКХ и налогам.",
    options: [["low", "До 25 тыс. ₽"], ["mid", "25 тыс. - 1 млн ₽"], ["high", "1-3 млн ₽"], ["xhigh", "Больше 3 млн ₽"]],
  },
  {
    id: "fssp",
    q: "Приставы закрыли производство, потому что у вас нет имущества?",
    hint: "Это видно на сайте ФССП: в графе «Причина окончания» стоит п. 4 ч. 1 ст. 46.",
    options: [["yes", "Да"], ["no", "Нет"], ["unknown", "Не знаю"]],
  },
  {
    id: "property",
    q: "Есть ли имущество, кроме единственного жилья?",
    hint: "Машина, вторая квартира, дача, доля, земельный участок.",
    options: [["no", "Нет"], ["yes", "Да"]],
  },
  {
    id: "deals",
    q: "Продавали или дарили имущество за последние 3 года?",
    hint: "Финансовый управляющий проверяет все сделки за этот период.",
    options: [["no", "Нет"], ["yes", "Да"]],
  },
]

type Verdict = { tone: "ok" | "info" | "risk"; title: string; text: string; price: string; term: string }

function verdict(a: Record<string, Answer>): Verdict {
  if (a.debt === "low")
    return {
      tone: "info",
      title: "Банкротство вам не нужно",
      text: "Долг ниже порога для процедуры. Обычно такие вопросы решаются переговорами с кредитором или реструктуризацией.",
      price: "Консультация бесплатно",
      term: "1 встреча",
    }
  if (a.deals === "yes")
    return {
      tone: "risk",
      title: "Есть риски, нужна консультация",
      text: "Сделки за последние 3 года могут оспорить. Это не значит, что банкротство невозможно, но без юриста здесь легко ошибиться.",
      price: "Консультация бесплатно",
      term: "Ответ в день обращения",
    }
  if (a.debt === "mid" && a.fssp === "yes")
    return {
      tone: "ok",
      title: "Подходит бесплатное банкротство через МФЦ",
      text: "Процедура без суда и финансового управляющего. Мы подготовим заявление и проверим, что МФЦ его не вернёт.",
      price: "15 000 ₽ за подготовку",
      term: "6 месяцев",
    }
  return {
    tone: "ok",
    title: "Подходит судебное банкротство",
    text:
      a.property === "yes"
        ? "Долги можно списать. Имущество, кроме единственного жилья, могут продать в процедуре. На консультации разберём, что из него реально сохранить."
        : "Долги можно списать полностью. Единственное жильё и личные вещи останутся с вами, звонки коллекторов прекратятся после подачи заявления.",
    price: "от 120 000 ₽, рассрочка от 12 000 ₽/мес",
    term: "6-9 месяцев",
  }
}

const ICON = { ok: CheckCircleIcon, info: InfoIcon, risk: WarningIcon }

export function Quiz() {
  const reduce = useReducedMotion()
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [step, setStep] = useState(0)
  const done = step >= QUESTIONS.length
  const q = QUESTIONS[step]

  function answer(value: Answer) {
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    // При маленьком долге или после сделок дальнейшие вопросы не влияют на вывод
    setStep(q.id === "debt" && value === "low" ? QUESTIONS.length : step + 1)
  }

  const v = done ? verdict(answers) : null
  const Icon = v ? ICON[v.tone] : null

  return (
    <div className="border border-ink bg-card">
      <div className="flex items-center justify-between border-b border-ink px-5 py-3 font-mono text-xs md:px-8">
        <span>Проверка: можно ли списать долги</span>
        <span>{done ? "Готово" : `Вопрос ${step + 1} из ${QUESTIONS.length}`}</span>
      </div>
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        />
      </div>

      <div className="min-h-[360px] p-5 md:p-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={done ? "result" : step}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {!done && (
              <>
                <h3 className="max-w-[30ch] text-2xl font-semibold tracking-tight md:text-3xl">{q.q}</h3>
                <p className="mt-3 max-w-[60ch] text-sm text-muted-foreground">{q.hint}</p>
                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {q.options.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => answer(value)}
                      className={cn(
                        "flex items-center justify-between border px-5 py-4 text-left font-medium transition-colors active:translate-y-px",
                        answers[q.id] === value ? "border-primary bg-accent" : "border-input bg-background hover:border-ink",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="mt-6 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                    Назад
                  </button>
                )}
              </>
            )}

            {v && Icon && (
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <Icon size={36} weight="duotone" className={v.tone === "risk" ? "text-amber-700" : "text-primary"} />
                  <h3 className="mt-4 max-w-[26ch] text-2xl font-semibold tracking-tight md:text-3xl">{v.title}</h3>
                  <p className="mt-3 max-w-[58ch] leading-relaxed text-muted-foreground">{v.text}</p>
                  <dl className="mt-8 grid max-w-xl grid-cols-2 border-t border-border pt-5 font-mono text-sm">
                    <div>
                      <dt className="text-xs text-muted-foreground">Стоимость</dt>
                      <dd className="mt-1">{v.price}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Срок</dt>
                      <dd className="mt-1">{v.term}</dd>
                    </div>
                  </dl>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="h-12 px-6 text-base">
                    <a href="#contacts">{CTA}</a>
                  </Button>
                  <button
                    type="button"
                    onClick={() => { setAnswers({}); setStep(0) }}
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowCounterClockwiseIcon size={16} /> Пройти заново
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="border-t border-border px-5 py-3 text-xs text-muted-foreground md:px-8">
        Результат предварительный и не является юридическим заключением.
      </p>
    </div>
  )
}
