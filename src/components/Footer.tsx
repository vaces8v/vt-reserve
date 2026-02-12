'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Mail, MapPin } from 'lucide-react';

const footerLinks = [
  { name: 'Главная', href: '#hero' },
  { name: 'Услуги', href: '#services' },
  { name: 'Портфолио', href: '#portfolio' },
  { name: 'О компании', href: '#about' },
  { name: 'Контакты', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[var(--dark-gray)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--primary-red)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ВТ</span>
              </div>
              <span className="font-bold text-lg text-white">ВТ-Резерв</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Комплексные решения для городской навигации и инфраструктуры.
              Создаём понятную и комфортную городскую среду.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:vtreserve0@gmail.com"
                className="flex items-center gap-2 text-gray-400 hover:text-[var(--primary-red)] transition-colors"
              >
                <Mail size={18} />
                vtreserve0@gmail.com
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} className="flex-shrink-0" />
                <span className="text-sm">г. Москва, ул. Василия Петушкова, д. 3, стр.1</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Навигация</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-[var(--primary-red)] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Реквизиты</h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>ООО «ВТ-Резерв»</p>
              <p>ИНН: 7733411950</p>
              <p>КПП: 773301001</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ООО «ВТ-Резерв». Все права защищены.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Наверх"
            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[var(--primary-red)] transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
