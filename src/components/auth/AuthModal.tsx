import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Phone, MapPin, Eye, EyeOff, X } from 'lucide-react';
import { useStore, adminUser, demoUser } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const loginSchema = z.object({
  email: z.string().email('Ճիշտ էլ. հասցե մուտքագրեք'),
  password: z.string().min(6, 'Գաղտնաբառը պետք է ունենա 6+ նիշ'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Անունը պետք է ունենա 2+ տառ'),
  email: z.string().email('Ճիշտ էլ. հասցե մուտքագրեք'),
  password: z.string().min(6, 'Գաղտնաբառը 6+ նիշ'),
  phone: z.string().min(9, 'Ճիշտ հեռախոսահամար մուտքագրեք').optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authMode, pendingEmail, closeAuthModal, setAuthMode, setUser, lang } = useStore();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: pendingEmail, password: '' },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: pendingEmail, password: '', phone: '', address: '' },
  });

  useEffect(() => {
    if (pendingEmail) {
      loginForm.setValue('email', pendingEmail);
      registerForm.setValue('email', pendingEmail);
    }
  }, [pendingEmail]);

  const handleLogin = async (data: LoginForm) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));

    // Demo: admin@aurum.am → admin, any other → user
    if (data.email === 'admin@aurum.am' && data.password === 'admin123') {
      setUser(adminUser);
      closeAuthModal();
    } else if (data.email === demoUser.email) {
      setUser(demoUser);
      closeAuthModal();
    } else if (data.email.includes('@') && data.password.length >= 6) {
      // Auto register flow hint
      setError(lang === 'hy'
        ? 'Այս էլ. հասցեն գրանցված չէ։ Ստեղծե՞լ հաշիվ:'
        : lang === 'ru'
        ? 'Этот email не зарегистрирован. Создать аккаунт?'
        : 'This email is not registered. Create an account?');
      setTimeout(() => {
        setAuthMode('register');
        setError('');
      }, 1800);
    } else {
      setError(lang === 'hy' ? 'Սխալ էլ. հասցե կամ գաղտնաբառ' : lang === 'ru' ? 'Неверный email или пароль' : 'Invalid email or password');
    }
    setLoading(false);
  };

  const handleRegister = async (data: RegisterForm) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1000));
    setUser({
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      address: data.address || undefined,
      role: 'USER',
    });
    closeAuthModal();
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setUser({
      id: `google-${Date.now()}`,
      name: 'Google User',
      email: 'user@gmail.com',
      role: 'USER',
    });
    closeAuthModal();
    setLoading(false);
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 modal-overlay"
        onClick={closeAuthModal}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md glass-card rounded-lg overflow-hidden"
      >
        {/* Gold gradient top border */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-white/30 hover:text-[#D4AF37] transition-colors"
          >
            <X size={18} />
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/5">
              <span className="font-serif text-2xl font-bold gold-text">A</span>
            </div>
            <h2 className="font-serif text-2xl gold-text mb-1">
              {authMode === 'login'
                ? (lang === 'hy' ? 'Մուտք' : lang === 'ru' ? 'Вход' : 'Sign In')
                : (lang === 'hy' ? 'Գրանցում' : lang === 'ru' ? 'Регистрация' : 'Register')}
            </h2>
            <p className="text-white/40 text-sm">
              {authMode === 'login'
                ? (lang === 'hy' ? 'Բարի գալուստ AURUM.AM' : lang === 'ru' ? 'Добро пожаловать' : 'Welcome back to AURUM.AM')
                : (lang === 'hy' ? 'Ստեղծեք ձեր հաշիվը' : lang === 'ru' ? 'Создайте ваш аккаунт' : 'Create your account')}
            </p>
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-white/10 rounded-sm text-sm text-white/70 hover:border-[#D4AF37]/30 hover:text-white hover:bg-white/5 transition-all duration-300 mb-5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {lang === 'hy' ? 'Google-ով շարունակել' : lang === 'ru' ? 'Продолжить с Google' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs uppercase tracking-wider">
              {lang === 'hy' ? 'կամ' : lang === 'ru' ? 'или' : 'or'}
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs */}
          <div className="flex border border-[#D4AF37]/15 rounded-sm mb-6 overflow-hidden">
            {(['login', 'register'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => { setAuthMode(mode); setError(''); }}
                className={`flex-1 py-2.5 text-xs tracking-wider uppercase transition-all duration-300 ${
                  authMode === mode
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] font-medium'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {mode === 'login'
                  ? (lang === 'hy' ? 'Մուտք' : lang === 'ru' ? 'Вход' : 'Login')
                  : (lang === 'hy' ? 'Գրանցում' : lang === 'ru' ? 'Регистрация' : 'Register')}
              </button>
            ))}
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="space-y-4"
              >
                <Input
                  label={lang === 'hy' ? 'Էլ. Հասցե' : lang === 'ru' ? 'Email' : 'Email'}
                  type="email"
                  placeholder="you@example.am"
                  icon={<Mail size={14} />}
                  {...loginForm.register('email')}
                  error={loginForm.formState.errors.email?.message}
                />
                <div className="relative">
                  <Input
                    label={lang === 'hy' ? 'Գաղտնաբառ' : lang === 'ru' ? 'Пароль' : 'Password'}
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    icon={<Lock size={14} />}
                    suffix={
                      <button type="button" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    }
                    {...loginForm.register('password')}
                    error={loginForm.formState.errors.password?.message}
                  />
                </div>
                <div className="text-xs text-white/30 mt-1">
                  <span className="text-[#D4AF37]/50">Demo: </span>
                  admin@aurum.am / admin123
                </div>
                <Button type="submit" variant="gold" size="lg" loading={loading} className="w-full mt-2">
                  {lang === 'hy' ? 'Մուտք Գործել' : lang === 'ru' ? 'Войти' : 'Sign In'}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={registerForm.handleSubmit(handleRegister)}
                className="space-y-4"
              >
                <Input
                  label={lang === 'hy' ? 'Անուն Ազգանուն' : lang === 'ru' ? 'Имя Фамилия' : 'Full Name'}
                  placeholder={lang === 'hy' ? 'Արամ Պետրոսյան' : 'John Doe'}
                  icon={<User size={14} />}
                  {...registerForm.register('name')}
                  error={registerForm.formState.errors.name?.message}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.am"
                  icon={<Mail size={14} />}
                  {...registerForm.register('email')}
                  error={registerForm.formState.errors.email?.message}
                />
                <Input
                  label={lang === 'hy' ? 'Գաղտնաբառ' : lang === 'ru' ? 'Пароль' : 'Password'}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  icon={<Lock size={14} />}
                  suffix={
                    <button type="button" onClick={() => setShowPass(!showPass)}>
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  }
                  {...registerForm.register('password')}
                  error={registerForm.formState.errors.password?.message}
                />
                <Input
                  label={lang === 'hy' ? 'Հեռ. Համար' : lang === 'ru' ? 'Телефон' : 'Phone'}
                  type="tel"
                  placeholder="+374 9X XXX XXX"
                  icon={<Phone size={14} />}
                  {...registerForm.register('phone')}
                  error={registerForm.formState.errors.phone?.message}
                />
                <Input
                  label={lang === 'hy' ? 'Հասցե (կամընտիր)' : lang === 'ru' ? 'Адрес (необязательно)' : 'Address (optional)'}
                  placeholder={lang === 'hy' ? 'Երևան, Բաղրամյան 1' : 'Yerevan, Baghramyan 1'}
                  icon={<MapPin size={14} />}
                  {...registerForm.register('address')}
                />
                <Button type="submit" variant="gold" size="lg" loading={loading} className="w-full mt-2">
                  {lang === 'hy' ? 'Ստեղծել Հաշիվ' : lang === 'ru' ? 'Создать аккаунт' : 'Create Account'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
