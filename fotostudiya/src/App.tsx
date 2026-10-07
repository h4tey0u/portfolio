import { useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeftIcon, ArrowRightIcon, CarIcon, CheckIcon, ClockIcon, MapPinIcon, PhoneIcon, SneakerMoveIcon, TelegramLogoIcon, WalletIcon, CoatHangerIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/shared/motion"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"
import { HourBooking } from "./HourBooking"
import { BOOK, FREE_GEAR, HALLS, PACKAGES, PAID_GEAR, PHONE, PHONE_HREF } from "./data"
import heroA from "./img/hero-a.jpg"
import heroB from "./img/hero-b.jpg"
import heroC from "./img/hero-c.jpg"
import heroD from "./img/hero-d.jpg"
import gear from "./img/gear.jpg"
import pPortrait from "./img/p-portrait.jpg"
import g1 from "./img/g1.jpg"
import g2 from "./img/g2.jpg"
import g3 from "./img/g3.jpg"
import g4 from "./img/g4.jpg"
import g5 from "./img/g5.jpg"
import g6 from "./img/g6.jpg"
import g7 from "./img/g7.jpg"
import g8 from "./img/g8.jpg"

const wrap = "mx-auto max-w-[1440px] px-4 md:px-10"
const h2 = "text-3xl font-bold leading-[1.05] md:text-5xl"
const SHOOT = "Записаться на фотосессию"
const PACKAGE_IMGS = [pPortrait, g7, g8]

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Halls />
        <section id="booking" className={cn(wrap, "py-20 md:py-28")}>
          <Reveal>
            <h2 className={h2}>
              Бронь <span className="bg-signal px-2">по часам</span> за минуту
            </h2>
            <p className="mt-4 max-w-[56ch] text-muted-foreground">
              Выберите зал, день и время. Цена считается сразу: вечером и в выходные дороже, от 3 часов скидка 10%.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <HourBooking />
          </Reveal>
        </section>
        <Gear />
        <Packages />
        <Gallery />
        <Rules />
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
    <a href="#top" className="flex items-center gap-2 font-heading text-lg font-black tracking-tight">
      <span className="grid size-8 place-items-center rounded-full border-2 border-ink bg-signal">
        <span className="size-2.5 rounded-full bg-ink" />
      </span>
      плёнка
    </a>
  )
}

function Header() {
  const links = [
    ["#halls", "Залы"],
    ["#booking", "Бронь"],
    ["#packages", "Фотосессии"],
    ["#contacts", "Контакты"],
  ]
  return (
    <header id="top" className="sticky top-0 z-40 border-b-2 border-ink bg-background">
      <div className={cn(wrap, "flex h-16 items-center justify-between gap-6")}>
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="underline-offset-4 hover:underline">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="hidden text-sm font-medium tabular-nums md:block">{PHONE}</a>
          <a href="#booking" className="press hidden rounded-[var(--radius)] border-2 border-ink bg-signal px-4 py-2 font-heading text-xs font-bold sm:block">
            {BOOK}
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const shots = [
    { src: heroA, alt: "Съёмка на белой циклораме", cls: "col-span-2 row-span-2", rot: -1.5 },
    { src: heroC, alt: "Зал с растениями и импульсным светом", cls: "row-span-2", rot: 2 },
    { src: heroB, alt: "Фотограф выставляет свет в большом зале", cls: "", rot: -2 },
    { src: heroD, alt: "Съёмка на тёмном фоне", cls: "", rot: 1.5 },
  ]
  return (
    <section className={cn(wrap, "pt-6 pb-14 md:pt-8")}>
      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-[21vw] leading-[0.85] font-black tracking-[-0.05em] md:text-[17vw] xl:text-[15.5rem]"
      >
        плёнка
      </motion.h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-between gap-8 lg:col-span-4">
          <Reveal delay={0.2}>
            <p className="text-xl leading-snug font-medium md:text-2xl">
              Фотостудия на Лиговском. <span className="bg-signal px-1">6 залов</span>, 1 200 м² и свет Profoto в каждом.
            </p>
            <p className="mt-4 max-w-[40ch] text-muted-foreground">Аренда для фотографов от 1 часа и фотосессии под ключ для всех остальных.</p>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-wrap gap-3">
            <a href="#booking" className="press rounded-[var(--radius)] border-2 border-ink bg-signal px-6 py-3.5 font-heading text-sm font-bold">{BOOK}</a>
            <a href="#packages" className="press rounded-[var(--radius)] border-2 border-ink bg-background px-6 py-3.5 font-heading text-sm font-bold">Фотосессии</a>
          </Reveal>
        </div>
        <div className="grid h-[300px] grid-cols-4 grid-rows-2 gap-3 md:h-[340px] lg:col-span-8">
          {shots.map((s, i) => (
            <motion.img
              key={s.alt}
              src={s.src}
              alt={s.alt}
              fetchPriority={i === 0 ? "high" : undefined}
              initial={reduce ? false : { opacity: 0, y: 30, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: s.rot }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.25 + i * 0.08 }}
              className={cn("size-full border-2 border-ink object-cover shadow-hard", s.cls)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const words = ["Циклорама 8 × 6 м", "Profoto D2", "Лофт 180 м²", "Гримёрка", "Парковка", "С 8:00 до 24:00", "Чёрный бархат", "Дневной свет"]
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-signal py-3" aria-hidden>
      <div className="marquee flex w-max gap-10 font-heading text-lg font-bold whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w} <span className="size-2 rounded-full bg-ink" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Halls() {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (d: 1 | -1) => track.current?.scrollBy({ left: d * 420, behavior: "smooth" })
  return (
    <section id="halls" className="py-20 md:py-28">
      <div className={cn(wrap, "flex items-end justify-between gap-6")}>
        <Reveal>
          <h2 className={h2}>Шесть залов под любую задачу</h2>
        </Reveal>
        <div className="hidden gap-3 md:flex">
          {([[-1, ArrowLeftIcon, "Назад"], [1, ArrowRightIcon, "Вперёд"]] as const).map(([d, Icon, label]) => (
            <button key={label} type="button" aria-label={label} onClick={() => scroll(d)} className="press grid size-12 place-items-center rounded-[var(--radius)] border-2 border-ink bg-background">
              <Icon size={20} weight="bold" />
            </button>
          ))}
        </div>
      </div>
      <div ref={track} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 md:scroll-px-10 md:px-10">
        {HALLS.map((h, i) => (
          <Reveal key={h.id} delay={Math.min(i, 3) * 0.06} className="w-[82%] shrink-0 snap-start sm:w-[400px]">
            <article className="group overflow-hidden rounded-[var(--radius)] border-2 border-ink bg-card shadow-hard">
              <div className="overflow-hidden border-b-2 border-ink">
                <img src={h.img} alt={`Зал «${h.name}»`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-bold">{h.name}</h3>
                  <p className="font-heading text-lg font-bold whitespace-nowrap">{new Intl.NumberFormat("ru-RU").format(h.price)} ₽<span className="text-xs font-medium text-muted-foreground">/ч</span></p>
                </div>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-muted-foreground">{h.feature}</p>
                <div className="mt-4 flex gap-2 text-xs font-medium">
                  <span className="rounded-[4px] border-2 border-ink px-2 py-1">{h.area} м²</span>
                  <span className="rounded-[4px] border-2 border-ink px-2 py-1">потолок {h.height}</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Gear() {
  return (
    <section className="border-y-2 border-ink bg-ink py-20 text-background md:py-28">
      <div className={cn(wrap, "grid gap-12 lg:grid-cols-12")}>
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className={h2}>Свет уже в зале. И он входит в цену</h2>
            <p className="mt-4 max-w-[46ch] text-background/65">Приходите только с камерой. Всё остальное стоит на площадке и проверено перед вашей бронью.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={gear} alt="Стул и импульсный осветитель на белом фоне" loading="lazy" className="mt-10 aspect-[3/2] w-full rounded-[var(--radius)] border-2 border-background/20 object-cover" />
          </Reveal>
        </div>
        <div className="grid content-start gap-10 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h3 className="text-xl font-bold text-signal">Бесплатно в каждом зале</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {FREE_GEAR.map((g) => (
                <li key={g} className="flex items-center gap-2 rounded-[var(--radius)] border-2 border-background/25 px-3 py-2 text-sm">
                  <CheckIcon size={14} weight="bold" className="text-signal" /> {g}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-xl font-bold text-signal">За доплату</h3>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius)] border-2 border-background/25 bg-background/25">
              {PAID_GEAR.map(([name, price]) => (
                <div key={name} className="flex justify-between gap-4 bg-ink px-4 py-3.5 text-sm">
                  <dt>{name}</dt>
                  <dd className="font-medium whitespace-nowrap">{price}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Packages() {
  return (
    <section id="packages" className={cn(wrap, "py-20 md:py-28")}>
      <Reveal>
        <h2 className={h2}>Не фотограф? Снимем вас сами</h2>
        <p className="mt-4 max-w-[56ch] text-muted-foreground">Фотограф, зал и ретушь в одной цене. Готовые фото через 5 рабочих дней.</p>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <article className={cn("flex h-full flex-col overflow-hidden rounded-[var(--radius)] border-2 border-ink shadow-hard", i === 1 ? "bg-signal md:-translate-y-4" : "bg-card")}>
              <img src={PACKAGE_IMGS[i]} alt={p.name} loading="lazy" className="aspect-[4/3] w-full border-b-2 border-ink object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <span className="text-sm font-medium">{p.meta}</span>
                </div>
                <p className="mt-3 font-heading text-3xl font-black tabular-nums">{p.price}</p>
                <ul className="mt-5 grid gap-2 text-sm">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2"><CheckIcon size={16} weight="bold" className="mt-0.5 shrink-0" />{it}</li>
                  ))}
                </ul>
                <Button asChild size="lg" className="press mt-auto h-12 border-2 border-ink font-heading text-xs font-bold" style={{ marginTop: "1.75rem" }}>
                  <a href="#contacts">{SHOOT}</a>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const shots = [g1, g5, g2, g3, g6, g4]
  return (
    <section className="border-t-2 border-ink bg-card py-20 md:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>Снято у нас</h2>
          <p className="mt-4 text-muted-foreground">Работы фотографов-резидентов. Отметьте нас в соцсетях, и мы покажем ваш кадр здесь.</p>
        </Reveal>
        <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {shots.map((s, i) => (
            <Reveal key={s} delay={(i % 3) * 0.06}>
              <img src={s} alt="Портрет, снятый в студии" loading="lazy" className="w-full break-inside-avoid rounded-[var(--radius)] border-2 border-ink object-cover" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Rules() {
  const items = [
    { icon: WalletIcon, title: "Предоплата 50%", text: "Бесплатная отмена или перенос за 48 часов до брони." },
    { icon: SneakerMoveIcon, title: "Сменная обувь", text: "На циклораму только в носках или бахилах, они у входа." },
    { icon: CoatHangerIcon, title: "Гримёрка", text: "Зеркала с подсветкой, отпариватель, кофе. Входит в аренду." },
    { icon: CarIcon, title: "Парковка", text: "Во дворе, первые 2 часа бесплатно для гостей студии." },
  ]
  return (
    <section className={cn(wrap, "py-20 md:py-28")}>
      <Reveal>
        <h2 className={h2}>Что важно знать до съёмки</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="h-full rounded-[var(--radius)] border-2 border-ink p-6">
              <span className="grid size-12 place-items-center rounded-full border-2 border-ink bg-signal">
                <Icon size={22} weight="bold" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Faq() {
  const faq = [
    ["Можно ли забронировать меньше часа?", "Минимальная бронь 1 час. Время на подготовку и сборку входит в бронь, поэтому планируйте 10-15 минут на сборку."],
    ["Можно прийти раньше?", "Да, если перед вами нет брони. Уточните у администратора в Telegram, обычно отвечаем за 5 минут."],
    ["Сколько человек можно привести?", "До 10 человек в любой зал без доплаты. Для больших команд и видеосъёмок посчитаем индивидуально."],
    ["Можно снимать видео?", "Да. Для видео советуем «Чёрный» и «Лофт», там лучшая акустика. Постоянный свет Aputure можно взять в аренду."],
    ["Есть ли еда и напитки?", "Кофе, чай и вода бесплатно. Еду можно приносить с собой и есть на кухне, в залах нельзя."],
  ]
  return (
    <section className="border-t-2 border-ink bg-card py-20 md:py-28">
      <div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
        <Reveal className="lg:col-span-4">
          <h2 className={h2}>Вопросы</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <Accordion type="single" collapsible className="grid gap-3">
            {faq.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="rounded-[var(--radius)] border-2 border-ink bg-background px-5 data-[state=open]:bg-signal">
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed">{a}</AccordionContent>
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
        <div className="grid overflow-hidden rounded-[var(--radius)] border-2 border-ink shadow-hard-lg lg:grid-cols-2">
          <div className="bg-signal p-7 md:p-12">
            <h2 className={h2}>Приезжайте на экскурсию</h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed">Покажем все залы, свет и гримёрку. Бесплатно, в любой день, если зал свободен.</p>
            <ul className="mt-10 grid gap-5 text-sm font-medium">
              <li className="flex gap-4"><MapPinIcon size={20} weight="bold" className="shrink-0" /><span>Лиговский проспект, лофт-квартал<span className="block font-normal">8 минут от м. Обводный канал, 3 этаж</span></span></li>
              <li className="flex gap-4"><ClockIcon size={20} weight="bold" className="shrink-0" />Ежедневно, 8:00-24:00</li>
              <li className="flex gap-4"><PhoneIcon size={20} weight="bold" className="shrink-0" /><a href={PHONE_HREF} className="tabular-nums">{PHONE}</a></li>
              <li className="flex gap-4"><TelegramLogoIcon size={20} weight="bold" className="shrink-0" />Быстрее всего отвечаем в Telegram</li>
            </ul>
          </div>
          <div className="border-t-2 border-ink bg-card p-7 md:p-12 lg:border-t-0 lg:border-l-2">
            <h3 className="text-2xl font-bold">Фотосессия или вопрос</h3>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">Оставьте телефон, администратор перезвонит.</p>
            <LeadForm submitLabel={SHOOT} successText="Администратор перезвонит в течение 15 минут." note="Нажимая кнопку, вы соглашаетесь на обработку персональных данных." />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t-2 border-ink pb-24 md:pb-0">
      <div className={cn(wrap, "grid gap-6 py-10 text-sm text-muted-foreground md:grid-cols-[auto_1fr] md:gap-16")}>
        <div className="text-foreground"><Logo /></div>
        <p className="md:text-right">© 2026 Фотостудия «Плёнка»</p>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t-2 border-ink bg-background p-3 md:hidden">
      <a href={PHONE_HREF} aria-label="Позвонить в студию" className="grid size-12 place-items-center rounded-[var(--radius)] border-2 border-ink">
        <PhoneIcon size={20} weight="bold" />
      </a>
      <a href="#booking" className="grid h-12 place-items-center rounded-[var(--radius)] border-2 border-ink bg-signal font-heading text-sm font-bold">{BOOK}</a>
    </div>
  )
}
