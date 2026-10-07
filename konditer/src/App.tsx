import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CakeIcon, CalendarCheckIcon, ClockIcon, CookieIcon, MapPinIcon, PhoneIcon, TelegramLogoIcon, TruckIcon, WalletIcon } from "@phosphor-icons/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/shared/motion"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"
import { Constructor } from "./Constructor"
import { CATALOG, CATEGORIES, FILLINGS, ORDER, PHONE, PHONE_HREF, type Category, type FillingId } from "./data"
import hero from "./img/hero.jpg"

const wrap = "mx-auto max-w-7xl px-4 md:px-8"
const h2 = "text-4xl font-bold leading-[1.05] md:text-6xl"
const btn = "inline-flex items-center justify-center rounded-full font-semibold transition-transform hover:-rotate-2 active:scale-95"

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="constructor" className={cn(wrap, "py-20 md:py-28")}>
          <Reveal>
            <p className="font-hand text-3xl text-primary">попробуйте, это весело</p>
            <h2 className={h2}>Соберите свой торт</h2>
            <p className="mt-4 max-w-[54ch] text-lg text-muted-foreground">Выберите начинку, покрытие и декор. Торт соберётся прямо на экране, а цена посчитается сама.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Constructor />
          </Reveal>
        </section>
        <Fillings />
        <Catalog />
        <Steps />
        <Reviews />
        <Delivery />
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
    <a href="#top" className="flex items-baseline gap-1 text-2xl font-extrabold tracking-tight">
      безе<span className="font-hand text-3xl font-normal text-primary">♥</span>
    </a>
  )
}

function Header() {
  const links = [
    ["#constructor", "Конструктор"],
    ["#fillings", "Начинки"],
    ["#catalog", "Каталог"],
    ["#delivery", "Доставка"],
  ]
  return (
    <header id="top" className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
      <div className={cn(wrap, "flex h-16 items-center justify-between gap-6")}>
        <Logo />
        <nav className="hidden items-center gap-8 font-medium lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-ink/70 transition-colors hover:text-primary">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="hidden text-sm font-medium tabular-nums md:block">{PHONE}</a>
          <a href="#constructor" className={cn(btn, "hidden h-10 bg-primary px-5 text-sm text-primary-foreground sm:inline-flex")}>{ORDER}</a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className={cn(wrap, "grid items-center gap-10 pt-6 pb-16 lg:min-h-[min(calc(100dvh-4rem),820px)] lg:grid-cols-2 lg:gap-6 lg:py-8")}>
      <div className="order-2 lg:order-1">
        <Reveal>
          <h1 className="text-5xl leading-[1] font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Торты, которые съедают <span className="text-primary">до последней крошки</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted-foreground">
            Печём на заказ в Москве из сливочного масла и свежих ягод. Без маргарина, растительных сливок и мастики.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#constructor" className={cn(btn, "h-14 bg-primary px-8 text-lg text-primary-foreground shadow-[0_12px_30px_-10px_rgb(201_42_99/0.6)]")}>{ORDER}</a>
          <a href="#catalog" className={cn(btn, "h-14 bg-pistachio px-8 text-lg")}>Каталог</a>
        </Reveal>
      </div>
      <div className="relative order-1 lg:order-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-[42%_58%_55%_45%/52%_44%_56%_48%] bg-pistachio"
        >
          <img src={hero} alt="Ягодный торт на мятной подставке" fetchPriority="high" className="size-full object-cover object-[50%_40%]" />
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 12 }}
          className="absolute bottom-6 left-0 rounded-3xl bg-card px-5 py-3 shadow-[0_20px_40px_-20px_rgb(31_42_30/0.4)] md:left-4"
        >
          <p className="font-hand text-2xl leading-none text-primary">от 2 600 ₽ за кг</p>
          <p className="mt-1 text-xs text-muted-foreground">готовим за 3 дня</p>
        </motion.div>
      </div>
    </section>
  )
}

function Fillings() {
  return (
    <section id="fillings" className="rounded-t-[48px] bg-pistachio/45 py-20 md:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>Шесть начинок</h2>
          <p className="mt-4 max-w-[54ch] text-lg text-muted-foreground">Можно смешать две начинки в многоярусном торте. Аллергены указываем честно.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(FILLINGS) as FillingId[]).map((id, i) => {
            const f = FILLINGS[id]
            return (
              <Reveal key={id} delay={(i % 3) * 0.07}>
                <article className="group h-full overflow-hidden rounded-[28px] bg-card transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg]">
                  <div className="overflow-hidden">
                    <img src={f.img} alt={`Торт «${f.name}» в разрезе`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-xl font-bold">{f.name}</h3>
                      <span className="font-semibold whitespace-nowrap text-primary tabular-nums">{new Intl.NumberFormat("ru-RU").format(f.perKg)} ₽/кг</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {f.allergens.map((a) => (
                        <span key={a} className="rounded-full bg-secondary px-2.5 py-1 text-xs">{a}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Catalog() {
  const reduce = useReducedMotion()
  const [cat, setCat] = useState<Category>("Все")
  const items = CATALOG.filter((c) => cat === "Все" || c.cat === cat)
  return (
    <section id="catalog" className={cn(wrap, "py-20 md:py-28")}>
      <Reveal>
        <h2 className={h2}>Что мы печём</h2>
      </Reveal>
      <div role="tablist" className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={c === cat}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full px-5 py-2.5 font-medium transition-all active:scale-95",
              c === cat ? "bg-ink text-background" : "bg-card text-ink/70 hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.div layout={!reduce} className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((c) => (
            <motion.figure
              key={c.name}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group"
            >
              <div className="overflow-hidden rounded-[24px] bg-muted">
                <img src={c.img} alt={c.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <figcaption className="mt-3 px-1">
                <p className="font-semibold leading-tight">{c.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.price}</p>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

function Steps() {
  const steps = [
    { icon: CalendarCheckIcon, title: "За 3 дня", text: "Столько нужно, чтобы бисквит настоялся. Свадебные торты за 2 недели.", note: "можно и быстрее, спросите" },
    { icon: WalletIcon, title: "Предоплата 50%", text: "Остальное при получении. Перенос даты бесплатно за 48 часов." },
    { icon: CookieIcon, title: "Дегустация", text: "Для свадебных тортов бесплатный сет из 4 начинок за неделю до заказа.", note: "все любят этот пункт" },
    { icon: TruckIcon, title: "Доставка", text: "В термобоксе к нужному часу. Курьер поможет поставить торт на стол." },
  ]
  return (
    <section className="bg-ink py-20 text-background md:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>Как заказать</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text, note }, i) => (
            <Reveal key={title} delay={i * 0.07}>
              <div className="relative h-full rounded-[28px] bg-background/[0.06] p-7 ring-1 ring-background/10">
                <span className="grid size-14 place-items-center rounded-full bg-pistachio text-ink">
                  <Icon size={26} weight="fill" />
                </span>
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-background/70">{text}</p>
                {note && <p className="font-hand mt-4 rotate-[-2deg] text-2xl text-pistachio">{note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const reviews = [
    { text: "Заказывали на юбилей мамы фисташку с малиной. Гости спрашивали контакты, а торт съели за 15 минут.", name: "Алина", rot: "-rotate-2", bg: "bg-card" },
    { text: "Сделали бенто с надписью за один день. Красиво, вкусно, и крем не приторный, как я люблю.", name: "Тимур", rot: "rotate-1", bg: "bg-pistachio" },
    { text: "Свадебный трёхъярусный пережил дорогу за город в жару. Курьер довёз и собрал на месте.", name: "Вера и Олег", rot: "-rotate-1", bg: "bg-[#f8d9e3]" },
  ]
  return (
    <section className={cn(wrap, "py-20 md:py-28")}>
      <Reveal>
        <h2 className={h2}>Пишут после праздника</h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08}>
            <blockquote className={cn("h-full rounded-[28px] p-7 transition-transform hover:rotate-0", r.rot, r.bg)}>
              <p className="text-lg leading-relaxed">«{r.text}»</p>
              <footer className="font-hand mt-5 text-3xl text-primary">{r.name}</footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Delivery() {
  const zones = [
    ["Внутри Садового кольца", "500 ₽"],
    ["До МКАД", "800 ₽"],
    ["За МКАД до 15 км", "1 300 ₽"],
    ["Самовывоз с Покровки", "Бесплатно"],
  ]
  return (
    <section id="delivery" className={cn(wrap, "pb-20 md:pb-28")}>
      <div className="grid gap-8 rounded-[32px] bg-card p-7 md:p-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="text-4xl leading-[1.05] font-bold md:text-5xl">Довезём аккуратно</h2>
          <p className="mt-4 max-w-[44ch] text-lg text-muted-foreground">
            Курьеры возят только торты, в машинах с кондиционером. Окно доставки 1 час, при заказе от 6 000 ₽ по Москве бесплатно.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="grid gap-2">
            {zones.map(([zone, price]) => (
              <div key={zone} className="flex items-center justify-between gap-4 rounded-2xl bg-background px-5 py-4">
                <dt>{zone}</dt>
                <dd className="font-semibold whitespace-nowrap">{price}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Faq() {
  const faq = [
    ["Можно ли сделать торт без сахара или без глютена?", "Да, есть начинки на эритрите и рисовой муке. Предупредите при заказе, вкус почти не отличается."],
    ["Сколько хранится торт?", "До 48 часов в холодильнике при +2...+6 °C. Перед подачей достаньте его за 30 минут."],
    ["Можно ли заказать торт по фото из интернета?", "Да, пришлите референс в Telegram. Мы сделаем похожий в своём исполнении и сразу назовём цену."],
    ["А если торт не понравится?", "Если что-то не так с качеством, вернём деньги или испечём новый. Сфотографируйте торт и напишите нам в день получения."],
  ]
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <h2 className={cn(h2, "text-center")}>Частые вопросы</h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <Accordion type="single" collapsible className="grid gap-3">
          {faq.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="rounded-[24px] border-0 bg-card px-6">
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">{q}</AccordionTrigger>
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
    <section id="contacts" className={cn(wrap, "pb-24")}>
      <Reveal>
        <div className="grid gap-10 overflow-hidden rounded-[40px] bg-primary p-8 text-primary-foreground md:p-14 lg:grid-cols-2">
          <div>
            <CakeIcon size={44} weight="duotone" />
            <h2 className="mt-6 text-4xl leading-[1.05] font-bold md:text-5xl">Не знаете, какой торт выбрать?</h2>
            <p className="mt-4 max-w-[42ch] text-lg text-primary-foreground/85">Оставьте телефон, кондитер позвонит и поможет с начинкой, весом и декором.</p>
            <ul className="mt-10 grid gap-4 text-sm">
              <li className="flex gap-3"><MapPinIcon size={20} className="shrink-0" />Москва, Покровка, самовывоз из мастерской</li>
              <li className="flex gap-3"><ClockIcon size={20} className="shrink-0" />Ежедневно, 9:00-21:00</li>
              <li className="flex gap-3"><PhoneIcon size={20} className="shrink-0" /><a href={PHONE_HREF} className="tabular-nums">{PHONE}</a></li>
              <li className="flex gap-3"><TelegramLogoIcon size={20} className="shrink-0" />Фото готовых тортов каждый день в Telegram</li>
            </ul>
          </div>
          <div className="rounded-[28px] bg-card p-6 text-foreground md:p-8">
            <LeadForm submitLabel="Перезвоните мне" successText="Кондитер позвонит в течение часа." note="Нажимая кнопку, вы соглашаетесь на обработку персональных данных." />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="pb-24 md:pb-0">
      <div className={cn(wrap, "grid gap-6 border-t border-border py-10 text-sm text-muted-foreground md:grid-cols-[auto_1fr] md:gap-16")}>
        <div className="text-foreground"><Logo /></div>
        <p className="md:text-right">© 2026 Кондитерская «Безе»</p>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 bg-background/95 p-3 shadow-[0_-8px_24px_-12px_rgb(31_42_30/0.25)] backdrop-blur-md md:hidden">
      <a href={PHONE_HREF} aria-label="Позвонить в кондитерскую" className="grid size-12 place-items-center rounded-full bg-pistachio">
        <PhoneIcon size={20} />
      </a>
      <a href="#constructor" className="grid h-12 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">{ORDER}</a>
    </div>
  )
}
