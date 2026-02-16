'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Drawer } from 'vaul';

const services = [
  {
    id: 1,
    title: 'НАВИГАЦИЯ В МЕДУЧРЕЖДЕНИЯХ',
    description: 'Разрабатываем понятные системы ориентирования для пациентов и персонала. Учитываем специфику потоков, требования доступной среды и стрессовое состояние посетителей.',
    features: ['Поэтажные планы и карты', 'Напольная навигация', 'Таблички кабинетов', 'Доступная среда'],
    image: '/example/5465161991300255289.jpg',
    size: 'large',
  },
  {
    id: 2,
    title: 'НАВИГАЦИЯ В ЖК',
    description: 'Создаем комфортную среду для жителей и гостей. Единый стиль адресных табличек, указателей подъездов, навигации на территории и в паркинге.',
    features: ['Въездные стелы', 'Адресные таблички', 'Навигация в подъездах', 'Схемы территории'],
    image: '/example/5465161991300255290.jpg',
    size: 'medium',
  },
  {
    id: 3,
    title: 'НАВИГАЦИЯ В ПАРКЕ',
    description: 'Интегрируем навигацию в природный ландшафт. Карты территории, указатели маршрутов, правила поведения и информационные стелы, устойчивые к погодным условиям.',
    features: ['Обзорные карты', 'Указатели маршрутов', 'Информационные стенды', 'Антивандальное исполнение'],
    image: '/example/5465161991300255291.jpg',
    size: 'medium',
  },
  {
    id: 4,
    title: 'НАВИГАЦИЯ В ТЦ И БЦ',
    description: 'Эффективное управление потоками посетителей. Помогаем быстро найти нужный магазин или офис, повышаем лояльность клиентов и арендаторов.',
    features: ['Подвесные указатели', 'Интерактивные киоски', 'Навигация в лифтах', 'Зонирование пространства'],
    image: '/example/5465161991300255292.jpg',
    size: 'medium',
  },
  {
    id: 5,
    title: 'НАВИГАЦИЯ НА ПАРКИНГЕ',
    description: 'Безопасность и удобство маневрирования. Цветовое кодирование зон, крупные читаемые знаки, напольная разметка и световая навигация.',
    features: ['Цветовое зонирование', 'Световые указатели', 'Напольная разметка', 'Знаки безопасности'],
    image: '/example/5465161991300255327.jpg',
    size: 'medium',
  },
  {
    id: 6,
    title: 'ИНФОРМАЦИОННЫЕ СТЕНДЫ',
    description: 'Уличные и интерьерные конструкции. Антивандальное исполнение, сменная информация, подсветка и современные материалы.',
    features: ['Уличные стенды', 'Интерьерные панно', 'Стенды с подсветкой', 'Модульные конструкции'],
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
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsDrawerOpen(false);
  };

  const openService = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
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
              onClick={() => openService(service)}
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

      {/* Service Detail Drawer (Mobile) */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 max-h-[90vh] bg-white rounded-t-[20px] z-50 outline-none flex flex-col md:hidden">
            <div className="p-4 bg-white rounded-t-[20px] flex-1 overflow-y-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />

              {selectedService && (
                <div className="max-w-2xl mx-auto pb-8">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 shadow-lg">
                    <Image
                      src={selectedService.image}
                      alt={selectedService.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="px-2">
                    <h3 className="text-2xl md:text-3xl font-black text-[var(--dark-gray)] mb-4 leading-tight">
                      {selectedService.title}
                    </h3>

                    <p className="text-[var(--text-gray)] text-lg leading-relaxed mb-8">
                      {selectedService.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {selectedService.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-[var(--light-gray)] p-3 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-[var(--primary-red)]/10 flex items-center justify-center flex-shrink-0">
                            <Check size={14} className="text-[var(--primary-red)]" />
                          </div>
                          <span className="text-[var(--dark-gray)] font-medium text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={scrollToContact}
                      className="w-full bg-[var(--primary-red)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--primary-red-dark)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      Заказать расчет
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Service Detail Side Panel (Desktop) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 hidden md:block"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 hidden md:flex flex-col"
            >
              {selectedService && (
                <div className="flex flex-col h-full">
                  {/* Header Image */}
                  <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
                    <Image
                      src={selectedService.image}
                      alt={selectedService.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Content Scrollable Area */}
                  <div className="flex-1 overflow-y-auto p-8 sm:p-10">
                    <h3 className="text-3xl sm:text-4xl font-black text-[var(--dark-gray)] mb-6 leading-tight">
                      {selectedService.title}
                    </h3>

                    <p className="text-[var(--text-gray)] text-lg sm:text-xl leading-relaxed mb-10">
                      {selectedService.description}
                    </p>

                    <h4 className="text-[var(--dark-gray)] font-bold text-lg mb-4 uppercase tracking-wider">
                      Что входит в услугу:
                    </h4>
                    <div className="grid grid-cols-1 gap-4 mb-10">
                      {selectedService.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-[var(--light-gray)] p-4 rounded-xl">
                          <div className="w-8 h-8 rounded-full bg-[var(--primary-red)]/10 flex items-center justify-center flex-shrink-0">
                            <Check size={16} className="text-[var(--primary-red)]" />
                          </div>
                          <span className="text-[var(--dark-gray)] font-medium text-base">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="p-8 border-t border-[var(--border-gray)] bg-white">
                    <button
                      onClick={scrollToContact}
                      className="w-full bg-[var(--primary-red)] text-white py-5 rounded-xl font-bold text-xl hover:bg-[var(--primary-red-dark)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                    >
                      Заказать расчет
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
