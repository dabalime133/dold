import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductVariant } from '../data/products';

// ─── Cart ───────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

// ─── Wishlist ────────────────────────────────────────────────────────────────

export interface WishlistItem {
  product: Product;
  variant: ProductVariant;
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  read: boolean;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: string;
  createdAt: Date;
  note?: string;
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product, variant: ProductVariant) => void;
  removeFromWishlist: (variantId: string) => void;
  isInWishlist: (variantId: string) => boolean;

  // User / Auth
  user: User | null;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  pendingEmail: string;
  setUser: (user: User | null) => void;
  openAuthModal: (mode?: 'login' | 'register', email?: string) => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  logout: () => void;

  // Chat
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  chatUnread: number;
  addChatMessage: (text: string, sender: 'user' | 'admin') => void;
  openChat: () => void;
  closeChat: () => void;
  markChatRead: () => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // UI
  lang: 'hy' | 'ru' | 'en';
  setLang: (lang: 'hy' | 'ru' | 'en') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest';
  setSortBy: (sort: 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;
}

const adminUser: User = {
  id: 'admin-1',
  name: 'AURUM Ադմին',
  email: 'admin@aurum.am',
  role: 'ADMIN',
  avatar: undefined,
};

const demoUser: User = {
  id: 'user-1',
  name: 'Արամ Պետրոսյան',
  email: 'aram@example.am',
  phone: '+374 91 234567',
  address: 'Երևան, Աբովյան 15, բն. 42',
  role: 'USER',
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // ── Cart ──
      cart: [],
      addToCart: (product, variant) => {
        const existing = get().cart.find(i => i.variant.id === variant.id);
        if (existing) {
          set(s => ({
            cart: s.cart.map(i =>
              i.variant.id === variant.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        } else {
          set(s => ({ cart: [...s.cart, { product, variant, quantity: 1 }] }));
        }
      },
      removeFromCart: (variantId) =>
        set(s => ({ cart: s.cart.filter(i => i.variant.id !== variantId) })),
      updateQuantity: (variantId, qty) => {
        if (qty <= 0) {
          get().removeFromCart(variantId);
        } else {
          set(s => ({
            cart: s.cart.map(i =>
              i.variant.id === variantId ? { ...i, quantity: qty } : i
            ),
          }));
        }
      },
      clearCart: () => set({ cart: [] }),
      cartTotal: () =>
        get().cart.reduce((sum, i) => sum + i.variant.price * i.quantity, 0),
      cartCount: () =>
        get().cart.reduce((sum, i) => sum + i.quantity, 0),

      // ── Wishlist ──
      wishlist: [],
      addToWishlist: (product, variant) => {
        if (!get().isInWishlist(variant.id)) {
          set(s => ({ wishlist: [...s.wishlist, { product, variant }] }));
        }
      },
      removeFromWishlist: (variantId) =>
        set(s => ({ wishlist: s.wishlist.filter(w => w.variant.id !== variantId) })),
      isInWishlist: (variantId) =>
        get().wishlist.some(w => w.variant.id === variantId),

      // ── Auth ──
      user: null,
      isAuthModalOpen: false,
      authMode: 'login',
      pendingEmail: '',
      setUser: (user) => set({ user }),
      openAuthModal: (mode = 'login', email = '') =>
        set({ isAuthModalOpen: true, authMode: mode, pendingEmail: email }),
      closeAuthModal: () => set({ isAuthModalOpen: false, pendingEmail: '' }),
      setAuthMode: (mode) => set({ authMode: mode }),
      logout: () => set({ user: null }),

      // ── Chat ──
      chatMessages: [
        {
          id: 'msg-0',
          text: 'Բարև ձեզ! Ես AURUM-ի վիրտուալ օգնականն եմ։ Ինչպե՞ս կարող եմ օգնել ձեզ այսօր։',
          sender: 'admin',
          timestamp: new Date(),
          read: false,
        },
      ],
      isChatOpen: false,
      chatUnread: 1,
      addChatMessage: (text, sender) => {
        const msg: ChatMessage = {
          id: `msg-${Date.now()}`,
          text,
          sender,
          timestamp: new Date(),
          read: sender === 'user' ? true : false,
        };
        set(s => ({
          chatMessages: [...s.chatMessages, msg],
          chatUnread: sender === 'admin' && !s.isChatOpen ? s.chatUnread + 1 : s.chatUnread,
        }));

        // Auto-reply from admin
        if (sender === 'user') {
          setTimeout(() => {
            const replies = [
              'Շնորհակալ եք ձեր հաղորդագրության համար։ Մեր մասնագետը կպատասխանի 5 րոպեում։',
              'Ըμ ապրանքի վերաբերյալ ավելի մանրամասն տեղեկություններ ստանալու համար, խնդրում ենք կապ հաստատել +374 10 123456 հեռախոսահամարով։',
              'Ձեր հարցը կարևոր է մեզ համար։ Կկապ հաստատեմ ձեզ հետ ամենամոտ ժամանակ։',
              'Մենք ուրախ ենք, որ կարող ենք ձեզ ծառայել։ Ի՞նչ ոսկե իրի եք փնտրում։',
            ];
            const reply = replies[Math.floor(Math.random() * replies.length)];
            const adminMsg: ChatMessage = {
              id: `msg-${Date.now()}-admin`,
              text: reply,
              sender: 'admin',
              timestamp: new Date(),
              read: false,
            };
            set(s => ({
              chatMessages: [...s.chatMessages, adminMsg],
              chatUnread: !s.isChatOpen ? s.chatUnread + 1 : 0,
            }));
          }, 1500);
        }
      },
      openChat: () => set({ isChatOpen: true, chatUnread: 0 }),
      closeChat: () => set({ isChatOpen: false }),
      markChatRead: () => set({ chatUnread: 0 }),

      // ── Orders ──
      orders: [
        {
          id: 'ORD-001',
          userId: 'user-1',
          userName: 'Արամ Պետրոսյան',
          userEmail: 'aram@example.am',
          userPhone: '+374 91 234567',
          items: [],
          total: 485000,
          status: 'delivered',
          address: 'Երևան, Աբովյան 15',
          createdAt: new Date('2024-12-01'),
          note: 'Հատուկ տուփ',
        },
        {
          id: 'ORD-002',
          userId: 'user-2',
          userName: 'Մարիամ Ստեփանյան',
          userEmail: 'mariam@example.am',
          userPhone: '+374 77 987654',
          items: [],
          total: 695000,
          status: 'processing',
          address: 'Երևան, Տիգրանի Մեծի 8',
          createdAt: new Date('2024-12-10'),
        },
      ],
      addOrder: (order) => set(s => ({ orders: [order, ...s.orders] })),
      updateOrderStatus: (orderId, status) =>
        set(s => ({
          orders: s.orders.map(o => o.id === orderId ? { ...o, status } : o),
        })),

      // ── UI ──
      lang: 'hy',
      setLang: (lang) => set({ lang }),
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      selectedCategory: '',
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),
      priceRange: [0, 2000000],
      setPriceRange: (range) => set({ priceRange: range }),
      sortBy: 'newest',
      setSortBy: (sort) => set({ sortBy: sort }),
    }),
    {
      name: 'aurum-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        lang: state.lang,
        user: state.user,
      }),
    }
  )
);

// Exported demo users for auth simulation
export { adminUser, demoUser };
