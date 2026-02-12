'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Clock, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'vtreserve0@gmail.com',
    href: 'mailto:vtreserve0@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Адрес',
    content: 'г. Москва, ул. Василия Петушкова, д. 3, стр.1, офис 303',
  },
  {
    icon: Clock,
    title: 'Режим работы',
    content: 'Пн-Пт: 9:00 - 18:00',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch {
      // silent fail
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[var(--dark-gray)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <path d="M200 0 L400 200 L400 600 L200 800 L0 600 L0 200 Z" fill="white" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--primary-red)]/10 blur-[100px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[var(--primary-red)]" />
              <span className="text-[var(--primary-red)] font-semibold text-sm uppercase tracking-wider">
                Контакты
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white leading-[0.95] mb-6">
              ОБСУДИМ
              <span className="block text-[var(--primary-red)]">ВАШ ПРОЕКТ?</span>
            </h2>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md">
              Свяжитесь с нами любым удобным способом или оставьте заявку —
              мы ответим в течение 24 часов
            </p>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group p-5 bg-white/5 border border-white/10 hover:border-[var(--primary-red)]/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--primary-red)] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">
                        {item.title}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white font-medium hover:text-[var(--primary-red)] transition-colors text-sm"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <span className="text-white font-medium text-sm">{item.content}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-8 md:p-10">
              <h3 className="text-2xl font-black text-[var(--dark-gray)] mb-2">
                ОСТАВИТЬ ЗАЯВКУ
              </h3>
              <p className="text-[var(--text-gray)] mb-8 text-sm">
                Заполните форму и мы свяжемся с вами
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-black text-[var(--dark-gray)] mb-2">
                    ОТЛИЧНО!
                  </h4>
                  <p className="text-[var(--text-gray)]">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[var(--dark-gray)] uppercase tracking-wider mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-[var(--border-gray)] focus:border-[var(--primary-red)] outline-none transition-all text-[var(--dark-gray)]"
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[var(--dark-gray)] uppercase tracking-wider mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-[var(--border-gray)] focus:border-[var(--primary-red)] outline-none transition-all text-[var(--dark-gray)]"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[var(--dark-gray)] uppercase tracking-wider mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-[var(--border-gray)] focus:border-[var(--primary-red)] outline-none transition-all text-[var(--dark-gray)]"
                        placeholder="+7 (XXX) XXX-XX-XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[var(--dark-gray)] uppercase tracking-wider mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-[var(--border-gray)] focus:border-[var(--primary-red)] outline-none transition-all resize-none text-[var(--dark-gray)]"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[var(--primary-red)] text-white py-5 font-bold hover:bg-[var(--primary-red-dark)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-8"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <ArrowRight size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
