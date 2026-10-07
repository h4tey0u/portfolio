import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeftIcon, ArrowRightIcon, CertificateIcon, ClockIcon, MapPinIcon, PhoneIcon, QrCodeIcon, StethoscopeIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/shared/motion"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"
import { FaceMap } from "./FaceMap"
import { Gift } from "./Gift"
import { BOOK, PHONE, PHONE_HREF, PROCEDURES, WARNING } from "./data"
import hero from "./img/hero.jpg"
import mood from "./img/mood.jpg"
import doctor from "./img/doctor.jpg"
import safety from "./img/safety.jpg"
import inject from "./img/inject.jpg"
import device from "./img/device.jpg"
import care from "./img/care.jpg"

const IMGS: Record<string, string> = { inject, device, care }
const wrap = "mx-auto max-w-[1400px] px-4 md:px-10"

export function App() {
  return (
    <div className="grain">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <section id="map" className={cn(wrap, "py-24 md:py-32")}>
          <Reveal>
            <h2 className="max-w-[18ch] text-5xl leading-[1.05] md:text-7xl">Что вас беспокоит?</h2>
            <p className="mt-5 max-w-[52ch] text-lg text-muted-foreground">Нажмите на зону лица, чтобы увидеть, какие процедуры с этим работают и сколько они стоят.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <FaceMap />
          </Reveal>
        </section>
        <Procedures />
        <Doctor />
        <Safety />
        <Reviews />
        <section className={cn(wrap, "py-24 md:py-32")}>
          <Reveal>
            <Gift />
          </Reveal>
        </section>
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}

function Logo() {
  return (
    <a href="#top" className="font-heading text-[28px] leading-none italic">
      Нюанс<span className="text-primary">.</span>
    </a>
  )
}

function Header() {
  const links = [
    ["#map", "Процедуры"],
    ["#prices", "Цены"],
    ["#doctor", "Врач"],
    ["#contacts", "Контакты"],
  ]
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className={cn(wrap, "flex h-16 items-center justify-between gap-6")}>
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-foreground">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="hidden text-sm tabular-nums md:block">{PHONE}</a>
          <Button asChild className="hidden h-10 rounded-full px-5 sm:inline-flex">
            <a href="#contacts">{BOOK}</a>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="relative -mt-16 flex min-h-[min(100dvh,920px)] items-end overflow-hidden md:items-center">
      <motion.img
        src={hero}
        alt="Портрет девушки в профиль на тёмном фоне"
        fetchPriority="high"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 size-full object-cover object-[20%_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent md:bg-gradient-to-l md:from-background md:via-background/60 md:to-transparent" />
      <div className={cn(wrap, "relative w-full pt-40 pb-16 md:py-24")}>
        <div className="md:ml-auto md:w-[52%]">
          <Reveal delay={0.3}>
            <h1 className="text-5xl leading-[1.02] md:text-7xl lg:text-[5.5rem]">
              Выглядеть отдохнувшей, а не <em className="text-primary">«сделанной»</em>
            </h1>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="mt-7 max-w-[40ch] text-lg leading-relaxed text-muted-foreground">
              Эстетическая медицина, после которой вам говорят «ты хорошо выглядишь», а не спрашивают, что вы сделали.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <Button asChild size="lg" className="mt-10 h-13 rounded-full px-8 text-base">
              <a href="#contacts">{BOOK}</a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Philosophy() {
  const rules = [
    ["Меньше, но точно", "Минимальное количество препарата, которое даёт результат. Добавить всегда можно, убрать сложнее."],
    ["Отговорим, если не нужно", "Если процедура не решит вашу задачу, скажем об этом на консультации и не возьмём денег."],
    ["Только оригинал", "Препараты от официальных дистрибьюторов. Упаковку вскрываем при вас."],
  ]
  return (
    <section className={cn(wrap, "grid gap-14 py-24 md:py-32 lg:grid-cols-12")}>
      <Reveal className="lg:col-span-5">
        <img src={mood} alt="Силуэт девушки в мягком контровом свете" loading="lazy" className="aspect-[3/4] w-full rounded-[var(--radius)] object-cover lg:max-h-[640px]" />
      </Reveal>
      <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
        <Reveal>
          <h2 className="text-5xl leading-[1.05] md:text-6xl">Три правила, от которых мы не отступаем</h2>
        </Reveal>
        <ol className="mt-12 grid gap-10">
          {rules.map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <li className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border pt-6">
                <span className="font-heading text-3xl text-primary italic">{i + 1}</span>
                <div>
                  <h3 className="text-3xl">{title}</h3>
                  <p className="mt-2 max-w-[48ch] leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Procedures() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(0)
  const p = PROCEDURES[tab]
  return (
    <section id="prices" className="border-y border-border bg-card/40 py-24 md:py-32">
      <div className={wrap}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="text-5xl leading-[1.05] md:text-7xl">Процедуры и цены</h2>
          </Reveal>
          <div role="tablist" className="flex gap-1 self-start rounded-full border border-border p-1 md:self-auto">
            {PROCEDURES.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={cn("rounded-full px-5 py-2 text-sm transition-colors", i === tab ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
          >
            <div>
              <img src={IMGS[p.img]} alt={p.tab} className="aspect-[4/3] w-full rounded-[var(--radius)] object-cover lg:aspect-[3/4]" />
              <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {p.items.map((it) => (
                <article key={it.name} className="flex flex-col rounded-[var(--radius)] border border-border bg-background p-6">
                  <h3 className="text-2xl leading-tight">{it.name}</h3>
                  <p className="mt-3 text-2xl font-medium text-primary tabular-nums">{it.price}</p>
                  <dl className="mt-auto grid grid-cols-3 gap-3 pt-8 text-sm">
                    <div>
                      <dt className="text-xs text-muted-foreground">Длится</dt>
                      <dd className="mt-1">{it.time}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Эффект</dt>
                      <dd className="mt-1">{it.effect}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Восстановление</dt>
                      <dd className="mt-1">{it.rehab}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="mt-8 text-xs text-muted-foreground">{WARNING} Цены на октябрь 2026 года, не являются публичной офертой.</p>
      </div>
    </section>
  )
}

function Doctor() {
  return (
    <section id="doctor" className={cn(wrap, "grid items-center gap-12 py-24 md:py-32 lg:grid-cols-12")}>
      <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
        <img src={doctor} alt="Врач-дерматокосметолог Ольга Белых" loading="lazy" className="aspect-[4/5] w-full rounded-[var(--radius)] object-cover object-top lg:max-h-[720px]" />
      </Reveal>
      <div className="lg:col-span-5 lg:row-start-1">
        <Reveal>
          <p className="text-sm tracking-[0.2em] text-primary uppercase">Основатель клиники</p>
          <h2 className="mt-5 text-5xl leading-[1.05] md:text-6xl">Ольга Белых</h2>
          <p className="mt-3 text-lg text-muted-foreground">Врач-дерматокосметолог</p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-10 border-l-2 border-primary pl-6 font-heading text-3xl leading-snug italic">
            «Хорошая работа косметолога незаметна. Видно только, что человек выспался и счастлив».
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <dl className="mt-12 grid gap-5 border-t border-border pt-8 sm:grid-cols-3 sm:gap-6">
            {[
              ["8 лет", "в эстетической медицине"],
              ["ТГМУ", "дерматовенерология"],
              ["Сеул", "стажировка по инъекциям"],
            ].map(([v, l]) => (
              <div key={v}>
                <dt className="font-heading text-3xl md:text-4xl">{v}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Safety() {
  const items = [
    { icon: StethoscopeIcon, title: "Только врачи", text: "Все специалисты с дипломом дерматовенеролога. Медсёстры и «мастера» инъекции не делают." },
    { icon: QrCodeIcon, title: "Проверка препарата", text: "Номер партии и срок годности показываем до процедуры, вкладыш отдаём вам." },
    { icon: CertificateIcon, title: "Медицинская лицензия", text: "Лицензия на косметологию и дерматологию, договор и информированное согласие." },
  ]
  return (
    <section className={cn(wrap, "pb-24 md:pb-32")}>
      <div className="grid gap-3 lg:grid-cols-3 lg:grid-rows-3">
        <Reveal className="lg:col-span-2 lg:row-span-3">
          <div className="relative h-full min-h-[320px] overflow-hidden rounded-[var(--radius)]">
            <img src={safety} alt="Флаконы косметических средств на тёмном фоне" loading="lazy" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
              <h2 className="max-w-[16ch] text-4xl leading-[1.05] md:text-6xl">Безопасность, которую можно проверить</h2>
            </div>
          </div>
        </Reveal>
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.06} className="h-full">
            <div className={cn("h-full rounded-[var(--radius)] border border-border p-7", i === 0 ? "bg-accent" : "bg-card")}>
              <Icon size={26} className="text-primary" />
              <h3 className="mt-5 text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  const reduce = useReducedMotion()
  const reviews = [
    { text: "Боялась, что лицо станет чужим. Через две недели муж сказал, что я выгляжу как после отпуска, и не понял почему.", name: "Наталья Корнеева", info: "ботулинотерапия" },
    { text: "Пришла за губами, а Ольга отговорила и предложила увлажнение. Результат ровно то, что я хотела, и дешевле.", name: "Дарья Мельник", info: "увлажнение губ" },
    { text: "Делаю SMAS второй год. Овал держится, никаких отёков, на работу выходила на следующий день.", name: "Ирина Пак", info: "SMAS-лифтинг" },
  ]
  const [i, setI] = useState(0)
  const r = reviews[i]
  const go = (d: number) => setI((v) => (v + d + reviews.length) % reviews.length)
  return (
    <section className="border-y border-border py-24 md:py-32">
      <div className={cn(wrap, "max-w-[1100px] text-center")}>
        <div className="relative min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={i}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="font-heading text-3xl leading-snug md:text-5xl">«{r.text}»</blockquote>
              <figcaption className="mt-8 text-sm text-muted-foreground">
                <span className="text-foreground">{r.name}</span>, {r.info}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon-lg" className="size-12 rounded-full" onClick={() => go(-1)} aria-label="Предыдущий отзыв">
            <ArrowLeftIcon size={18} />
          </Button>
          <span className="w-12 text-sm text-muted-foreground tabular-nums">{i + 1} / {reviews.length}</span>
          <Button variant="outline" size="icon-lg" className="size-12 rounded-full" onClick={() => go(1)} aria-label="Следующий отзыв">
            <ArrowRightIcon size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const faq = [
    ["Будет ли заметно, что я что-то делала?", "Нет, если делать правильно. Мы работаем малыми дозами и оставляем мимику живой. Окружающие замечают, что вы посвежели, но не понимают почему."],
    ["Это больно?", "Перед инъекциями наносим анестезирующий крем, большинство филлеров уже содержат лидокаин. Обычно ощущения сравнивают с лёгким пощипыванием."],
    ["Когда будет виден результат?", "После ботулинотерапии через 7-14 дней, после филлеров сразу, окончательно через 2 недели. Аппаратные процедуры дают накопительный эффект за курс."],
    ["Можно ли исправить результат другой клиники?", "Часто да. Филлеры на основе гиалуроновой кислоты растворяем ферментом. На консультации оценим, что можно сделать."],
    ["Есть ли противопоказания?", "Беременность и кормление, острые воспаления, обострение герпеса, некоторые аутоиммунные заболевания. Полный список врач уточнит на консультации."],
  ]
  return (
    <section className={cn(wrap, "grid gap-12 pb-24 md:pb-32 lg:grid-cols-12")}>
      <Reveal className="lg:col-span-4">
        <h2 className="text-5xl leading-[1.05] md:text-6xl">Вопросы перед первым визитом</h2>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue={faq[0][0]}>
          {faq.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="py-6 text-left font-heading text-2xl font-medium hover:no-underline md:text-[1.7rem]">{q}</AccordionTrigger>
              <AccordionContent className="max-w-[60ch] pb-6 text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Contacts() {
  return (
    <section id="contacts" className="border-t border-border bg-card/40 py-24 md:py-32">
      <div className={cn(wrap, "grid gap-14 lg:grid-cols-2 lg:gap-20")}>
        <Reveal>
          <h2 className="text-5xl leading-[1.05] md:text-7xl">Первая консультация</h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
            Врач осмотрит кожу, обсудит ваши ожидания и составит план. Стоимость 2 500 ₽, при записи на процедуру в тот же день бесплатно.
          </p>
          <ul className="mt-12 grid gap-6">
            <li className="flex gap-4">
              <MapPinIcon size={22} className="mt-0.5 shrink-0 text-primary" />
              <span>Владивосток, ул. Светланская<span className="block text-sm text-muted-foreground">Вход со двора, своя парковка</span></span>
            </li>
            <li className="flex gap-4">
              <ClockIcon size={22} className="mt-0.5 shrink-0 text-primary" />
              <span>Ежедневно, 10:00-21:00</span>
            </li>
            <li className="flex gap-4">
              <PhoneIcon size={22} className="mt-0.5 shrink-0 text-primary" />
              <a href={PHONE_HREF} className="tabular-nums">{PHONE}</a>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[var(--radius)] border border-border bg-background p-7 md:p-10">
            <h3 className="text-3xl">Оставьте телефон</h3>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">Администратор перезвонит и подберёт удобное время.</p>
            <LeadForm
              submitLabel={BOOK}
              successText="Перезвоним в течение 20 минут в рабочее время."
              note="Нажимая кнопку, вы соглашаетесь на обработку персональных данных."
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border pb-24 md:pb-0">
      <div className={cn(wrap, "grid gap-6 py-10 text-sm text-muted-foreground md:grid-cols-[auto_1fr] md:gap-16")}>
        <div className="text-foreground"><Logo /></div>
        <div className="grid gap-3">
          <p className="font-medium text-foreground">{WARNING}</p>
        </div>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t border-border bg-background/90 p-3 backdrop-blur-xl md:hidden">
      <Button asChild variant="outline" size="lg" className="size-12 rounded-full p-0">
        <a href={PHONE_HREF} aria-label="Позвонить в клинику">
          <PhoneIcon size={20} />
        </a>
      </Button>
      <Button asChild size="lg" className="h-12 rounded-full text-base">
        <a href="#contacts">{BOOK}</a>
      </Button>
    </div>
  )
}
