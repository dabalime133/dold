import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { categories } from '../../data/products';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { lang, setSelectedCategory } = useStore();

  return (
    <footer className="bg-[#080808] border-t border-[#D4AF37]/10 mt-20">
      {/* Marquee */}
      <div className="py-4 border-b border-[#D4AF37]/5 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mr-8">
              {['AURUM.AM', '✦', 'Գնել Ոսկի', '✦', 'Premium Jewelry', '✦', 'Հայաստան', '✦', 'Since 2018', '✦', 'Купить Золото', '✦'].map(
                (item, j) => (
                  <span key={j} className="text-[#D4AF37]/30 text-xs tracking-[0.3em] uppercase whitespace-nowrap">
                    {item}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
                <span className="text-[#D4AF37] font-serif text-lg font-bold">A</span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold tracking-[0.2em] gold-text">AURUM</span>
                <span className="text-[#D4AF37]/40 text-xs tracking-[0.3em]">.AM</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {lang === 'hy'
                ? 'Հայաստանի ամենավստահելի ոսկերչական խանութը։ 2018 թ.-ից ի վեր ծառայում ենք ձեզ բարձրագույն որակի ոսկե իրերով։'
                : lang === 'ru'
                ? 'Самый надёжный ювелирный магазин Армении. С 2018 года служим вам изделиями высочайшего качества.'
                : 'Armenia\'s most trusted jewelry store. Serving you with the highest quality gold pieces since 2018.'}
            </p>
            <div className="flex gap-3">
              {['IG', 'FB', 'YT'].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-[#D4AF37]/20 rounded-full flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 text-xs font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-5">
              {lang === 'hy' ? 'Կատեգորիաներ' : lang === 'ru' ? 'Категории' : 'Categories'}
            </h3>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => { setSelectedCategory(cat.id); onNavigate('catalog'); }}
                    className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className="text-white/20 text-xs">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-5">
              {lang === 'hy' ? 'Հղումներ' : lang === 'ru' ? 'Ссылки' : 'Links'}
            </h3>
            <ul className="space-y-3">
              {[
                { hy: 'Մեր Մասին', ru: 'О Нас', en: 'About Us', page: 'about' },
                { hy: 'Ոսկու Կուրս', ru: 'Курс Золота', en: 'Gold Rate', page: 'gold-rate' },
                { hy: 'Հասցե ու Կապ', ru: 'Контакты', en: 'Contact', page: 'contact' },
                { hy: 'Ծառայություններ', ru: 'Услуги', en: 'Services', page: 'about' },
                { hy: 'Կարգաւություններ', ru: 'Условия', en: 'Terms', page: 'about' },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors"
                  >
                    {link[lang]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-5">
              {lang === 'hy' ? 'Կապ' : lang === 'ru' ? 'Контакты' : 'Contact'}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D4AF37]/50 mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">Երևան, Հյուսիսային Պողոտա 12</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#D4AF37]/50 shrink-0" />
                <a href="tel:+37410123456" className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors">
                  +374 10 12 34 56
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#D4AF37]/50 shrink-0" />
                <a href="mailto:info@aurum.am" className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors">
                  info@aurum.am
                </a>
              </li>
            </ul>

            <div className="mt-6 p-3 border border-[#D4AF37]/15 rounded-sm bg-[#D4AF37]/5">
              <p className="text-xs text-white/40 mb-1">
                {lang === 'hy' ? 'Աշխատանքային ժամեր' : lang === 'ru' ? 'Часы работы' : 'Working Hours'}
              </p>
              <p className="text-sm text-[#D4AF37]/70">
                {lang === 'hy' ? 'Ամեն օր 10:00 — 20:00' : lang === 'ru' ? 'Ежедневно 10:00 — 20:00' : 'Daily 10:00 — 20:00'}
              </p>
            </div>
          </div>
        </div>

        <div className="gold-separator mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2024 AURUM.AM. {lang === 'hy' ? 'Բոլոր իրավունքները պաշտպանված են' : lang === 'ru' ? 'Все права защищены' : 'All rights reserved'}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/25 text-xs">Made with ♥ in Armenia</span>
            <div className="flex gap-2">
              {['visa', 'master', 'amex'].map(card => (
                <div key={card} className="px-2 py-1 border border-white/10 rounded text-[10px] text-white/30 uppercase">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
