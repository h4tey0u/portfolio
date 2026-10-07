import { useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarCheckIcon,
  ClockIcon,
  CreditCardIcon,
  MapPinIcon,
  MicroscopeIcon,
  MoonStarsIcon,
  PhoneIcon,
  ReceiptIcon,
  SealCheckIcon,
  StarIcon,
  SyringeIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/shared/motion"
import { cn } from "@/lib/utils"
import { Booking } from "./Booking"
import { BOOK, DOCTORS, FULL_PRICES, PHONE, PHONE_HREF, SERVICES, TOP_PRICES } from "./data"
import hero from "./img/hero.jpg"
import office from "./img/office.jpg"
import precise from "./img/precise.jpg"

const WARNING = "Имеются противопоказания, необходима консультация специалиста."
const pill = "rounded-full"

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Painless />
        <Prices />
        <Doctors />
        <section id="booking" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Запишитесь онлайн за минуту</h2>
            <p className="mt-4 max-w-[56ch] text-muted-foreground">
              Выберите врача и время, которое вам подходит. Подтверждение придёт в SMS, звонить не нужно.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Booking />
          </Reveal>
        </section>
        <Reviews />
        <Benefits />
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
    <a href="#top" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
      <span className="flex h-7 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-full w-[5px] rounded-full bg-primary" />
        ))}
      </span>
      Ровно
    </a>
  )
}

function Header() {
  const links = [
    ["#services", "Услуги"],
    ["#prices", "Цены"],
    ["#doctors", "Врачи"],
    ["#contacts", "Контакты"],
  ]
  return (
    <header id="top" className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 rounded-full bg-card p-1 text-sm shadow-[0_1px_2px_rgb(20_34_41/0.06)] ring-1 ring-border lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="rounded-full px-4 py-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="hidden text-sm font-semibold tabular-nums md:block">{PHONE}</a>
          <Button asChild className={cn(pill, "hidden h-10 px-5 sm:inline-flex")}>
            <a href="#booking">{BOOK}</a>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 md:px-8 lg:pt-12">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Лечим зубы без боли и без сюрпризов в чеке
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
          <p className="max-w-[42ch] text-lg leading-relaxed text-muted-foreground">
            Называем полную стоимость до начала лечения и не меняем её по ходу. Анестезия уже в цене.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className={cn(pill, "h-12 px-7 text-base")}>
              <a href="#booking">{BOOK}</a>
            </Button>
            <Button asChild variant="outline" size="lg" className={cn(pill, "h-12 bg-transparent px-7 text-base")}>
              <a href="#prices">Цены</a>
            </Button>
          </div>
        </Reveal>
      </div>
      <motion.img
        src={hero}
        alt="Стоматолог обсуждает план лечения с пациенткой в кабинете"
        fetchPriority="high"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 aspect-[4/3] w-full rounded-[28px] object-cover object-[50%_35%] md:aspect-[12/5]"
      />
    </section>
  )
}

function Trust() {
  const items = [
    { icon: CalendarCheckIcon, title: "С 2011 года", text: "на Петроградской" },
    { icon: SealCheckIcon, title: "18 врачей", text: "в штате клиники" },
    { icon: StarIcon, title: "4,9 из 5", text: "по 1 240 отзывам на картах" },
    { icon: ReceiptIcon, title: "Лицензия", text: "и справка для налогового вычета" },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-tint text-primary">
              <Icon size={22} weight="fill" />
            </span>
            <span>
              <span className="block font-bold">{title}</span>
              <span className="text-sm text-muted-foreground">{text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Services() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const s = SERVICES[active]
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Что мы лечим</h2>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
        <div role="tablist" aria-label="Услуги" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
          {SERVICES.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={i === active}
              aria-controls="service-panel"
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full px-5 py-3 text-left text-sm font-semibold transition-colors lg:text-base",
                i === active ? "bg-ink text-white" : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground",
              )}
            >
              {item.tab}
            </button>
          ))}
        </div>
        <div id="service-panel" role="tabpanel" className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid overflow-hidden rounded-[28px] bg-card ring-1 ring-border md:grid-cols-2"
            >
              <img src={s.img} alt={s.title} className="aspect-[4/3] size-full object-cover md:aspect-auto md:min-h-[380px]" />
              <div className="flex flex-col p-7 md:p-10">
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{s.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
                <dl className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs text-muted-foreground">Стоимость</dt>
                    <dd className="mt-1 text-xl font-bold tabular-nums">{s.price}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Срок</dt>
                    <dd className="mt-1 text-xl font-bold">{s.time}</dd>
                  </div>
                </dl>
                <Button asChild size="lg" className={cn(pill, "mt-auto h-12 self-start px-7")} style={{ marginTop: "2.5rem" }}>
                  <a href="#booking">{BOOK}</a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Painless() {
  const ways = [
    { icon: SyringeIcon, title: "Компьютерная анестезия", text: "Препарат подаётся медленно и точно, укол почти не чувствуется. Онемение без «тяжёлой» щеки на полдня." },
    { icon: MoonStarsIcon, title: "Лечение во сне", text: "Седация под контролем анестезиолога. Вы дремлете, а врач за один визит делает то, что обычно занимает три." },
    { icon: MicroscopeIcon, title: "Работа под микроскопом", text: "Увеличение в 25 раз. Убираем только поражённые ткани, поэтому меньше сверлим и меньше болит после." },
  ]
  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <h2 className="max-w-[16ch] text-3xl font-bold tracking-tight md:text-5xl">Почему у нас не больно</h2>
            <p className="mt-4 max-w-[46ch] text-white/70">
              Три из четырёх наших пациентов раньше откладывали визит к стоматологу из-за страха. Вот что мы с этим делаем.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={precise} alt="Осмотр зубов с зеркалом и инструментом" loading="lazy" className="mt-10 aspect-[3/2] w-full rounded-[28px] object-cover" />
          </Reveal>
        </div>
        <ul className="grid content-center gap-4">
          {ways.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <li className="flex gap-5 rounded-[20px] bg-white/[0.06] p-6 ring-1 ring-white/10 md:p-7">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <Icon size={22} weight="fill" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-white/70">{text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Prices() {
  return (
    <section id="prices" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Цены без звёздочек</h2>
        <p className="mt-4 max-w-[58ch] text-muted-foreground">
          Стоимость, которую вы видите, включает анестезию, снимки во время лечения и контрольный осмотр.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOP_PRICES.map(([name, price], i) => (
          <Reveal key={name} delay={i * 0.05}>
            <div className={cn("flex h-full flex-col justify-between gap-6 rounded-[20px] p-6", i === 0 ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-border")}>
              <p className={cn("font-medium", i === 0 ? "text-white/85" : "text-muted-foreground")}>{name}</p>
              <p className="text-3xl font-extrabold tracking-tight tabular-nums">{price}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-10">
        <Accordion type="single" collapsible className="rounded-[20px] bg-card px-6 ring-1 ring-border md:px-8">
          {FULL_PRICES.map((g) => (
            <AccordionItem key={g.group} value={g.group} className="border-border">
              <AccordionTrigger className="py-5 text-base font-bold hover:no-underline">{g.group}</AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-x-10 gap-y-3 pb-3 md:grid-cols-2">
                  {g.items.map(([n, p]) => (
                    <li key={n} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-muted-foreground">{n}</span>
                      <span className="shrink-0 font-semibold tabular-nums">{p}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-4 text-xs text-muted-foreground">{WARNING} Цены действительны на октябрь 2026 года и не являются публичной офертой.</p>
      </Reveal>
    </section>
  )
}

function Doctors() {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 320, behavior: "smooth" })
  return (
    <section id="doctors" className="overflow-hidden bg-tint py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Врачи клиники</h2>
          </Reveal>
          <div className="hidden gap-2 md:flex">
            <Button variant="outline" size="icon-lg" className={cn(pill, "size-12 bg-card")} onClick={() => scroll(-1)} aria-label="Предыдущие врачи">
              <ArrowLeftIcon size={18} />
            </Button>
            <Button variant="outline" size="icon-lg" className={cn(pill, "size-12 bg-card")} onClick={() => scroll(1)} aria-label="Следующие врачи">
              <ArrowRightIcon size={18} />
            </Button>
          </div>
        </div>
        <div ref={track} className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          {Object.values(DOCTORS).map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06} className="w-[78%] shrink-0 snap-start sm:w-[300px]">
              <article className="h-full overflow-hidden rounded-[20px] bg-card">
                <img src={d.photo} alt={d.name} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
                <div className="p-5">
                  <h3 className="text-lg font-bold">{d.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.role}</p>
                  <p className="mt-3 text-sm font-semibold text-primary">Стаж {d.years} {d.years % 10 === 1 && d.years !== 11 ? "год" : d.years % 10 >= 2 && d.years % 10 <= 4 && (d.years < 12 || d.years > 14) ? "года" : "лет"}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const reviews = [
    { text: "Двадцать лет боялась стоматологов. Здесь лечила три зуба во сне, проснулась и всё уже готово.", name: "Анна Белоусова", info: "лечение под седацией" },
    { text: "В другой клинике насчитали 240 тысяч. Здесь сохранили два зуба, которые предлагали удалить, вышло вдвое дешевле.", name: "Михаил Зорин", info: "терапия и имплантация" },
    { text: "Сын сам просится к Елене Игоревне. Первый раз просто посидели в кресле и посмотрели инструменты.", name: "Ксения Ларионова", info: "детский приём" },
  ]
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="text-7xl font-extrabold tracking-tight tabular-nums md:text-8xl">4,9</p>
          <div className="mt-3 flex gap-1 text-primary" aria-label="Рейтинг 4,9 из 5">
            {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={22} weight="fill" />)}
          </div>
          <p className="mt-4 max-w-[28ch] text-muted-foreground">Средняя оценка по 1 240 отзывам на Яндекс Картах и 2ГИС</p>
        </Reveal>
        <div className="grid gap-4 lg:col-span-8">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <blockquote className={cn("rounded-[20px] bg-card p-6 ring-1 ring-border md:p-7", i === 1 && "lg:ml-12")}>
                <p className="text-lg leading-relaxed">«{r.text}»</p>
                <footer className="mt-4 text-sm">
                  <span className="font-bold">{r.name}</span>
                  <span className="text-muted-foreground">, {r.info}</span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  const items = [
    { icon: CalendarCheckIcon, title: "Консультация бесплатно", text: "Осмотр, снимок и письменный план лечения с ценами." },
    { icon: CreditCardIcon, title: "Рассрочка 0%", text: "На имплантацию и ортодонтию до 12 месяцев, без банков." },
    { icon: ReceiptIcon, title: "Вернём 13%", text: "Соберём документы для налогового вычета за лечение." },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
      <div className="grid divide-y divide-border rounded-[28px] bg-card ring-1 ring-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="p-7 md:p-9">
              <Icon size={28} weight="duotone" className="text-primary" />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Faq() {
  const faq = [
    ["Сколько стоит первый визит?", "Консультация бесплатная. Врач проведёт осмотр, сделает прицельный снимок и выдаст письменный план лечения с ценами. Решение принимаете вы, без давления."],
    ["Может ли цена вырасти во время лечения?", "Нет. Если в процессе выяснится, что нужно больше работы, врач остановится, объяснит причину и согласует с вами. Без вашей подписи сумма не меняется."],
    ["Можно ли лечить зубы во время беременности?", "Да, во втором триместре это безопасно. Используем анестетики, разрешённые при беременности, и снимки с минимальной дозой."],
    ["С какого возраста можно приводить ребёнка?", "Первый осмотр в год, дальше раз в полгода. Если ребёнок боится, начнём с визита-знакомства без лечения."],
    ["Какая гарантия на лечение?", "На пломбы 2 года, на коронки и виниры 5 лет, на импланты пожизненная гарантия производителя. Условия прописаны в договоре."],
    ["Вы работаете по ДМС?", "Да, с большинством страховых компаний Санкт-Петербурга. Уточните у администратора, входит ли ваша программа."],
  ]
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-5xl">Ответы на частые вопросы</h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <Accordion type="single" collapsible className="grid gap-3">
          {faq.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="rounded-[20px] border-0 bg-card px-6 ring-1 ring-border">
              <AccordionTrigger className="py-5 text-left text-base font-bold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Contacts() {
  return (
    <section id="contacts" className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
      <Reveal>
        <div className="grid overflow-hidden rounded-[28px] bg-ink text-white lg:grid-cols-2">
          <div className="p-7 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ждём вас на Петроградской</h2>
            <ul className="mt-8 grid gap-5">
              <li className="flex gap-4">
                <MapPinIcon size={22} className="mt-0.5 shrink-0 text-white/60" />
                <span>Большой проспект П.С.<span className="block text-sm text-white/60">5 минут пешком от м. Петроградская</span></span>
              </li>
              <li className="flex gap-4">
                <ClockIcon size={22} className="mt-0.5 shrink-0 text-white/60" />
                <span>Пн-Сб, 9:00-21:00<span className="block text-sm text-white/60">Воскресенье выходной</span></span>
              </li>
              <li className="flex gap-4">
                <PhoneIcon size={22} className="mt-0.5 shrink-0 text-white/60" />
                <a href={PHONE_HREF} className="font-semibold tabular-nums">{PHONE}</a>
              </li>
            </ul>
            <Button asChild size="lg" className={cn(pill, "mt-10 h-12 px-7 text-base")}>
              <a href="#booking">{BOOK}</a>
            </Button>
          </div>
          <img src={office} alt="Кабинет клиники «Ровно»" loading="lazy" className="aspect-[4/3] size-full object-cover lg:aspect-auto" />
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-muted-foreground md:grid-cols-[auto_1fr] md:gap-16 md:px-8">
        <div className="text-foreground"><Logo /></div>
        <div className="grid gap-3">
          <p className="font-semibold text-foreground">{WARNING}</p>
        </div>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 bg-background/95 p-3 shadow-[0_-1px_0_var(--border)] backdrop-blur-md md:hidden">
      <Button asChild variant="outline" size="lg" className={cn(pill, "size-12 bg-transparent p-0")}>
        <a href={PHONE_HREF} aria-label="Позвонить в клинику">
          <PhoneIcon size={20} />
        </a>
      </Button>
      <Button asChild size="lg" className={cn(pill, "h-12 text-base")}>
        <a href="#booking">{BOOK}</a>
      </Button>
    </div>
  )
}
