import pistachio from "./img/f-pistachio.jpg"
import choco from "./img/f-choco.jpg"
import velvet from "./img/f-velvet.jpg"
import honey from "./img/f-honey.jpg"
import carrot from "./img/f-carrot.jpg"
import vanilla from "./img/f-vanilla.jpg"
import cake1 from "./img/c-cake1.jpg"
import cake2 from "./img/c-cake2.jpg"
import cake3 from "./img/c-cake3.jpg"
import wed1 from "./img/c-wed1.jpg"
import wed2 from "./img/c-wed2.jpg"
import kids1 from "./img/c-kids1.jpg"
import kids2 from "./img/c-kids2.jpg"
import bento1 from "./img/c-bento1.jpg"
import bento2 from "./img/c-bento2.jpg"
import cup1 from "./img/c-cup1.jpg"
import cup2 from "./img/c-cup2.jpg"
import mac1 from "./img/c-mac1.jpg"
import mac2 from "./img/c-mac2.jpg"

export const PHONE = "+7 495 030-18-62"
export const PHONE_HREF = "tel:+74950301862"
export const ORDER = "Собрать торт"

export type FillingId = "pistachio" | "choco" | "velvet" | "honey" | "carrot" | "vanilla"

export const FILLINGS: Record<
  FillingId,
  { name: string; short: string; perKg: number; sponge: string; cream: string; velour: string; img: string; text: string; allergens: string[] }
> = {
  pistachio: { name: "Фисташка и малина", short: "Фисташка", perKg: 3400, sponge: "#a9c47f", cream: "#d6336c", velour: "#c9dcae", img: pistachio, text: "Фисташковый бисквит, малиновый конфи, крем на сливочном сыре", allergens: ["орехи", "глютен", "лактоза"] },
  choco: { name: "Шоколад и вишня", short: "Шоколад", perKg: 2900, sponge: "#4a2c25", cream: "#9b1c31", velour: "#7a5248", img: choco, text: "Влажный шоколадный бисквит, вишня в собственном соку, ганаш", allergens: ["глютен", "лактоза", "яйца"] },
  velvet: { name: "Красный бархат", short: "Бархат", perKg: 2900, sponge: "#b3263e", cream: "#f6efe6", velour: "#e7a2ad", img: velvet, text: "Классика: бархатный бисквит на пахте и много крем-чиза", allergens: ["глютен", "лактоза", "яйца"] },
  honey: { name: "Медовик", short: "Медовик", perKg: 2600, sponge: "#d9a35b", cream: "#f3e2c0", velour: "#ecd09d", img: honey, text: "Восемь медовых коржей и сметанный крем, как у бабушки", allergens: ["глютен", "лактоза", "мёд"] },
  carrot: { name: "Морковный", short: "Морковный", perKg: 2700, sponge: "#c97a3a", cream: "#f6efe6", velour: "#f0bf8c", img: carrot, text: "Морковь, грецкий орех, корица и апельсиновая цедра", allergens: ["орехи", "глютен", "лактоза"] },
  vanilla: { name: "Ваниль и ягоды", short: "Ваниль", perKg: 2800, sponge: "#f1dfa8", cream: "#e8506f", velour: "#f6d6dd", img: vanilla, text: "Ванильный бисквит, клубника, лёгкий крем на маскарпоне", allergens: ["глютен", "лактоза", "яйца"] },
}

export type CoatingId = "cream" | "velour" | "glaze"
export const COATINGS: Record<CoatingId, { name: string; perKg: number; note: string }> = {
  cream: { name: "Крем-чиз", perKg: 0, note: "Гладкий белый, классика" },
  velour: { name: "Велюр", perKg: 400, note: "Бархатистый, в цвет начинки" },
  glaze: { name: "Зеркальная глазурь", perKg: 600, note: "Глянец и подтёки" },
}

export type DecorId = "berries" | "flowers" | "text" | "topper"
export const DECOR: Record<DecorId, { name: string; price: number }> = {
  berries: { name: "Свежие ягоды", price: 1200 },
  flowers: { name: "Живые цветы", price: 2500 },
  text: { name: "Надпись", price: 500 },
  topper: { name: "Топпер", price: 900 },
}

export const TIER_FRAME = 2000 // каркас и сборка за каждый ярус после первого

export const CATEGORIES = ["Все", "Торты", "Свадебные", "Детские", "Бенто", "Капкейки", "Макарон"] as const
export type Category = (typeof CATEGORIES)[number]

export const CATALOG: { img: string; name: string; cat: Exclude<Category, "Все">; price: string }[] = [
  { img: cake1, name: "Ягодный с клубникой", cat: "Торты", price: "от 2 800 ₽/кг" },
  { img: wed1, name: "Трёхъярусный с ягодами", cat: "Свадебные", price: "от 3 200 ₽/кг" },
  { img: bento1, name: "Бенто с надписью", cat: "Бенто", price: "1 900 ₽" },
  { img: kids1, name: "Радужный со свечами", cat: "Детские", price: "от 3 000 ₽/кг" },
  { img: cup1, name: "Капкейки с кремом", cat: "Капкейки", price: "от 2 400 ₽ / 6 шт." },
  { img: cake2, name: "Шоколадный с безе", cat: "Торты", price: "от 3 100 ₽/кг" },
  { img: mac1, name: "Башня из макарон", cat: "Макарон", price: "от 1 800 ₽ / 12 шт." },
  { img: wed2, name: "Нежный с розами", cat: "Свадебные", price: "от 3 400 ₽/кг" },
  { img: kids2, name: "С мороженым и посыпкой", cat: "Детские", price: "от 3 000 ₽/кг" },
  { img: bento2, name: "Черничный бенто", cat: "Бенто", price: "2 100 ₽" },
  { img: cup2, name: "Капкейки «Бархат»", cat: "Капкейки", price: "от 2 600 ₽ / 6 шт." },
  { img: cake3, name: "Шоколадный с черникой", cat: "Торты", price: "от 2 900 ₽/кг" },
  { img: mac2, name: "Ассорти макарон", cat: "Макарон", price: "от 1 600 ₽ / 12 шт." },
]
