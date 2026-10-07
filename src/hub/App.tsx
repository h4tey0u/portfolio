import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRightIcon, DeviceMobileIcon, EnvelopeSimpleIcon, LightningIcon, PencilRulerIcon, RocketLaunchIcon, TelegramLogoIcon, WrenchIcon } from "@phosphor-icons/react"
import { Reveal } from "@/shared/motion"
import { cn } from "@/lib/utils"
import remont from "./img/remont.jpg"
import remontM from "./img/remont-m.jpg"
import stoma from "./img/stomatologiya.jpg"
import stomaM from "./img/stomatologiya-m.jpg"
import kosm from "./img/kosmetologiya.jpg"
import kosmM from "./img/kosmetologiya-m.jpg"
import yur from "./img/yurist.jpg"
import yurM from "./img/yurist-m.jpg"
import foto from "./img/fotostudiya.jpg"
import fotoM from "./img/fotostudiya-m.jpg"
import kond from "./img/konditer.jpg"
import kondM from "./img/konditer-m.jpg"

const TG = "https://t.me/h4tey0u"
const EMAIL = "mrdestroysuper@gmail.com"
const wrap = "mx-auto max-w-[1320px] px-4 md:px-10"

const WORKS = [
  { slug: "remont", title: "Метр в метр", niche: "Ремонт квартир под ключ", feature: "Калькулятор стоимости ремонта и слайдер «до/после»", img: remont, mob: remontM, tone: "#c8552b" },
  { slug: "stomatologiya", title: "Ровно", niche: "Стоматологическая клиника", feature: "Онлайн-запись к врачу за 5 шагов: услуга, врач, день, время", img: stoma, mob: stomaM, tone: "#2f5bea" },
  { slug: "kosmetologiya", title: "Нюанс", niche: "Эстетическая медицина", feature: "Интерактивная карта лица с процедурами и ценами по зонам", img: kosm, mob: kosmM, tone: "#d98a7a" },
  { slug: "yurist", title: "Коршунов и партнёры", niche: "Юристы: банкротство и семейные споры", feature: "Тест «Можно ли списать долги» с вердиктом и ценой", img: yur, mob: yurM, tone: "#1e5b47" },
  { slug: "fotostudiya", title: "Плёнка", niche: "Фотостудия", feature: "Бронирование залов по часам с расчётом цены", img: foto, mob: fotoM, tone: "#ffd400" },
  { slug: "konditer", title: "Безе", niche: "Торты на заказ", feature: "Конструктор торта: собирается на экране, цена считается сама", img: kond, mob: kondM, tone: "#d6336c" },
]

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Works />
        <Services />
        <Process />
        <Contact />
      </main>
      <footer className={cn(wrap, "flex flex-col justify-between gap-2 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row")}>
        <span>© 2026 Константин</span>
        <a href={TG} className="hover:text-foreground">@h4tey0u</a>
      </footer>
    </>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className={cn(wrap, "flex h-16 items-center justify-between gap-6")}>
        <a href="#top" className="font-semibold tracking-tight">
          Константин<span className="text-lime">.</span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#works" className="hover:text-foreground">Проекты</a>
          <a href="#services" className="hover:text-foreground">Услуги</a>
          <a href="#contact" className="hover:text-foreground">Контакты</a>
        </nav>
        <a href={TG} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-background transition-transform active:scale-95">
          <TelegramLogoIcon size={16} weight="fill" /> Написать
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className={cn(wrap, "pt-16 pb-20 md:pt-24 md:pb-28")}>
      <Reveal>
        <p className="font-mono text-sm text-muted-foreground">Константин, разработка сайтов</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="mt-6 max-w-[15ch] text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl lg:text-[5.6rem]">
          Делаю сайты, которые <span className="text-lime">приводят клиентов</span>
        </h1>
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal delay={0.16} className="lg:col-span-6">
          <p className="max-w-[48ch] text-lg leading-relaxed text-muted-foreground">
            Лендинги и сайты для малого бизнеса: продумываю структуру и тексты, рисую дизайн, собираю и запускаю. Без шаблонов и с понятной ценой.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={TG} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-semibold text-background transition-transform active:scale-95">
              <TelegramLogoIcon size={18} weight="fill" /> Обсудить проект
            </a>
            <a href="#works" className="rounded-full border border-border px-6 py-3.5 font-semibold transition-colors hover:bg-card">Смотреть проекты</a>
          </div>
        </Reveal>
        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-3 gap-4 border-t border-border pt-6 lg:col-span-5 lg:col-start-8"
        >
          {[
            ["3-5 дней", "на лендинг под ключ"],
            ["100%", "адаптив под телефон"],
            ["1 цена", "фиксируем до старта"],
          ].map(([v, l]) => (
            <li key={v}>
              <p className="text-2xl font-semibold md:text-3xl">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function Works() {
  return (
    <section id="works" className={cn(wrap, "pb-24 md:pb-32")}>
      <Reveal>
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Избранные проекты</h2>
          <span className="font-mono text-sm text-muted-foreground">6 проектов</span>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {WORKS.map((w, i) => (
          <Reveal key={w.slug} delay={(i % 2) * 0.08}>
            <a href={`./${w.slug}/`} target="_blank" rel="noreferrer" className="group block">
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: `0 40px 80px -50px ${w.tone}` }}>
                  <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                    {[0, 1, 2].map((d) => <span key={d} className="size-2.5 rounded-full bg-foreground/15" />)}
                    <span className="ml-3 truncate font-mono text-xs text-muted-foreground">{w.slug}</span>
                  </div>
                  <div className="overflow-hidden">
                    <img src={w.img} alt={`Сайт «${w.title}», первый экран`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                </div>
                <img
                  src={w.mob}
                  alt=""
                  loading="lazy"
                  className="absolute -right-2 -bottom-8 w-[22%] rounded-[14px] border-4 border-background object-cover object-top shadow-[0_20px_40px_-10px_rgb(0_0_0/0.6)] transition-transform duration-500 group-hover:-translate-y-2 md:-right-4"
                  style={{ aspectRatio: "9 / 18" }}
                />
              </div>
              <div className="mt-6 pr-[26%]">
                <div className="flex items-center gap-3">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: w.tone }} />
                  <span className="text-sm text-muted-foreground">{w.niche}</span>
                </div>
                <h3 className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  {w.title}
                  <ArrowUpRightIcon size={20} className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
                </h3>
                <p className="mt-2 text-muted-foreground">{w.feature}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Services() {
  const items = [
    { icon: RocketLaunchIcon, title: "Лендинг под ключ", text: "Одностраничный сайт под услугу или акцию: структура, тексты, дизайн, запуск и подключение заявок." },
    { icon: PencilRulerIcon, title: "Сайт компании", text: "Несколько страниц: услуги, цены, команда, кейсы, контакты. Удобно обновлять самостоятельно." },
    { icon: LightningIcon, title: "Интерактив и автоматизация", text: "Калькуляторы, квизы, онлайн-запись. Заявки с сайта сразу в Telegram, на почту, в Google-таблицу или CRM, а клиенту приходит автоответ." },
    { icon: WrenchIcon, title: "Доработка и редизайн", text: "Обновлю устаревший сайт, в том числе на CMS: новый дизайн, скорость, мобильная версия." },
  ]
  return (
    <section id="services" className="border-y border-border bg-card/50 py-24 md:py-32">
      <div className={wrap}>
        <Reveal>
          <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight md:text-5xl">Чем могу помочь вашему бизнесу</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.05} className="h-full">
              <div className="h-full bg-background p-7 md:p-10">
                <Icon size={28} className="text-lime" />
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-2 max-w-[44ch] leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-3 text-muted-foreground">
            <DeviceMobileIcon size={20} className="shrink-0 text-lime" />
            Каждый сайт сразу делаю под телефоны: больше половины ваших клиентов придут именно с них.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    ["Знакомство", "Пишете в Telegram пару слов о бизнесе и задаче. Задам несколько уточняющих вопросов и сразу назову срок и цену."],
    ["Структура и тексты", "Собираю, что и в каком порядке говорить клиенту, чтобы он оставил заявку."],
    ["Дизайн и сборка", "Показываю результат по ходу работы, правки вносим вместе."],
    ["Запуск", "Подключаю домен, заявки в Telegram или на почту и автоответ клиенту. Остаюсь на связи после запуска."],
  ]
  return (
    <section className={cn(wrap, "py-24 md:py-32")}>
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Как работаем</h2>
      </Reveal>
      <ol className="mt-12 grid gap-8 md:grid-cols-4">
        {steps.map(([title, text], i) => (
          <Reveal key={title} delay={i * 0.06}>
            <li className="border-t border-border pt-6">
              <span className="font-mono text-sm text-lime">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className={cn(wrap, "pb-24 md:pb-32")}>
      <Reveal>
        <div className="rounded-3xl bg-lime p-8 text-background md:p-16">
          <h2 className="max-w-[16ch] text-4xl leading-[1.02] font-semibold tracking-tight md:text-7xl">Расскажите о своём бизнесе</h2>
          <p className="mt-6 max-w-[46ch] text-lg text-background/75">
            Напишите пару слов о задаче. Отвечу в течение дня и скажу, какой сайт вам нужен и сколько это будет стоить.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={TG} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 rounded-full bg-background px-7 py-4 text-lg font-semibold text-foreground transition-transform active:scale-95">
              <TelegramLogoIcon size={22} weight="fill" /> @h4tey0u
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center justify-center gap-3 rounded-full border-2 border-background/80 px-7 py-4 text-lg font-semibold transition-colors hover:bg-background/10">
              <EnvelopeSimpleIcon size={22} /> {EMAIL}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
