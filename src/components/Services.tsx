'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'НАВИГАЦИЯ В МЕДУЧРЕЖДЕНИЯХ',
    image: '/example/5465161991300255289.jpg',
    size: 'large',
  },
  {
    id: 2,
    title: 'НАВИГАЦИЯ В ЖК',
    image: '/example/5465161991300255290.jpg',
    size: 'medium',
  },
  {
    id: 3,
    title: 'НАВИГАЦИЯ В ПАРКЕ',
    image: '/example/5465161991300255291.jpg',
    size: 'medium',
  },
  {
    id: 4,
    title: 'НАВИГАЦИЯ В ТЦ И БЦ',
    image: '/example/5465161991300255292.jpg',
    size: 'medium',
  },
  {
    id: 5,
    title: 'НАВИГАЦИЯ НА ПАРКИНГЕ',
    image: '/example/5465161991300255327.jpg',
    size: 'medium',
  },
  {
    id: 6,
    title: 'ИНФОРМАЦИОННЫЕ СТЕНДЫ',
    image: '/example/5465161991300255328.jpg',
    size: 'medium',
  },
];

const features = [
  { title: 'Проектирование', desc: 'Разработка дизайн-концепции и технической документации' },
  { title: 'Производство', desc: 'Изготовление на собственном производстве' },
  { title: 'Монтаж', desc: 'Профессиональная установка и настройка' },
];

export default function Services() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[var(--primary-red)]" />
              <span className="text-[var(--primary-red)] font-semibold text-sm uppercase tracking-wider">
                Услуги
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--dark-gray)] leading-[0.95]">
              РЕАЛИЗУЕМ
              <span className="block text-[var(--primary-red)]">САМЫЕ</span>
              <span className="block">СЛОЖНЫЕ</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text-gray)] mt-2">
                проекты
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <p className="text-[var(--text-gray)] text-lg mb-8 leading-relaxed">
              Используем не шаблонные решения, для каждого объекта разрабатывается
              креативный проект по индивидуальным критериям, в итоге получаете результат
              в соответствии с вашими ожиданиями.
            </p>
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex-1 min-w-[150px] p-4 border-l-2 border-[var(--primary-red)]"
                >
                  <span className="block text-[var(--dark-gray)] font-bold text-sm mb-1">
                    {feature.title}
                  </span>
                  <span className="text-[var(--text-gray)] text-xs">
                    {feature.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Services Grid - 2-column layout with featured item */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden cursor-pointer ${index === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                }`}
            >
              <div className={`relative w-full h-full overflow-hidden ${index === 0 ? 'aspect-[16/9] sm:aspect-auto min-h-[300px] lg:min-h-0' : 'aspect-[4/3]'
                }`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Red accent on hover */}
                <div className="absolute inset-0 bg-[var(--primary-red)]/0 group-hover:bg-[var(--primary-red)]/20 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                  <h3 className={`font-bold text-white leading-tight ${index === 0 ? 'text-lg md:text-2xl' : 'text-sm md:text-base'
                    }`}>
                    {service.title}
                  </h3>

                  {/* Arrow on hover */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                      Подробнее <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[var(--primary-red)] border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 bg-[var(--dark-gray)] text-white px-10 py-5 font-semibold text-base hover:bg-[var(--primary-red)] transition-all duration-300"
          >
            Обсудить ваш проект
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
