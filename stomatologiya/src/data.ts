import doc1 from "./img/doc1.jpg"
import doc2 from "./img/doc2.jpg"
import doc3 from "./img/doc3.jpg"
import doc4 from "./img/doc4.jpg"
import tTreat from "./img/t-treat.jpg"
import tImplant from "./img/t-implant.jpg"
import tOrtho from "./img/t-ortho.jpg"
import tWhite from "./img/t-white.jpg"
import tKids from "./img/t-kids.jpg"

export const PHONE = "+7 812 009-27-15"
export const PHONE_HREF = "tel:+78120092715"
export const BOOK = "Записаться на приём"

export type DoctorId = "lebedev" | "goncharenko" | "remizov" | "savina"

export const DOCTORS: Record<DoctorId, { name: string; role: string; years: number; photo: string; short: string }> = {
  lebedev: { name: "Андрей Лебедев", role: "Главный врач, хирург-имплантолог", years: 21, photo: doc1, short: "Лебедев А. В." },
  goncharenko: { name: "Мария Гончаренко", role: "Терапевт, лечение каналов под микроскопом", years: 12, photo: doc2, short: "Гончаренко М. С." },
  remizov: { name: "Артём Ремизов", role: "Ортодонт, брекеты и элайнеры", years: 9, photo: doc3, short: "Ремизов А. О." },
  savina: { name: "Елена Савина", role: "Детский стоматолог", years: 14, photo: doc4, short: "Савина Е. И." },
}

export const SERVICES = [
  {
    id: "treat",
    tab: "Лечение",
    title: "Лечение кариеса и каналов",
    text: "Лечим под микроскопом, поэтому сохраняем зуб даже там, где другие советуют удалять. Пломбу подбираем по цвету эмали, её не видно.",
    price: "от 6 500 ₽",
    time: "1 визит, 60 минут",
    img: tTreat,
  },
  {
    id: "implant",
    tab: "Имплантация",
    title: "Имплантация под ключ",
    text: "Импланты Osstem и Straumann с пожизненной гарантией производителя. Цена включает имплант, абатмент и коронку, без доплат по ходу.",
    price: "от 59 000 ₽",
    time: "3-4 месяца до коронки",
    img: tImplant,
  },
  {
    id: "ortho",
    tab: "Брекеты и элайнеры",
    title: "Ровные зубы без лишних визитов",
    text: "Показываем 3D-модель будущей улыбки ещё до начала лечения. Элайнеры почти незаметны, снимаются на время еды.",
    price: "от 95 000 ₽",
    time: "от 9 месяцев",
    img: tOrtho,
  },
  {
    id: "white",
    tab: "Отбеливание",
    title: "Отбеливание ZOOM 4",
    text: "Светлее на 6-8 тонов за один визит. Перед процедурой проверяем эмаль, чтобы после не было чувствительности.",
    price: "32 000 ₽",
    time: "1 визит, 90 минут",
    img: tWhite,
  },
  {
    id: "kids",
    tab: "Детям",
    title: "Детская стоматология",
    text: "Первый визит знакомство, без лечения: ребёнок осматривает кабинет и садится в кресло. Лечим молочные зубы, ставим герметики.",
    price: "от 4 900 ₽",
    time: "приём 30-40 минут",
    img: tKids,
  },
] as const

export const TOP_PRICES = [
  ["Консультация и план лечения", "Бесплатно"],
  ["Профессиональная гигиена Air Flow", "6 900 ₽"],
  ["Лечение кариеса, пломба", "от 6 500 ₽"],
  ["Лечение канала под микроскопом", "от 14 900 ₽"],
  ["Имплант под ключ с коронкой", "от 59 000 ₽"],
  ["Коронка из диоксида циркония", "38 000 ₽"],
] as const

export const FULL_PRICES: { group: string; items: [string, string][] }[] = [
  {
    group: "Терапия",
    items: [
      ["Осмотр и консультация", "Бесплатно"],
      ["Прицельный снимок", "600 ₽"],
      ["Компьютерная томография (КТ)", "3 500 ₽"],
      ["Лечение кариеса, пломба", "от 6 500 ₽"],
      ["Лечение одного канала под микроскопом", "от 14 900 ₽"],
      ["Анестезия", "Входит в стоимость"],
    ],
  },
  {
    group: "Гигиена и отбеливание",
    items: [
      ["Профгигиена Air Flow + ультразвук", "6 900 ₽"],
      ["Фторирование", "1 500 ₽"],
      ["Отбеливание ZOOM 4", "32 000 ₽"],
      ["Домашнее отбеливание, капы", "18 000 ₽"],
    ],
  },
  {
    group: "Хирургия и имплантация",
    items: [
      ["Удаление зуба простое", "от 4 500 ₽"],
      ["Удаление зуба мудрости", "от 9 500 ₽"],
      ["Имплант Osstem под ключ", "59 000 ₽"],
      ["Имплант Straumann под ключ", "89 000 ₽"],
      ["Синус-лифтинг", "от 35 000 ₽"],
    ],
  },
  {
    group: "Ортопедия",
    items: [
      ["Коронка металлокерамика", "19 000 ₽"],
      ["Коронка из диоксида циркония", "38 000 ₽"],
      ["Винир E.max", "45 000 ₽"],
    ],
  },
  {
    group: "Ортодонтия",
    items: [
      ["Металлические брекеты, одна челюсть", "от 95 000 ₽"],
      ["Керамические брекеты, одна челюсть", "от 125 000 ₽"],
      ["Элайнеры, полный курс", "от 180 000 ₽"],
    ],
  },
  {
    group: "Седация и дети",
    items: [
      ["Лечение во сне (седация), час", "9 000 ₽"],
      ["Лечение молочного зуба", "от 4 900 ₽"],
      ["Герметизация фиссур, 1 зуб", "2 900 ₽"],
    ],
  },
]

export const BOOKING_SERVICES: { id: string; label: string; doctors: DoctorId[] }[] = [
  { id: "consult", label: "Консультация", doctors: ["lebedev", "goncharenko", "remizov", "savina"] },
  { id: "treat", label: "Лечение зубов", doctors: ["goncharenko"] },
  { id: "hygiene", label: "Профгигиена", doctors: ["goncharenko", "savina"] },
  { id: "implant", label: "Имплантация", doctors: ["lebedev"] },
  { id: "ortho", label: "Брекеты и элайнеры", doctors: ["remizov"] },
  { id: "kids", label: "Детский приём", doctors: ["savina"] },
]
