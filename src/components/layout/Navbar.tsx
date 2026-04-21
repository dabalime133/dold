import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Globe
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { categories } from '../../data/products';

interface NavbarProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  currentPage: string;
}

const langLabels = { hy: 'ՀԱՅ', ru: 'РУС', en: 'ENG' };

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const {
    cartCount, wishlist, user, openAuthModal, lang, setLang,
    isSearchOpen, setSearchOpen, searchQuery, setSearchQuery,
    setSelectedCategory,
  } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const cartItemCount = cartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: lang === 'hy' ? 'Հավաքածու' : lang === 'ru' ? 'Коллекция' : 'Collection', page: 'catalog' },
    { label: lang === 'hy' ? 'Ոսկու Կուրս' : lang === 'ru' ? 'Курс Золота' : 'Gold Rate', page: 'gold-rate' },
    { label: lang === 'hy' ? 'Մեր Մասին' : lang === 'ru' ? 'О Нас' : 'About', page: 'about' },
    { label: lang === 'hy' ? 'Կապ' : lang === 'ru' ? 'Контакты' : 'Contact', page: 'contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      onNavigate('catalog');
    }
  };

  const handleCategoryNav = (catId: string) => {
    setSelectedCategory(catId);
    onNavigate('catalog');
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#D4AF37]/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center group-hover:border-[#D4AF37] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.3)]">
                <span className="text-[#D4AF37] font-serif text-lg font-bold">A</span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold tracking-[0.2em] gold-text">AURUM</span>
                <span className="text-[#D4AF37]/40 text-xs tracking-[0.3em] font-light">.AM</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`text-sm tracking-wider transition-all duration-300 relative group ${
                    currentPage === link.page
                      ? 'text-[#D4AF37]'
                      : 'text-white/60 hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                    currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!isSearchOpen)}
                className="p-2 text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Language */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 p-2 text-white/60 hover:text-[#D4AF37] transition-colors text-xs tracking-wider"
                >
                  <Globe size={14} />
                  <span>{langLabels[lang]}</span>
                  <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full mt-1 glass-card rounded-sm py-1 w-24 z-50"
                    >
                      {(Object.entries(langLabels) as [typeof lang, string][]).map(([code, label]) => (
                        <button
                          key={code}
                          onClick={() => { setLang(code); setLangOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-xs tracking-wider transition-colors ${
                            lang === code ? 'text-[#D4AF37]' : 'text-white/60 hover:text-[#D4AF37]'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => onNavigate('wishlist')}
                className="relative p-2 text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D4AF37] rounded-full text-[9px] text-black font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => onNavigate('cart')}
                className="relative p-2 text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <motion.span
                    key={cartItemCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D4AF37] rounded-full text-[9px] text-black font-bold flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>

              {/* User */}
              <button
                onClick={() => user ? onNavigate(user.role === 'ADMIN' ? 'admin' : 'profile') : openAuthModal()}
                className="p-2 text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                {user ? (
                  <div className="w-7 h-7 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-xs font-medium">
                    {user.name[0]}
                  </div>
                ) : (
                  <User size={20} />
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-35 bg-[#111]/95 backdrop-blur-xl border-b border-[#D4AF37]/10 px-4 py-4"
            style={{ zIndex: 39 }}
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={lang === 'hy' ? 'Որոնել ոսկե իրեր...' : lang === 'ru' ? 'Поиск украшений...' : 'Search jewelry...'}
                  className="gold-input w-full rounded-sm pl-9 pr-4 py-3 text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-[#D4AF37] text-black text-sm font-medium rounded-sm hover:bg-[#F0D060] transition-colors"
              >
                {lang === 'hy' ? 'Որոնել' : lang === 'ru' ? 'Найти' : 'Search'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-72 glass-card z-50 p-6 pt-20 flex flex-col gap-6"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-[#D4AF37]"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
                  className={`w-full text-left px-3 py-3 rounded-sm text-sm tracking-wider transition-colors ${
                    currentPage === link.page
                      ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                      : 'text-white/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="gold-separator" />

            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
                {lang === 'hy' ? 'Կատեգորիաներ' : lang === 'ru' ? 'Категории' : 'Categories'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryNav(cat.id)}
                    className="flex items-center gap-2 p-2 rounded-sm text-sm text-white/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex gap-2">
                {(Object.entries(langLabels) as [typeof lang, string][]).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`flex-1 py-2 text-xs tracking-wider rounded-sm border transition-colors ${
                      lang === code
                        ? 'border-[#D4AF37]/50 text-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-white/10 text-white/40 hover:border-[#D4AF37]/30'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
