'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

const navItems = [
  { name: 'Главная', href: '#hero' },
  { name: 'Услуги', href: '#services' },
  { name: 'Портфолио', href: '#portfolio' },
  { name: 'О компании', href: '#about' },
  { name: 'Контакты', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-[background-color,box-shadow,transform] duration-500 ${isScrolled
          ? 'bg-white shadow-[0_2px_30px_rgba(0,0,0,0.08)]'
          : 'bg-white/0 shadow-none'
          } ${isMobileMenuOpen ? '-translate-y-full lg:translate-y-0' : 'translate-y-0'}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center group"
            >
              <img src="/logo.svg" alt="ВТ-Резерв" className="h-10 w-auto" />
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="relative px-5 py-2 text-[var(--dark-gray)] font-medium text-sm tracking-wide hover:text-[var(--primary-red)] transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--primary-red)] transition-all duration-300 group-hover:w-1/2" />
                </motion.a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Phone */}
              <a
                href="tel:+74950040381"
                className="hidden lg:flex items-center gap-2 text-[var(--dark-gray)] hover:text-[var(--primary-red)] transition-colors font-medium"
              >
                <Phone size={18} />
                +7 (495) 004-03-81
              </a>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:flex items-center gap-2 bg-[var(--primary-red)] text-white px-6 py-3 font-semibold text-sm hover:bg-[var(--primary-red-dark)] transition-colors group"
              >
                Заказать
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isMobileMenuOpen}
                className="lg:hidden w-12 h-12 flex items-center justify-center text-[var(--dark-gray)] hover:text-[var(--primary-red)] transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-full bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-gray)]">
                  <img src="/logo.svg" alt="ВТ-Резерв" className="h-8 w-auto" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Закрыть меню"
                    className="w-12 h-12 flex items-center justify-center text-[var(--dark-gray)] hover:text-[var(--primary-red)] transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="flex items-center justify-between py-4 text-[var(--dark-gray)] font-semibold text-lg border-b border-[var(--border-gray)] hover:text-[var(--primary-red)] transition-colors"
                    >
                      {item.name}
                      <ArrowRight size={18} className="text-[var(--text-gray)]" />
                    </motion.a>
                  ))}
                </nav>

                {/* Bottom section */}
                <div className="p-6 bg-[var(--light-gray)]">
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#contact');
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full bg-[var(--primary-red)] text-white px-6 py-4 font-semibold hover:bg-[var(--primary-red-dark)] transition-colors"
                  >
                    Заказать проект
                    <ArrowRight size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
