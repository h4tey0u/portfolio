import cyc from "./img/h-cyc.jpg"
import loft from "./img/h-loft.jpg"
import black from "./img/h-black.jpg"
import wood from "./img/h-wood.jpg"
import green from "./img/h-green.jpg"
import interior from "./img/h-interior.jpg"

export const PHONE = "+7 812 048-03-25"
export const PHONE_HREF = "tel:+78120480325"
export const BOOK = "Забронировать зал"

export type Hall = { id: string; name: string; img: string; area: number; height: string; feature: string; price: number }

export const HALLS: Hall[] = [
  { id: "cyc", name: "Циклорама", img: cyc, area: 120, height: "6 м", feature: "Белая циклорама 8 × 6 м, подвесная система света", price: 2400 },
  { id: "loft", name: "Лофт", img: loft, area: 180, height: "7 м", feature: "Бетон, антресоль, панорамные окна на запад", price: 2900 },
  { id: "black", name: "Чёрный", img: black, area: 70, height: "4,5 м", feature: "Чёрный бархат на стенах, для контрового и драматичного света", price: 1900 },
  { id: "wood", name: "Дерево", img: wood, area: 90, height: "5 м", feature: "Дубовый пол, 12 бумажных фонов на системе Manfrotto", price: 2100 },
  { id: "green", name: "Сад", img: green, area: 60, height: "4 м", feature: "Дневной свет, живые растения, круглый подиум", price: 1800 },
  { id: "interior", name: "Интерьер", img: interior, area: 85, height: "4,2 м", feature: "Мебель, торшеры, кирпич. Тёплый вечерний свет", price: 2300 },
]

export const PACKAGES = [
  { name: "Портрет", price: "7 900 ₽", meta: "1 час", items: ["Фотограф и зал включены", "15 фото в ретуши", "Помощь с позированием"] },
  { name: "Семейная", price: "12 900 ₽", meta: "1,5 часа", items: ["Зал «Сад» или «Интерьер»", "25 фото в ретуши", "Можно с детьми и питомцами"] },
  { name: "Контент для бизнеса", price: "19 900 ₽", meta: "3 часа", items: ["Предметная и с моделями", "60 фото для маркетплейсов", "Белый фон по требованиям WB и Ozon"] },
]

export const FREE_GEAR = [
  "Импульсный свет Profoto D2",
  "Октобоксы, стрипы, тарелки",
  "Бумажные фоны 12 цветов",
  "Стойки, журавли, флаги",
  "Отражатели и рассеиватели",
  "Гримёрка с подсветкой",
  "Отпариватель и вешалки",
  "Колонка и Wi-Fi",
]

export const PAID_GEAR: [string, string][] = [
  ["Генератор Profoto Pro-11", "1 500 ₽/ч"],
  ["Дым-машина", "800 ₽/ч"],
  ["Постоянный LED-свет Aputure", "1 000 ₽/ч"],
  ["Визажист", "от 3 000 ₽"],
  ["Ассистент на площадке", "900 ₽/ч"],
]
