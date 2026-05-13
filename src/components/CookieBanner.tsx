'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const COOKIE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[420px] z-[100] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-5"
        >
          <button
            onClick={decline}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Закрыть"
          >
            <X size={14} />
          </button>

          <div className="flex gap-3.5 items-start">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-red)]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie size={20} className="text-[var(--primary-red)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[var(--dark-gray)] font-bold text-sm mb-1">
                Мы используем cookie
              </p>
              <p className="text-[var(--text-gray)] text-xs leading-relaxed mb-4">
                Для улучшения работы сайта и анализа посещений (Яндекс.Метрика). Подробнее в{' '}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-[var(--primary-red)] hover:underline"
                >
                  Политике конфиденциальности
                </Link>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={accept}
                  className="px-4 py-2 bg-[var(--primary-red)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--primary-red-dark)] active:scale-[0.97] transition-all"
                >
                  Принять
                </button>
                <button
                  onClick={decline}
                  className="px-4 py-2 bg-gray-100 text-[var(--text-gray)] text-xs font-semibold rounded-lg hover:bg-gray-200 active:scale-[0.97] transition-all"
                >
                  Отклонить
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
