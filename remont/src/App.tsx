import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  CameraIcon,
  CheckIcon,
  HardHatIcon,
  LockKeyIcon,
  PhoneIcon,
  StackIcon,
  TelegramLogoIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CountUp, Reveal } from "@/shared/motion"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"
import { Calculator } from "./Calculator"
import { BeforeAfter } from "./BeforeAfter"
import hero from "./img/hero.jpg"
import processImg from "./img/process.jpg"
import obj1 from "./img/obj1.jpg"
import obj2 from "./img/obj2.jpg"
import obj3 from "./img/obj3.jpg"
import obj4 from "./img/obj4.jpg"

const PHONE = "+7 495 018-42-07"
const PHONE_HREF = "tel:+74950184207"
const ORDER = "Вызвать замерщика"

export function App() {
  const [open, setOpen] = useState(false)
  const order = () => setOpen(true)

  return (
    <>
      <Header onOrder={order} />
      <main>
        <Hero onOrder={order} />
        <Stats />
        <section id="price" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight md:text-5xl">
              Посчитайте ремонт за минуту
            </h2>
            <p className="mt-4 max-w-[60ch] text-muted-foreground">
              Цены за работу на 2026 год. Материалы для чистовой отделки вы выбираете сами, мы не накручиваем на них процент.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Calculator onOrder={order} />
          </Reveal>
        </section>
        <Tariffs onOrder={order} />
        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">До и после капитального ремонта</h2>
            <p className="mt-4 max-w-[60ch] text-muted-foreground">
              От голого бетона и демонтажа до гостиной, в которую можно заезжать. Потяните ползунок, чтобы сравнить.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <BeforeAfter />
          </Reveal>
        </section>
        <Steps />
        <Works />
        <Guarantees />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar onOrder={order} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Бесплатный замер</DialogTitle>
            <DialogDescription>
              Перезвоним в течение 15 минут и договоримся о времени. Замерщик приедет с образцами и составит смету.
            </DialogDescription>
          </DialogHeader>
          <LeadForm submitLabel={ORDER} successText="Мастер перезвонит в течение 15 минут в рабочее время." />
        </DialogContent>
      </Dialog>
    </>
  )
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
      <span className="grid size-9 place-items-center rounded-lg bg-graphite font-mono text-sm text-white">
        <span>
          м<sup className="text-[0.65em] text-primary">2</sup>
        </span>
      </span>
      Метр в метр
    </a>
  )
}

function Header({ onOrder }: { onOrder: () => void }) {
  const links = [
    ["#price", "Стоимость"],
    ["#works", "Работы"],
    ["#steps", "Этапы"],
    ["#faq", "Вопросы"],
  ]
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-muted-foreground transition-colors hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="hidden font-mono text-sm font-medium md:block">{PHONE}</a>
          <Button onClick={onOrder} className="hidden h-10 px-4 sm:inline-flex">{ORDER}</Button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onOrder }: { onOrder: () => void }) {
  const reduce = useReducedMotion()
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-16 md:px-8 lg:min-h-[min(calc(100dvh-4rem),860px)] lg:grid-cols-12 lg:gap-8 lg:py-12">
      <div className="lg:col-span-6">
        <Reveal>
          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Ремонт под ключ с фиксированной сметой
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
            Цена и срок прописаны в договоре. За каждый день просрочки платим вам 0,5% от сметы.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <a href="#price">Рассчитать стоимость</a>
          </Button>
          <Button variant="outline" size="lg" onClick={onOrder} className="h-12 bg-transparent px-6 text-base">
            {ORDER}
          </Button>
        </Reveal>
      </div>
      <motion.div
        className="lg:col-span-6"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={hero}
          alt="Светлая гостиная со стеллажом-перегородкой после ремонта"
          className="aspect-[4/3] w-full rounded-2xl object-cover lg:aspect-[4/5] lg:max-h-[min(calc(100dvh-8rem),780px)]"
          fetchPriority="high"
        />
      </motion.div>
    </section>
  )
}

function Stats() {
  const items: { value: number; suffix: string; label: string; format?: (n: number) => string }[] = [
    { value: 12, suffix: " лет", label: "делаем ремонт в Москве" },
    { value: 640, suffix: "", label: "квартир сдали с 2014 года" },
    { value: 5, suffix: " лет", label: "гарантия на все работы" },
    { value: 0.5, suffix: "%", label: "в день неустойка за просрочку", format: (n) => n.toFixed(1).replace(".", ",") },
  ]
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 md:px-8 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.label} className={cn("px-2 lg:px-6", i > 0 && "lg:border-l lg:border-border")}>
            <p className="font-mono text-3xl font-semibold tabular-nums md:text-4xl">
              <CountUp to={it.value} format={it.format} />
              {it.suffix}
            </p>
            <p className="mt-1 max-w-[22ch] text-sm text-muted-foreground">{it.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Tariffs({ onOrder }: { onOrder: () => void }) {
  const tariffs = [
    {
      name: "Косметический",
      price: "6 900",
      days: "30-45 дней",
      text: "Освежить квартиру без переделки коммуникаций.",
      items: ["Выравнивание и покраска стен", "Ламинат или кварцвинил", "Замена дверей и плинтусов", "Сантехника без переноса"],
    },
    {
      name: "Капитальный",
      price: "14 900",
      days: "60-90 дней",
      text: "Самый частый выбор для новостроек и вторички.",
      items: ["Новая электрика и разводка труб", "Стяжка и штукатурка по маякам", "Плитка в санузле под ключ", "Потолки, двери, чистовая отделка"],
      featured: true,
    },
    {
      name: "Дизайнерский",
      price: "22 500",
      days: "90-120 дней",
      text: "Сложные решения по проекту дизайнера.",
      items: ["Дизайн-проект входит в стоимость", "Скрытые двери и теневой профиль", "Многоуровневый свет", "Авторский надзор на объекте"],
    },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Три формата ремонта</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-stretch">
        {tariffs.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08} className="h-full">
            <article
              className={cn(
                "flex h-full flex-col rounded-2xl border p-7",
                t.featured ? "border-graphite bg-graphite text-white lg:-my-4 lg:py-11" : "border-border bg-card",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                {t.featured && <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">Выбирают чаще</span>}
              </div>
              <p className={cn("mt-2 text-sm", t.featured ? "text-white/65" : "text-muted-foreground")}>{t.text}</p>
              <p className="mt-6 font-mono">
                <span className="text-sm">от </span>
                <span className="text-4xl font-semibold tabular-nums">{t.price}</span>
                <span className="text-sm"> ₽/м²</span>
              </p>
              <p className={cn("mt-1 font-mono text-sm", t.featured ? "text-white/65" : "text-muted-foreground")}>{t.days}</p>
              <ul className="mt-7 grid gap-3 text-sm">
                {t.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckIcon size={18} weight="bold" className="mt-px shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                onClick={onOrder}
                variant={t.featured ? "default" : "outline"}
                size="lg"
                className={cn("mt-auto h-11 w-full text-sm", !t.featured && "bg-transparent")}
                style={{ marginTop: "2rem" }}
              >
                {ORDER}
              </Button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Steps() {
  const steps = [
    ["Замер и смета", "Замерщик приезжает в удобное время, обсуждает пожелания и считает смету на месте.", "1 день, бесплатно"],
    ["Договор", "Фиксируем цену, срок, график оплаты и размер неустойки. Смета становится приложением к договору.", "1-2 дня"],
    ["Черновые работы", "Демонтаж, перегородки, стяжка, штукатурка. Вывозим мусор за свой счёт.", "15-30 дней"],
    ["Скрытые работы", "Электрика и трубы. Перед тем как закрыть стены, присылаем фото и схемы.", "10-20 дней"],
    ["Чистовая отделка", "Плитка, покраска, полы, двери, свет. Прораб принимает каждый этап по чек-листу.", "20-40 дней"],
    ["Сдача", "Клининг, проверка по акту, гарантийный паспорт квартиры со всеми схемами.", "2 дня"],
  ]
  return (
    <section id="steps" className="bg-card py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Как идёт ремонт</h2>
              <p className="mt-4 max-w-[46ch] text-muted-foreground">
                Вы платите только за принятый этап. Приезжать на объект не обязательно, всё видно в фотоотчётах.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <img src={processImg} alt="Мастер красит стену валиком" loading="lazy" className="mt-8 aspect-[4/3] w-full rounded-2xl object-cover" />
            </Reveal>
          </div>
        </div>
        <ol className="grid gap-4 lg:col-span-7">
          {steps.map(([title, text, time], i) => (
            <Reveal key={title} delay={i * 0.04}>
              <li className="grid grid-cols-[3rem_1fr] gap-4 rounded-2xl border border-border bg-background p-6 md:grid-cols-[4rem_1fr_auto] md:items-start">
                <span className="font-mono text-2xl font-semibold text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
                <span className="col-start-2 font-mono text-xs text-muted-foreground md:col-start-3 md:pt-1.5">{time}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Works() {
  const works = [
    { img: obj1, title: "Кухня-гостиная в Раменках", meta: "64 м² · капитальный", days: 71, price: "1,12 млн ₽", cls: "md:col-span-2 md:row-span-2", ratio: "aspect-[4/3] md:aspect-auto md:h-full" },
    { img: obj4, title: "Студия в Бутово", meta: "31 м² · косметический", days: 34, price: "240 тыс. ₽", cls: "md:row-span-2", ratio: "aspect-[4/3] md:aspect-auto md:h-full" },
    { img: obj2, title: "Сталинка в Хамовниках", meta: "92 м² · дизайнерский", days: 118, price: "2,31 млн ₽", cls: "", ratio: "aspect-[4/3]" },
    { img: obj3, title: "Двушка в Митино", meta: "54 м² · капитальный", days: 63, price: "860 тыс. ₽", cls: "md:col-span-2", ratio: "aspect-[4/3] md:aspect-[8/3]" },
  ]
  return (
    <section id="works" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Недавние объекты</h2>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">Реальные сроки и итоговые суммы по актам, без материалов чистовой отделки.</p>
      </Reveal>
      <div className="mt-10 grid gap-4 md:auto-rows-[260px] md:grid-cols-3">
        {works.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06} className={w.cls}>
            <figure className="group relative h-full overflow-hidden rounded-2xl bg-muted">
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                className={cn("w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]", w.ratio)}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-graphite/85 via-graphite/40 to-transparent p-5 pt-16 text-white">
                <div>
                  <p className="font-semibold">{w.title}</p>
                  <p className="text-sm text-white/75">{w.meta}</p>
                </div>
                <div className="text-right font-mono text-sm">
                  <p className="font-semibold">{w.price}</p>
                  <p className="text-white/75">{w.days} дн.</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Guarantees() {
  const items = [
    { icon: LockKeyIcon, title: "Смета не растёт", text: "Цена зафиксирована в договоре. Дополнительные работы только с вашего письменного согласия." },
    { icon: StackIcon, title: "Оплата по этапам", text: "Пять платежей, каждый после приёмки этапа. Предоплата за весь ремонт не нужна." },
    { icon: CameraIcon, title: "Фотоотчёт каждый день", text: "Прораб присылает фото и видео в общий чат в Telegram. Скрытые работы снимаем до закрытия." },
    { icon: HardHatIcon, title: "Своя бригада", text: "Штатные мастера с опытом от 7 лет, без субподряда. На объекте всегда один и тот же прораб." },
  ]
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight md:text-5xl">
            Что мы обещаем в договоре, а не на словах
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="flex gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} weight="duotone" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1.5 max-w-[46ch] leading-relaxed text-muted-foreground">{text}</p>
                </div>
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
    { text: "Боялась, что смета вырастет, как у знакомых. Не выросла ни на рубль, сдали на четыре дня раньше срока.", name: "Ирина Ковалёва", place: "двушка в Раменках" },
    { text: "Жил в другом городе и ни разу не приехал на объект. Каждый вечер фото в чате, на приёмке всё совпало с проектом.", name: "Денис Мухаметов", place: "квартира в Митино" },
    { text: "Сталинка с кривыми стенами и старой проводкой. Прораб заранее показал все сюрпризы и уложился в договор.", name: "Ольга и Павел Ярцевы", place: "Хамовники" },
  ]
  return (
    <section className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Что говорят клиенты</h2>
        </Reveal>
        <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08} className="w-[85%] shrink-0 snap-start md:w-auto">
              <blockquote className="flex h-full flex-col justify-between gap-8 border-t-2 border-graphite pt-6">
                <p className="text-lg leading-relaxed">«{r.text}»</p>
                <footer className="text-sm">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-muted-foreground">{r.place}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const faq = [
    ["Можно ли жить в квартире во время ремонта?", "При косметическом ремонте можно, работаем по комнатам. При капитальном не советуем: будет пыль и периоды без воды и света."],
    ["Кто покупает материалы?", "Черновые материалы закупаем мы по оптовым ценам, чеки прикладываем к отчёту. Чистовые (плитку, обои, сантехнику) вы выбираете сами или вместе с нашим снабженцем."],
    ["Что если при демонтаже найдутся скрытые проблемы?", "Сначала показываем проблему на фото и предлагаем решение с ценой. Без вашей подписи под допсоглашением ничего не делаем, а сумма по договору остаётся прежней."],
    ["Вы работаете с новостройками в ипотеке?", "Да, это половина наших объектов. Согласуем работы с управляющей компанией и подготовим документы для банка, если нужно."],
    ["Что покрывает гарантия?", "Все выполненные работы на 5 лет: трещины, отслоение плитки, протечки по нашей вине. Выезжаем в течение 48 часов и устраняем бесплатно."],
    ["Нужна ли перепланировка?", "Если переносим мокрые зоны или стены, подготовим проект и поможем согласовать его в Мосжилинспекции до начала работ."],
  ]
  return (
    <section id="faq" className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Частые вопросы</h2>
        <p className="mt-4 text-muted-foreground">
          Не нашли ответ? Позвоните{" "}
          <a href={PHONE_HREF} className="font-mono font-medium whitespace-nowrap text-foreground underline underline-offset-4">{PHONE}</a>
        </p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-8">
        <Accordion type="single" collapsible className="border-t border-border">
          {faq.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="max-w-[62ch] pb-5 text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
      <Reveal>
        <div className="grid gap-10 rounded-2xl bg-graphite p-7 text-white md:p-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Замер бесплатно, смета в тот же день</h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-white/70">
              Замерщик приедет в удобное время, в том числе в выходные. Смету оставим вам, даже если решите делать ремонт не с нами.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/80">
              <a href={PHONE_HREF} className="flex items-center gap-3 font-mono text-base text-white">
                <PhoneIcon size={20} /> {PHONE}
              </a>
              <span className="flex items-center gap-3">
                <TelegramLogoIcon size={20} /> Ответим в Telegram с 8:00 до 22:00
              </span>
            </div>
          </div>
          <LeadForm
            tone="dark"
            submitLabel={ORDER}
            successText="Мастер перезвонит в течение 15 минут в рабочее время."
            note="Нажимая кнопку, вы соглашаетесь на обработку персональных данных."
          />
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-muted-foreground md:grid-cols-3 md:px-8">
        <div className="grid gap-3">
          <div className="text-foreground"><Logo /></div>
          <p>Ремонт квартир под ключ в Москве и ближнем Подмосковье.</p>
        </div>
        <div className="grid content-start gap-1.5">
          <a href={PHONE_HREF} className="font-mono text-foreground">{PHONE}</a>
          <span>Москва, офис у м. Павелецкая</span>
        </div>
        <p className="md:text-right">
          © 2026 «Метр в метр»
        </p>
      </div>
    </footer>
  )
}

function MobileBar({ onOrder }: { onOrder: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden">
      <Button asChild variant="outline" size="lg" className="h-12 bg-transparent px-4">
        <a href={PHONE_HREF} aria-label="Позвонить">
          <PhoneIcon size={20} /> Позвонить
        </a>
      </Button>
      <Button size="lg" onClick={onOrder} className="h-12 text-base">{ORDER}</Button>
    </div>
  )
}
