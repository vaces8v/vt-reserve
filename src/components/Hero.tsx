'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const heroImages = [
  '/example/5465161991300255337.jpg',
  '/example/5465161991300255351.jpg',
  '/example/5465161991300255356.jpg',
  '/example/5465161991300255360.jpg',
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-white overflow-hidden pt-16 sm:pt-20 md:pt-24">
      {/* Декоративные элементы — только десктоп */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <path d="M200 0 L400 200 L400 600 L200 800 L0 600 L0 200 Z" fill="currentColor" className="text-[var(--dark-gray)]" />
        </svg>
      </div>

      {/* Акцентная линия убрана — наслаивалась на контент */}

      <div className="relative z-10 max-w-[1400px] mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
          {/* Левая часть - текст */}
          <div className="flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-12">
            <div>
              {/* Главный заголовок — без анимации для LCP */}
              <h1 className="mb-8">
                <span className="block text-[var(--text-gray)] text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-4">
                  Городская навигация
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[var(--dark-gray)] leading-[1] tracking-tight">
                  Ориентируем
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1] mt-1">
                  <span className="text-[var(--primary-red)]">пространство</span>
                </span>
              </h1>

              {/* Подзаголовок — LCP элемент, рендерится сразу */}
              <p className="text-[var(--dark-gray)] text-lg sm:text-xl md:text-2xl font-medium max-w-lg mb-6 leading-snug">
                Навигационные системы, которые делают город понятным
              </p>

              {/* Описание */}
              <div className="border-l-4 border-[var(--primary-red)] pl-5 mb-10 max-w-md">
                <p className="text-[var(--text-gray)] text-sm md:text-base leading-relaxed">
                  Проектируем и производим информационные указатели, стелы и элементы городской инфраструктуры по всей России
                </p>
              </div>

              {/* Кнопки */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button
                  onClick={scrollToContact}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-3 bg-[var(--primary-red)] text-white px-8 py-4 font-semibold text-base hover:bg-[var(--primary-red-dark)] transition-all duration-300"
                >
                  Обсудить проект
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  onClick={scrollToServices}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 bg-transparent text-[var(--dark-gray)] px-8 py-4 font-semibold text-base border-2 border-[var(--dark-gray)] hover:bg-[var(--dark-gray)] hover:text-white transition-all duration-300"
                >
                  Наши услуги
                </motion.button>
              </div>

              {/* Статистика */}
              <div className="flex flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[var(--border-gray)]">
                {[
                  { value: '500+', label: 'Проектов' },
                  { value: '15', label: 'Лет опыта' },
                  { value: '50+', label: 'Городов' },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-left">
                    <span className="block text-3xl md:text-4xl font-black text-[var(--dark-gray)]">
                      {stat.value}
                    </span>
                    <span className="text-[var(--text-gray)] text-sm uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая часть - слайдер изображений */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center p-8"
          >
            {/* Геометрическая рамка */}
            <div className="absolute inset-12 border-2 border-[var(--primary-red)]/20 transform rotate-3" />
            <div className="absolute inset-16 border-2 border-[var(--dark-gray)]/10 transform -rotate-2" />

            {/* Анимированный слайдер */}
            <div className="relative w-full max-w-lg aspect-[4/5] transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-red)]/20 to-transparent z-10" />
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroImages[currentImage]}
                      alt="Навигационные системы"
                      fill
                      sizes="(max-width: 1024px) 0px, 50vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Декоративные элементы на изображении */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--primary-red)] z-20 flex items-center justify-center">
                <span className="text-white text-xs font-bold text-center leading-tight">
                  КАЧЕСТВО<br />100%
                </span>
              </div>

              <div className="absolute -top-4 -right-4 w-32 h-32 border-4 border-[var(--dark-gray)] z-0" />

              {/* Индикаторы слайдов */}
              <div className="absolute bottom-4 right-4 z-20 flex gap-1">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    aria-label={`Слайд ${index + 1}`}
                    className={`w-8 h-8 flex items-center justify-center transition-all duration-300`}
                  >
                    <span className={`block h-2 rounded-full transition-all duration-300 ${index === currentImage
                      ? 'bg-[var(--primary-red)] w-6'
                      : 'bg-white/50 hover:bg-white/80 w-2'
                      }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Боковой текст */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 transform rotate-90 origin-center">
              <span className="text-[var(--text-gray)] text-xs tracking-[0.3em] uppercase whitespace-nowrap">
                Городская навигация • 2024
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Мобильное изображение с анимацией */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="lg:hidden relative mx-6 mb-8 -mt-8"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentImage]}
                alt="Навигационные системы"
                fill
                sizes="(max-width: 1024px) 100vw, 0px"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

          {/* Мобильные индикаторы */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                aria-label={`Слайд ${index + 1}`}
                className="w-8 h-8 flex items-center justify-center"
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${index === currentImage
                  ? 'bg-[var(--primary-red)] w-6'
                  : 'bg-[var(--dark-gray)]/30 hover:bg-[var(--dark-gray)]/50 w-2'
                  }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Листайте - мобильная версия */}
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center justify-center gap-2 w-full mt-6 text-[var(--text-gray)] hover:text-[var(--primary-red)] transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Листайте</span>
          <ArrowDown size={18} />
        </motion.button>
      </motion.div>

      {/* Scroll indicator - desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-[var(--text-gray)] hover:text-[var(--primary-red)] transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Листайте</span>
          <ArrowDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
}
