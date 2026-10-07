import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowDownRightIcon, ArrowUpRightIcon, ClockIcon, HandshakeIcon, MapPinIcon, PhoneIcon, ScalesIcon, ShieldCheckIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CountUp, Reveal } from "@/shared/motion"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"
import { Quiz } from "./Quiz"
import { BANKRUPTCY_STEPS, CASES, CTA, FAMILY, MYTHS, PHONE, PHONE_HREF, PRICES, TEAM } from "./data"
import hero from "./img/hero.jpg"
import debt from "./img/debt.jpg"
import family from "./img/family.jpg"
import keys from "./img/keys.jpg"
import docs from "./img/docs.jpg"

const wrap = "mx-auto max-w-7xl px-4 md:px-8"
const h2 = "text-3xl font-semibold tracking-tight md:text-5xl"

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <section id="debt" className={cn(wrap, "py-20 md:py-28")}>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <img src={debt} alt="Женщина с чашкой у окна" loading="lazy" className="hidden aspect-[4/5] w-full lg:block rounded-[var(--radius)] object-cover grayscale-[0.3]" />
            </Reveal>
            <div className="lg:col-span-8">
              <Reveal>
                <p className="font-mono text-sm text-primary">Банкротство граждан</p>
                <h2 className={cn(h2, "mt-3 max-w-[20ch]")}>Узнайте за минуту, можно ли списать ваши долги</h2>
                <p className="mt-4 max-w-[58ch] text-muted-foreground">
                  Четыре вопроса, без телефона и регистрации. Ответ покажет подходящую процедуру, её цену и срок.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-10">
                <Quiz />
              </Reveal>
            </div>
          </div>
        </section>
        <Myths />
        <Steps />
        <Family />
        <Prices />
        <Cases />
        <Team />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <span className="grid size-9 place-items-center bg-ink font-mono text-sm font-medium text-paper">К&П</span>
      <span className="leading-tight">
        <span className="block font-semibold">Коршунов и партнёры</span>
        <span className="block text-xs text-muted-foreground">юридическая фирма</span>
      </span>
    </a>
  )
}

function Header() {
  const links = [
    ["#debt", "Банкротство"],
    ["#family", "Семейные споры"],
    ["#prices", "Цены"],
    ["#team", "Юристы"],
  ]
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-ink/15 bg-background/90 backdrop-blur-md">
      <div className={cn(wrap, "flex h-16 items-center justify-between gap-6")}>
        <Logo />
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-muted-foreground transition-colors hover:text-foreground">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="hidden font-mono text-sm md:block">{PHONE}</a>
          <Button asChild className="hidden h-10 px-4 sm:inline-flex">
            <a href="#contacts">{CTA}</a>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const doors = [
    { href: "#debt", icon: ScalesIcon, title: "Списать долги", text: "Банкротство через суд или бесплатно через МФЦ. Остановим звонки коллекторов.", tag: "от 15 000 ₽" },
    { href: "#family", icon: HandshakeIcon, title: "Развод и раздел имущества", text: "Квартира, ипотека, алименты, дети. Защищаем ваши интересы в суде и до него.", tag: "от 12 000 ₽" },
  ]
  return (
    <section className={cn(wrap, "pt-10 pb-16 md:pt-14")}>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight md:text-5xl lg:text-[3.6rem]">
              Списываем долги и решаем семейные споры. По договору с фиксированной ценой
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-muted-foreground">
              Вернём деньги, если суд откажет в списании долгов по нашей вине. Это условие прописано в договоре.
            </p>
          </Reveal>
        </div>
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={hero} alt="Юрист консультирует клиента в офисе" fetchPriority="high" className="aspect-[16/10] w-full rounded-[var(--radius)] object-cover object-[60%_center]" />
        </motion.div>
      </div>

      <div className="mt-10 grid gap-px border border-ink bg-ink md:grid-cols-2">
        {doors.map(({ href, icon: Icon, title, text, tag }, i) => (
          <Reveal key={href} delay={0.15 + i * 0.08}>
            <a href={href} className="group flex h-full flex-col gap-6 bg-card p-6 transition-colors hover:bg-ink hover:text-paper md:flex-row md:items-center md:p-8">
              <Icon size={40} weight="thin" className="shrink-0 text-primary transition-colors group-hover:text-paper" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                <p className="mt-1.5 max-w-[46ch] text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-paper/70">{text}</p>
              </div>
              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                <span className="font-mono text-sm">{tag}</span>
                <ArrowDownRightIcon size={26} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Stats() {
  const items = [
    { to: 11, suffix: "", label: "лет практики в Саратове" },
    { to: 1400, suffix: "+", label: "завершённых дел", format: (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n)) },
    { to: 2.1, suffix: " млрд ₽", label: "долгов клиентов списано", format: (n: number) => n.toFixed(1).replace(".", ",") },
    { to: 0, suffix: " ₽", label: "доплат сверх договора" },
  ]
  return (
    <section className="border-y border-ink bg-ink text-paper">
      <div className={cn(wrap, "grid grid-cols-2 lg:grid-cols-4")}>
        {items.map((it, i) => (
          <div key={it.label} className={cn("py-8 pr-4 lg:py-10", i % 2 === 1 && "pl-4 lg:pl-0", i > 0 && "lg:border-l lg:border-paper/15 lg:pl-8")}>
            <p className="font-mono text-2xl whitespace-nowrap sm:text-3xl md:text-4xl">
              <CountUp to={it.to} format={it.format} />
              {it.suffix}
            </p>
            <p className="mt-1 text-sm text-paper/65">{it.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Myths() {
  const [open, setOpen] = useState<number[]>([])
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))
  return (
    <section className="border-t border-border bg-card py-20 md:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={cn(h2, "max-w-[22ch]")}>Чего боятся перед банкротством и как на самом деле</h2>
          <p className="mt-4 text-muted-foreground">Нажмите на карточку, чтобы перевернуть.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MYTHS.map(([myth, truth], i) => (
            <Reveal key={myth} delay={i * 0.06}>
              <button
                type="button"
                data-open={open.includes(i)}
                aria-pressed={open.includes(i)}
                onClick={() => toggle(i)}
                className="flip block h-[260px] w-full text-left"
              >
                <span className="flip-inner relative block size-full">
                  <span className="flip-face absolute inset-0 flex flex-col justify-between border border-ink bg-background p-6">
                    <span className="font-mono text-xs text-muted-foreground">Миф</span>
                    <span className="text-2xl leading-snug font-semibold tracking-tight">«{myth}»</span>
                    <span className="flex items-center gap-2 text-sm text-primary">
                      Как на самом деле <ArrowUpRightIcon size={14} />
                    </span>
                  </span>
                  <span className="flip-face flip-back absolute inset-0 flex flex-col justify-between border border-primary bg-primary p-6 text-primary-foreground">
                    <span className="font-mono text-xs opacity-75">Правда</span>
                    <span className="leading-relaxed">{truth}</span>
                    <span className="text-sm opacity-75">Нажмите, чтобы вернуть</span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section className={cn(wrap, "py-20 md:py-28")}>
      <Reveal>
        <h2 className={h2}>Как проходит судебное банкротство</h2>
        <p className="mt-4 max-w-[58ch] text-muted-foreground">От первой встречи до определения суда обычно 6-9 месяцев. Ходить на заседания вам не нужно.</p>
      </Reveal>
      <ol className="mt-12 grid gap-px border border-border bg-border md:grid-cols-5">
        {BANKRUPTCY_STEPS.map(([title, text, term], i) => (
          <Reveal key={title} delay={i * 0.06} className="h-full">
            <li className="relative flex h-full flex-col bg-background p-6">
              <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <p className="mt-auto pt-6 font-mono text-xs">{term}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Family() {
  return (
    <section id="family" className="border-y border-border bg-card py-20 md:py-28">
      <div className={cn(wrap, "grid gap-12 lg:grid-cols-12")}>
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-sm text-primary">Семейные споры</p>
            <h2 className={cn(h2, "mt-3")}>Развод без войны, если это возможно. И с защитой, если нет</h2>
            <p className="mt-4 max-w-[48ch] text-muted-foreground">
              Сначала пробуем договориться: мировое соглашение быстрее и дешевле суда. Если вторая сторона не идёт на контакт, представляем вас в суде.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={family} alt="Родители с ребёнком идут по горной тропе" loading="lazy" className="mt-10 aspect-[4/3] w-full rounded-[var(--radius)] object-cover" />
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="border-t border-ink">
            {FAMILY.map(([title, text, price], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <li className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-border py-6">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <span className="row-span-2 self-center font-mono text-sm whitespace-nowrap">{price}</span>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <Button asChild size="lg" className="mt-8 h-12 px-6 text-base">
              <a href="#contacts">{CTA}</a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Prices() {
  return (
    <section id="prices" className={cn(wrap, "py-20 md:py-28")}>
      <Reveal>
        <h2 className={h2}>Прейскурант</h2>
        <p className="mt-4 max-w-[58ch] text-muted-foreground">Цена фиксируется в договоре до начала работы и не меняется, сколько бы заседаний ни понадобилось.</p>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {PRICES.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full border border-ink bg-card">
              <h3 className="border-b border-ink px-6 py-4 font-semibold">{p.title}</h3>
              <dl className="px-6">
                {p.rows.map(([name, price]) => (
                  <div key={name} className="flex items-baseline gap-3 border-b border-dashed border-border py-4 last:border-0">
                    <dt>{name}</dt>
                    <span className="flex-1 translate-y-[-4px] border-b border-dotted border-input" aria-hidden />
                    <dd className="font-mono text-sm whitespace-nowrap">{price}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-border bg-background px-6 py-4 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Cases() {
  return (
    <section className="border-t border-border bg-card py-20 md:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>Из практики</h2>
          <p className="mt-4 text-muted-foreground">Имена клиентов не раскрываем, номера дел внутренние.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
          {CASES.map((c, i) => (
            <Reveal key={c.num} delay={i * 0.08} className="h-full">
              <article className={cn("relative flex h-full flex-col overflow-hidden border border-ink", i === 0 ? "min-h-[360px] text-paper" : "bg-background")}>
                {i === 0 && (
                  <>
                    <img src={keys} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
                  </>
                )}
                <div className="relative flex h-full flex-col p-6 md:p-8">
                  <span className={cn("font-mono text-xs", i === 0 ? "text-paper/70" : "text-muted-foreground")}>{c.num}</span>
                  <p className={cn("mt-auto pt-16 font-mono text-4xl md:text-5xl", i !== 0 && "text-primary")}>{c.amount}</p>
                  <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", i === 0 ? "text-paper/75" : "text-muted-foreground")}>{c.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="team" className={cn(wrap, "py-20 md:py-28")}>
      <Reveal>
        <h2 className={h2}>Кто будет вести ваше дело</h2>
        <p className="mt-4 max-w-[58ch] text-muted-foreground">Дело ведёт один юрист от начала до конца. Его телефон вы получите в день подписания договора.</p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {TEAM.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure>
              <img src={t.photo} alt={t.name} loading="lazy" className="aspect-[4/5] w-full rounded-[var(--radius)] object-cover object-[25%_20%] grayscale" />
              <figcaption className="mt-4 border-t border-ink pt-4">
                <p className="text-lg font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}, {t.area.toLowerCase()}</p>
                <p className="mt-2 font-mono text-xs">Стаж {t.years} лет</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Faq() {
  const faq = [
    ["Сколько стоит банкротство на самом деле?", "Наша работа 120 000 ₽ по договору плюс обязательные расходы около 45 000 ₽: депозит управляющего и публикации. Других платежей нет. Рассрочка на 10 месяцев без процентов."],
    ["Перестанут ли звонить коллекторы?", "Да. После того как суд принимает заявление, все требования идут только через процедуру. Звонки и визиты коллекторов становятся незаконными."],
    ["Что будет с моей зарплатой?", "Во время процедуры вы получаете прожиточный минимум на себя и детей. Остальное идёт в счёт долгов. После списания доход полностью ваш."],
    ["Можно ли развестись, если супруг против?", "Да, через суд. Суд может дать до трёх месяцев на примирение, но если вы настаиваете, брак расторгнут."],
    ["Делится ли ипотечная квартира при разводе?", "Да, и квартира, и остаток долга делятся между супругами. Есть исключения: добрачные деньги, подарки, наследство. Их мы и доказываем."],
  ]
  return (
    <section className="border-t border-border bg-card py-20 md:py-28">
      <div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
        <Reveal className="lg:col-span-4">
          <h2 className={h2}>Частые вопросы</h2>
          <img src={docs} alt="Человек подписывает документы ручкой" loading="lazy" className="mt-8 hidden aspect-[4/3] w-full rounded-[var(--radius)] object-cover grayscale lg:block" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible className="border-t border-ink">
            {faq.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-border">
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="max-w-[62ch] pb-5 text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Contacts() {
  return (
    <section id="contacts" className={cn(wrap, "py-20 md:py-28")}>
      <Reveal>
        <div className="grid border border-ink lg:grid-cols-2">
          <div className="bg-ink p-7 text-paper md:p-12">
            <h2 className={h2}>Первая консультация бесплатно</h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-paper/70">
              Изучим документы и скажем честно, есть ли смысл идти в суд. Можно в офисе или по видеосвязи.
            </p>
            <ul className="mt-10 grid gap-5 text-sm">
              <li className="flex gap-4"><MapPinIcon size={20} className="shrink-0 text-paper/60" /><span>Саратов, ул. Московская<span className="block text-paper/60">Бизнес-центр, 4 этаж, офис 412</span></span></li>
              <li className="flex gap-4"><ClockIcon size={20} className="shrink-0 text-paper/60" />Пн-Пт 9:00-19:00, Сб 10:00-15:00</li>
              <li className="flex gap-4"><PhoneIcon size={20} className="shrink-0 text-paper/60" /><a href={PHONE_HREF} className="font-mono">{PHONE}</a></li>
              <li className="flex gap-4"><ShieldCheckIcon size={20} className="shrink-0 text-paper/60" />Конфиденциальность по договору и 152-ФЗ</li>
            </ul>
          </div>
          <div className="bg-card p-7 md:p-12">
            <h3 className="text-2xl font-semibold">Оставьте телефон</h3>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">Юрист перезвонит в течение часа в рабочее время.</p>
            <LeadForm
              submitLabel={CTA}
              successText="Юрист перезвонит в течение часа в рабочее время."
              note="Нажимая кнопку, вы соглашаетесь на обработку персональных данных."
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-ink pb-24 md:pb-0">
      <div className={cn(wrap, "grid gap-6 py-10 text-sm text-muted-foreground md:grid-cols-[auto_1fr] md:gap-16")}>
        <div className="text-foreground"><Logo /></div>
        <p className="md:text-right">© 2026 Юридическая фирма «Коршунов и партнёры»</p>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t border-ink bg-background/95 p-3 backdrop-blur-md md:hidden">
      <Button asChild variant="outline" size="lg" className="size-12 bg-transparent p-0">
        <a href={PHONE_HREF} aria-label="Позвонить юристу">
          <PhoneIcon size={20} />
        </a>
      </Button>
      <Button asChild size="lg" className="h-12 text-base">
        <a href="#contacts">{CTA}</a>
      </Button>
    </div>
  )
}
