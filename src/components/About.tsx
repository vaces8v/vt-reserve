'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const aboutImages = [
  '/example/5465161991300255331.jpg',
  '/example/5465161991300255333.jpg',
];

const principles = [
  {
    number: '01',
    title: 'Индивидуальный подход',
    desc: 'Для каждого проекта разрабатываем уникальное решение',
  },
  {
    number: '02',
    title: 'Полный цикл',
    desc: 'От концепции до монтажа — всё под ключ',
  },
  {
    number: '03',
    title: 'Гарантия качества',
    desc: 'Соблюдаем стандарты и даём гарантию на работы',
  },
];

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % aboutImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);

  return (
    <section id="about" className="py-20 md:py-32 bg-[var(--light-gray)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Image slider with decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image slider */}
            <div className="relative">
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={aboutImages[currentImage]}
                      alt="Наше производство"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-gray)]/40 to-transparent" />

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  aria-label="Предыдущий слайд"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-all z-10"
                >
                  <ChevronLeft size={20} className="text-[var(--dark-gray)]" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Следующий слайд"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-all z-10"
                >
                  <ChevronRight size={20} className="text-[var(--dark-gray)]" />
                </button>

                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {aboutImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      aria-label={`Слайд ${index + 1}`}
                      className="w-8 h-8 flex items-center justify-center"
                    >
                      <span className={`block h-2 rounded-full transition-all duration-300 ${index === currentImage
                        ? 'bg-[var(--primary-red)] w-6'
                        : 'bg-white/60 hover:bg-white w-2'
                        }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 md:right-8 bg-white p-6 md:p-8 shadow-2xl z-20"
              >
                <div className="text-5xl md:text-6xl font-black text-[var(--primary-red)] leading-none">
                  15+
                </div>
                <div className="text-[var(--dark-gray)] font-semibold mt-2">лет опыта</div>
                <div className="text-[var(--text-gray)] text-sm">на рынке России</div>
              </motion.div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-[var(--primary-red)] -z-10" />
            </div>

            {/* Additional stats row */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: '500+', label: 'Проектов' },
                { value: '50+', label: 'Городов' },
                { value: '100%', label: 'Гарантия' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-black text-[var(--dark-gray)]">
                    {stat.value}
                  </div>
                  <div className="text-[var(--text-gray)] text-xs uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[var(--primary-red)]" />
              <span className="text-[var(--primary-red)] font-semibold text-sm uppercase tracking-wider">
                О компании
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-[var(--dark-gray)] leading-[0.95] mb-6">
              НАШЕ
              <span className="block text-[var(--primary-red)]">ПРИЗВАНИЕ</span>
            </h2>

            <p className="text-xl md:text-2xl text-[var(--dark-gray)] font-medium mb-6 leading-relaxed">
              Дополнять и украшать городскую среду, парки и зоны отдыха
            </p>

            <p className="text-[var(--text-gray)] text-base md:text-lg mb-10 leading-relaxed">
              ООО «ВТ-Резерв» — это команда профессионалов, специализирующаяся на
              разработке и производстве навигационных систем, информационных указателей
              и элементов городской инфраструктуры. Мы создаём понятную и комфортную
              среду для жителей и гостей города.
            </p>

            {/* Principles */}
            <div className="space-y-6 mb-10">
              {principles.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex gap-6 group"
                >
                  <span className="text-4xl font-black text-[var(--border-gray)] group-hover:text-[var(--primary-red)] transition-colors">
                    {item.number}
                  </span>
                  <div className="border-l-2 border-[var(--border-gray)] group-hover:border-[var(--primary-red)] pl-6 transition-colors">
                    <h3 className="text-[var(--dark-gray)] font-bold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[var(--text-gray)] text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 bg-[var(--dark-gray)] text-white px-8 py-4 font-semibold w-fit hover:bg-[var(--primary-red)] transition-all duration-300"
            >
              Узнать больше
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
