import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Badge } from '../ui/Badge';
import type { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  index?: number;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('hy-AM', { style: 'currency', currency: 'AMD', maximumFractionDigits: 0 })
    .format(price).replace('AMD', '֏');

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, index = 0 }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, lang } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const firstAvailable = product.variants.find(v => v.inStock) || product.variants[0];
  const inWishlist = isInWishlist(firstAvailable.id);
  const lowestPrice = Math.min(...product.variants.filter(v => v.inStock).map(v => v.price));
  const hasOutOfStock = product.variants.some(v => !v.inStock);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(firstAvailable.id);
    } else {
      addToWishlist(product, firstAvailable);
    }
  }, [inWishlist, firstAvailable, product, addToWishlist, removeFromWishlist]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (firstAvailable.inStock) {
      addToCart(product, firstAvailable);
    }
  }, [firstAvailable, product, addToCart]);

  const name = lang === 'en' ? product.nameEn : lang === 'ru' ? product.nameRu : product.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="product-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onNavigate('product', { id: product.id })}
    >
      <div className="relative overflow-hidden rounded-sm bg-[#111] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all duration-500">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          {!imgError ? (
            <img
              src={product.image}
              alt={name}
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
              <span className="text-6xl opacity-30">💍</span>
            </div>
          )}

          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge variant="gold">
                {lang === 'hy' ? 'Նոր' : lang === 'ru' ? 'Новинка' : 'New'}
              </Badge>
            )}
            {product.isBestseller && (
              <Badge variant="green">
                {lang === 'hy' ? 'Bestseller' : lang === 'ru' ? 'Хит' : 'Bestseller'}
              </Badge>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
              inWishlist
                ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/50'
                : 'bg-black/40 border border-white/10 opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart
              size={14}
              className={inWishlist ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white/80'}
            />
          </button>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-3 left-3 right-3 flex gap-2"
          >
            <button
              onClick={handleAddToCart}
              disabled={!firstAvailable.inStock}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-sm text-xs font-medium transition-all duration-300 ${
                firstAvailable.inStock
                  ? 'bg-[#D4AF37] text-black hover:bg-[#F0D060]'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              <ShoppingBag size={12} />
              {firstAvailable.inStock
                ? (lang === 'hy' ? 'Զամբյուղ' : lang === 'ru' ? 'В корзину' : 'Add to Cart')
                : (lang === 'hy' ? 'Սպառված' : lang === 'ru' ? 'Нет в наличии' : 'Out of Stock')}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('product', { id: product.id }); }}
              className="w-9 flex items-center justify-center bg-black/60 border border-white/10 hover:border-[#D4AF37]/30 text-white/70 hover:text-[#D4AF37] rounded-sm transition-all duration-300"
            >
              <Eye size={14} />
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-sm text-white/90 leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
              {name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 mb-3">
            {[1,2,3,4,5].map(s => (
              <Star
                key={s}
                size={11}
                className={s <= Math.round(product.rating) ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white/15'}
              />
            ))}
            <span className="text-white/30 text-xs">({product.reviewCount})</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#D4AF37] font-medium text-sm">
                {lang === 'hy' ? 'Սկսած' : lang === 'ru' ? 'От' : 'From'} {formatPrice(lowestPrice)}
              </span>
              <div className="flex items-center gap-2 mt-1">
                {product.variants.map(v => (
                  <span
                    key={v.karat}
                    className="text-xs text-white/30"
                  >
                    {v.karat}
                  </span>
                )).filter((_, i) => {
                  // deduplicate by karat
                  const karat = product.variants[i].karat;
                  return product.variants.findIndex(v => v.karat === karat) === i && i < 3;
                })}
              </div>
            </div>
            {hasOutOfStock && (
              <span className="text-xs text-orange-400/70 border border-orange-400/20 px-2 py-0.5 rounded-full">
                {lang === 'hy' ? 'Մի քանի չափս' : lang === 'ru' ? 'Не все размеры' : 'Limited'}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
