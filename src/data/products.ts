export type GoldKarat = '14K' | '18K' | '24K';
export type Category = 'rings' | 'necklaces' | 'bracelets' | 'earrings' | 'sets' | 'wedding';

export interface ProductVariant {
  id: string;
  size: string;
  weight: number; // grams
  karat: GoldKarat;
  price: number; // AMD
  inStock: boolean;
  specialistNote: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  nameRu: string;
  category: Category;
  description: string;
  descriptionEn: string;
  descriptionRu: string;
  image: string;
  images: string[];
  videoUrl?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  tags: string[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'diamond-solitaire-ring',
    name: 'Ադամանդե Սոլիտեր Մատանի',
    nameEn: 'Diamond Solitaire Ring',
    nameRu: 'Кольцо Солитер с Бриллиантом',
    category: 'rings',
    description: 'Հավերժական ադամանդե մատանի, 18K ոսկուց, բրիլյանտ կտրվածքով ադամանդով։ Կատարյալ ընտրություն հայտարարության կամ հարսնացուի համար։',
    descriptionEn: 'Timeless diamond solitaire ring in 18K gold with brilliant cut diamond. Perfect for proposals or the modern bride.',
    descriptionRu: 'Вечное кольцо-солитер из 18-каратного золота с бриллиантом огранки "Brilliant".',
    image: '/images/ring-1.jpg',
    images: ['/images/ring-1.jpg', '/images/ring-2.jpg'],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 147,
    variants: [
      { id: 'r1-15', size: '15', weight: 2.8, karat: '18K', price: 485000, inStock: true, specialistNote: 'Ամենատարածված չափսը։ Հատուկ պատրաստված սրտի ձևով մատանու տուփով։' },
      { id: 'r1-16', size: '16', weight: 3.0, karat: '18K', price: 510000, inStock: true, specialistNote: 'Ստանդարտ չափս, կատարյալ հավասարակշռությամբ։' },
      { id: 'r1-17', size: '17', weight: 3.2, karat: '18K', price: 535000, inStock: true, specialistNote: 'Լայն մատների համար կատարյալ։' },
      { id: 'r1-18', size: '18', weight: 3.4, karat: '18K', price: 560000, inStock: false, specialistNote: 'Ժամանակավորապես բացակայում է պահեստում։' },
      { id: 'r1-19', size: '19', weight: 3.6, karat: '24K', price: 620000, inStock: true, specialistNote: '24K — բարձրագույն մաքրության ոսկի, ավելի փափուկ, հատուկ խնամք է պահանջում։' },
    ],
    tags: ['ադամանդ', 'հարսնաշեղ', 'solitaire', '18K'],
  },
  {
    id: '2',
    slug: 'gold-chain-necklace',
    name: 'Ոսկե Շղթա Վզնոց',
    nameEn: 'Gold Chain Necklace',
    nameRu: 'Золотое Цепное Ожерелье',
    category: 'necklaces',
    description: 'Էլեգանտ ոսկե շղթա՝ 14K կամ 18K ոսկուց, ձեռքով հյուսված։ Կատարյալ ամենօրյա կամ հատուկ առիթների համար։',
    descriptionEn: 'Elegant gold chain in 14K or 18K, hand-crafted. Perfect for everyday wear or special occasions.',
    descriptionRu: 'Элегантная золотая цепочка из 14К или 18К, ручной работы.',
    image: '/images/necklace-1.jpg',
    images: ['/images/necklace-1.jpg'],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 203,
    variants: [
      { id: 'n1-40', size: '40 սմ', weight: 4.5, karat: '14K', price: 195000, inStock: true, specialistNote: 'Կարճ շղթա, կոկտեյլ հագուստի հետ կատարյալ է։' },
      { id: 'n1-45', size: '45 սմ', weight: 5.2, karat: '14K', price: 225000, inStock: true, specialistNote: 'Ստանդարտ երկարություն, ամենատարածված ընտրությունը.' },
      { id: 'n1-50', size: '50 սմ', weight: 6.0, karat: '18K', price: 310000, inStock: true, specialistNote: '18K ոսկու հարուստ երանգը ձեռք է բերում ավելի ամուր կառուցվածք.' },
      { id: 'n1-55', size: '55 սմ', weight: 6.8, karat: '18K', price: 345000, inStock: false, specialistNote: 'Երկար շղթա, V-ձևի կտրվածքի հետ կատարյալ.' },
    ],
    tags: ['շղթա', 'վզնոց', '14K', '18K'],
  },
  {
    id: '3',
    slug: 'diamond-tennis-bracelet',
    name: 'Ադամանդե Թենիս Ապարանջան',
    nameEn: 'Diamond Tennis Bracelet',
    nameRu: 'Теннисный Браслет с Бриллиантами',
    category: 'bracelets',
    description: 'Դասական ադամանդե թենիս ապարանջան 18K սպիտակ ոսկուց, 2 կարատ ընդհանուր ադամանդային կշռով։',
    descriptionEn: 'Classic diamond tennis bracelet in 18K white gold with 2 total carat weight.',
    descriptionRu: 'Классический теннисный браслет из 18-каратного белого золота с общим весом бриллиантов 2 карата.',
    image: '/images/bracelet-1.jpg',
    images: ['/images/bracelet-1.jpg'],
    isNew: true,
    rating: 5.0,
    reviewCount: 89,
    variants: [
      { id: 'b1-16', size: '16 սմ', weight: 8.5, karat: '18K', price: 1250000, inStock: true, specialistNote: 'Բարակ դաստակի համար կատարյալ, ոլորքով մեխանիզմ.' },
      { id: 'b1-17', size: '17 սմ', weight: 9.0, karat: '18K', price: 1320000, inStock: true, specialistNote: 'Ամենատարածված չափսը, ստանդարտ կոճղ.' },
      { id: 'b1-18', size: '18 սմ', weight: 9.8, karat: '18K', price: 1415000, inStock: false, specialistNote: 'Ներկայում պատրաստվում է, 2 շաբաթ.' },
      { id: 'b1-19', size: '19 սմ', weight: 10.5, karat: '18K', price: 1490000, inStock: true, specialistNote: 'Լայն դաստակի համար, ընդլայնված կոճղ.' },
    ],
    tags: ['ադամանդ', 'tennis', 'ապարանջան', '18K'],
  },
  {
    id: '4',
    slug: 'gold-drop-earrings',
    name: 'Ոսկե Կախազարդ Ականջօղ',
    nameEn: 'Gold Drop Earrings',
    nameRu: 'Золотые Серьги-Капли',
    category: 'earrings',
    description: 'Կախազարդ ականջօղեր 18K ոսկուց ադամանդե շրջաններով։ Էլեգանտ, թեթև, կատարյալ ցանկացած առիթի համար։',
    descriptionEn: 'Drop earrings in 18K gold with diamond halos. Elegant, lightweight, perfect for any occasion.',
    descriptionRu: 'Серьги-капли из 18K золота с бриллиантовыми ореолами. Элегантные, лёгкие.',
    image: '/images/earring-1.jpg',
    images: ['/images/earring-1.jpg'],
    rating: 4.7,
    reviewCount: 124,
    variants: [
      { id: 'e1-s', size: 'S — 2 սմ', weight: 3.2, karat: '18K', price: 285000, inStock: true, specialistNote: 'Փոքր, դասական ձևավորում, ամենօրյա կրելու համար.' },
      { id: 'e1-m', size: 'M — 3 սմ', weight: 4.1, karat: '18K', price: 365000, inStock: true, specialistNote: 'Ստանդարտ, ամենատարածված, երեկոյան հավաքների համար կատարյալ.' },
      { id: 'e1-l', size: 'L — 4 սմ', weight: 5.3, karat: '18K', price: 465000, inStock: true, specialistNote: 'Մեծ, ավելի դրամատիկ ձևավորում, կոչույթների կամ հարսնիքի համար.' },
    ],
    tags: ['ականջօղ', 'ադամանդ', 'կախազարդ', '18K'],
  },
  {
    id: '5',
    slug: 'rose-gold-emerald-ring',
    name: 'Վարդագույն Ոսկե Զմրուխտ Մատանի',
    nameEn: 'Rose Gold Emerald Ring',
    nameRu: 'Кольцо из Розового Золота с Изумрудом',
    category: 'rings',
    description: 'Յուրօրինակ մատանի վարդագույն ոսկուց՝ կոլումբիական զմրուխտ կենտրոնական քարով և ադամանդե շղթայով.',
    descriptionEn: 'Unique rose gold ring featuring a Colombian emerald center stone surrounded by a diamond halo.',
    descriptionRu: 'Уникальное кольцо из розового золота с колумбийским изумрудом в обрамлении бриллиантов.',
    image: '/images/ring-2.jpg',
    images: ['/images/ring-2.jpg', '/images/ring-1.jpg'],
    isNew: true,
    rating: 4.9,
    reviewCount: 67,
    variants: [
      { id: 'r2-15', size: '15', weight: 3.5, karat: '18K', price: 785000, inStock: true, specialistNote: 'Զմրուխտ — 0.8 կարատ, AAA կատեգորիա, Կոլումբիա.' },
      { id: 'r2-16', size: '16', weight: 3.7, karat: '18K', price: 820000, inStock: true, specialistNote: 'Ամենատարածված չափս, Կոլումբիայի զմրուխտ.' },
      { id: 'r2-17', size: '17', weight: 3.9, karat: '18K', price: 855000, inStock: false, specialistNote: 'Ժամանակավորապես բացակայում է.' },
      { id: 'r2-18', size: '18', weight: 4.1, karat: '18K', price: 890000, inStock: true, specialistNote: 'Լայն մատի համար, ամրացված կռան.' },
    ],
    tags: ['զմրուխտ', 'վարդագույն ոսկի', 'rose gold', '18K'],
  },
  {
    id: '6',
    slug: 'wedding-band-set',
    name: 'Հարսնիքի Մատանիների Հավաքածու',
    nameEn: 'Wedding Band Set',
    nameRu: 'Комплект Обручальных Колец',
    category: 'wedding',
    description: 'Հարսնիքի մատանիների հավաքածու՝ 18K ոսկուց, ձեռքով փորագրված ու ադամանդե դետալներով.',
    descriptionEn: 'Wedding band set in 18K gold, hand-engraved with diamond accents.',
    descriptionRu: 'Свадебный комплект обручальных колец из 18К золота с ручной гравировкой.',
    image: '/images/collection-wedding.jpg',
    images: ['/images/collection-wedding.jpg'],
    isBestseller: true,
    rating: 5.0,
    reviewCount: 312,
    variants: [
      { id: 'w1-set-sm', size: '15+19', weight: 7.2, karat: '18K', price: 695000, inStock: true, specialistNote: 'Կին 15, Տղամարդ 19. Անվճար փորագրություն.' },
      { id: 'w1-set-md', size: '16+20', weight: 7.8, karat: '18K', price: 745000, inStock: true, specialistNote: 'Ամենատարածված: Կին 16, Տղամարդ 20. Ներառված — 2 կտոր.' },
      { id: 'w1-set-lg', size: '17+21', weight: 8.4, karat: '18K', price: 795000, inStock: true, specialistNote: 'Կին 17, Տղամարդ 21. Հատուկ տուփ և վկայական.' },
      { id: 'w1-set-xl', size: '18+22', weight: 9.0, karat: '24K', price: 985000, inStock: false, specialistNote: '24K — ավանդական, բարձրագույն մաքրություն.' },
    ],
    tags: ['հարսնիք', 'wedding', 'հավաքածու', '18K'],
  },
];

export const categories = [
  { id: 'rings', label: 'Մատանիներ', labelEn: 'Rings', icon: '💍', count: 48 },
  { id: 'necklaces', label: 'Վզնոցներ', labelEn: 'Necklaces', icon: '📿', count: 62 },
  { id: 'bracelets', label: 'Ապարանջաններ', labelEn: 'Bracelets', icon: '⌚', count: 35 },
  { id: 'earrings', label: 'Ականջօղեր', labelEn: 'Earrings', icon: '✨', count: 57 },
  { id: 'sets', label: 'Հավաքածուներ', labelEn: 'Sets', icon: '🎁', count: 21 },
  { id: 'wedding', label: 'Հարսնիք', labelEn: 'Wedding', icon: '💒', count: 33 },
];

export const goldRateData = [
  { date: '01/06', rate: 72500, usd: 195 },
  { date: '02/06', rate: 73100, usd: 197 },
  { date: '03/06', rate: 72800, usd: 196 },
  { date: '04/06', rate: 74200, usd: 200 },
  { date: '05/06', rate: 75000, usd: 202 },
  { date: '06/06', rate: 74600, usd: 201 },
  { date: '07/06', rate: 76100, usd: 205 },
  { date: '08/06', rate: 77300, usd: 208 },
  { date: '09/06', rate: 76800, usd: 207 },
  { date: '10/06', rate: 78200, usd: 211 },
  { date: '11/06', rate: 79500, usd: 214 },
  { date: '12/06', rate: 78900, usd: 212 },
  { date: '13/06', rate: 80100, usd: 216 },
  { date: '14/06', rate: 81200, usd: 219 },
];
