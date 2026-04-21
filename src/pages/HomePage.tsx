import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Truck, Award, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('hy-AM', { style: 'currency', currency: 'AMD', maximumFractionDigits: 0 })
    .format(price).replace('AMD', '֏');

const bentoItems = [
  { id: 'rings', gridClass: 'col-span-12 md:col-span-7 row-span-2', height: 'h-80 md:h-full' },
  { id: 'necklaces', gridClass: 'col-span-12 md:col-span-5 row-span-1', height: 'h-48 md:h-auto' },
  { id: 'bracelets', gridClass: 'col-span-6 md:col-span-5 row-span-1', height: 'h-48 md:h-auto' },
  { id: 'earrings', gridClass: 'col-span-6 md:col-span-4 row-span-1', height: 'h-48 md:h-auto' },
  { id: 'wedding', gridClass: 'col-span-12 md:col-span-8 row-span-1', height: 'h-48 md:h-auto' },
];

const catImages: Record<string, string> = {
  rings: '/images/ring-1.jpg',
  necklaces: '/images/necklace-1.jpg',
  bracelets: '/images/bracelet-1.jpg',
  earrings: '/images/earring-1.jpg',
  wedding: '/images/collection-wedding.jpg',
  sets: '/images/ring-2.jpg',
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { lang, setSelectedCategory } = useStore();
  const featuredRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuredRef, { once: true, margin: '-100px' });

  const bestsellers = products.filter(p => p.isBestseller);
  const newArrivals = products.filter(p => p.isNew);

  const texts = {
    hy: {
      hero1: 'Հայաստանի',
      hero2: 'Պրեմիում',
      hero3: 'Ոսկերչական',
      heroSub: 'Գնեք ոսկի ամենաբարձր որակով — 14K, 18K, 24K կաշվից պատրաստված բացառիկ զարդեր',
      shopNow: 'Ուսումնասիրել Հավաքածուն',
      goldRate: 'Ոսկու Կուրս',
      categories: 'Կատեգորիաներ',
      bestsellers: 'Ամենավաճառվող',
      newArrivals: 'Նոր Ժամանումներ',
      viewAll: 'Բոլորը Տեսնել',
      trustBadge1: 'Հայկական Ոսկի',
      trustBadge2: 'Անվճար Առաքում',
      trustBadge3: 'Ապահով Վճարում',
      trustBadge4: '5+ Տարի Երաշխիք',
      stats1: 'Ապրանք',
      stats2: 'Հաճախորդ',
      stats3: 'Երկիր',
    },
    ru: {
      hero1: 'Армянские',
      hero2: 'Премиум',
      hero3: 'Украшения',
      heroSub: 'Покупайте золото высочайшего качества — эксклюзивные украшения из 14K, 18K, 24K',
      shopNow: 'Исследовать Коллекцию',
      goldRate: 'Курс Золота',
      categories: 'Категории',
      bestsellers: 'Бестселлеры',
      newArrivals: 'Новинки',
      viewAll: 'Смотреть Все',
      trustBadge1: 'Армянское Золото',
      trustBadge2: 'Бесплатная Доставка',
      trustBadge3: 'Безопасная Оплата',
      trustBadge4: 'Гарантия 5+ Лет',
      stats1: 'Товаров',
      stats2: 'Клиентов',
      stats3: 'Стран',
    },
    en: {
      hero1: 'Armenian',
      hero2: 'Premium',
      hero3: 'Jewelry',
      heroSub: 'Buy gold of the highest quality — exclusive pieces crafted in 14K, 18K, 24K',
      shopNow: 'Explore Collection',
      goldRate: 'Gold Rate',
      categories: 'Categories',
      bestsellers: 'Bestsellers',
      newArrivals: 'New Arrivals',
      viewAll: 'View All',
      trustBadge1: 'Armenian Gold',
      trustBadge2: 'Free Delivery',
      trustBadge3: 'Secure Payment',
      trustBadge4: '5+ Year Warranty',
      stats1: 'Products',
      stats2: 'Customers',
      stats3: 'Countries',
    },
  };
  const t = texts[lang];

  const trustFeatures = [
    { icon: Award, label: t.trustBadge1 },
    { icon: Truck, label: t.trustBadge2 },
    { icon: Shield, label: t.trustBadge3 },
    { icon: Sparkles, label: t.trustBadge4 },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="AURUM Hero"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Animated gold particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#D4AF37]/40"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <Badge variant="gold" className="text-xs tracking-widest px-4 py-1.5">
              ✦ AURUM.AM ✦ SINCE 2018 ✦
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif font-bold leading-tight mb-6"
          >
            <span className="block text-4xl sm:text-5xl lg:text-7xl text-white/90">{t.hero1}</span>
            <span className="block text-5xl sm:text-6xl lg:text-8xl shimmer">{t.hero2}</span>
            <span className="block text-4xl sm:text-5xl lg:text-7xl text-white/90">{t.hero3}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="gold"
              size="lg"
              onClick={() => onNavigate('catalog')}
              icon={<ArrowRight size={16} />}
              className="min-w-48"
            >
              {t.shopNow}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('gold-rate')}
              className="min-w-48"
            >
              {t.goldRate}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { num: '500+', label: t.stats1 },
              { num: '12K+', label: t.stats2 },
              { num: '25+', label: t.stats3 },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-2xl sm:text-3xl font-bold gold-text">{stat.num}</div>
                <div className="text-white/40 text-xs sm:text-sm tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37]/40"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ─── TRUST STRIP ─────────────────────────────────────────────────── */}
      <section className="border-y border-[#D4AF37]/10 py-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustFeatures.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3"
              >
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center">
                  <Icon size={14} className="text-[#D4AF37]" />
                </div>
                <span className="text-sm text-white/60">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENTO CATEGORIES ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#D4AF37]/50 text-xs tracking-[0.4em] uppercase mb-3">✦ {t.categories} ✦</p>
          <h2 className="font-serif text-4xl lg:text-5xl gold-text">
            {lang === 'hy' ? 'Ոսկե Հավաքածուներ' : lang === 'ru' ? 'Золотые Коллекции' : 'Gold Collections'}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 grid-rows-3 gap-4 auto-rows-fr" style={{ minHeight: '600px' }}>
          {bentoItems.map((item, i) => {
            const cat = categories.find(c => c.id === item.id);
            if (!cat) return null;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`${item.gridClass} relative overflow-hidden rounded-sm cursor-pointer group border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-500 ${item.height}`}
                onClick={() => { setSelectedCategory(cat.id); onNavigate('catalog'); }}
              >
                <img
                  src={catImages[item.id]}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-2xl mb-2 block">{cat.icon}</span>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">{cat.label}</h3>
                      <p className="text-white/40 text-sm mt-1">{cat.count} {lang === 'hy' ? 'ապրանք' : lang === 'ru' ? 'товаров' : 'items'}</p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                        <ArrowRight size={16} />
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.3)' }} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── BESTSELLERS ─────────────────────────────────────────────────── */}
      <section className="bg-[#0d0d0d] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-[#D4AF37]/50 text-xs tracking-[0.4em] uppercase mb-2">✦ {t.bestsellers} ✦</p>
              <h2 className="font-serif text-3xl lg:text-4xl gold-text">
                {lang === 'hy' ? 'Ամենասիրված Ապրանքներ' : lang === 'ru' ? 'Самые Популярные' : 'Most Loved'}
              </h2>
            </motion.div>
            <Button variant="outline" size="sm" onClick={() => onNavigate('catalog')} icon={<ArrowRight size={14} />}>
              {t.viewAll}
            </Button>
          </div>

          <div ref={featuredRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestsellers.map((product, i) => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOLD RATE TEASER ─────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glass-card rounded-lg p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🥇</div>
              <h2 className="font-serif text-3xl md:text-4xl gold-text mb-4">
                {lang === 'hy' ? 'Ոսկու Այսօրվա Կուրս' : lang === 'ru' ? 'Курс Золота Сегодня' : "Today's Gold Rate"}
              </h2>
              <div className="flex items-center justify-center gap-6 my-6">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-[#D4AF37]">81,200 ֏</div>
                  <div className="text-white/40 text-sm mt-1">/ {lang === 'hy' ? 'գ' : lang === 'ru' ? 'г' : 'g'}</div>
                </div>
                <div className="w-px h-12 bg-[#D4AF37]/20" />
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-[#D4AF37]">$219</div>
                  <div className="text-white/40 text-sm mt-1">USD / oz</div>
                </div>
                <div className="w-px h-12 bg-[#D4AF37]/20" />
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-400 font-medium">↑ +2.3%</span>
                  </div>
                  <div className="text-white/40 text-sm mt-1">
                    {lang === 'hy' ? '24 ժ' : lang === 'ru' ? '24 ч' : '24h'}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="md" onClick={() => onNavigate('gold-rate')}>
                {lang === 'hy' ? 'Ամբողջ Պատմությունը' : lang === 'ru' ? 'Полная История' : 'Full History'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─────────────────────────────────────────────────── */}
      <section className="bg-[#0d0d0d] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-[#D4AF37]/50 text-xs tracking-[0.4em] uppercase mb-2">✦ {t.newArrivals} ✦</p>
              <h2 className="font-serif text-3xl lg:text-4xl gold-text">
                {lang === 'hy' ? 'Նոր Ժամանած' : lang === 'ru' ? 'Новые Поступления' : 'Just Arrived'}
              </h2>
            </motion.div>
            <Button variant="outline" size="sm" onClick={() => onNavigate('catalog')} icon={<ArrowRight size={14} />}>
              {t.viewAll}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
              <span className="text-white/80">
                {lang === 'hy' ? 'Ձեր Երազած' : lang === 'ru' ? 'Ваше Идеальное' : 'Your Perfect'}
              </span>
              <br />
              <span className="shimmer">
                {lang === 'hy' ? 'Ոսկե Կտոր' : lang === 'ru' ? 'Золотое Украшение' : 'Gold Piece'}
              </span>
              <br />
              <span className="text-white/80">
                {lang === 'hy' ? 'Ձեզ Սպասում Է' : lang === 'ru' ? 'Ждёт Вас' : 'Awaits You'}
              </span>
            </h2>
            <p className="text-white/40 text-lg mb-8 max-w-2xl mx-auto">
              {lang === 'hy'
                ? 'Բացեք մեր ամբողջ հավաքածուն՝ մատանիներ, վզնոցներ, ապարանջաններ և ականջօղեր'
                : lang === 'ru'
                ? 'Откройте нашу полную коллекцию — кольца, ожерелья, браслеты и серьги'
                : 'Explore our full collection — rings, necklaces, bracelets and earrings'}
            </p>
            <Button variant="gold" size="lg" onClick={() => onNavigate('catalog')} icon={<ArrowRight size={18} />}>
              {lang === 'hy' ? 'Ամբողջ Հավաքածուն' : lang === 'ru' ? 'Вся Коллекция' : 'Full Collection'}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
