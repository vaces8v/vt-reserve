'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, ExternalLink, FileCheck } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: 'Дорожные знаки',
    subtitle: 'Дорожные знаки со световозвращающей поверхностью',
    number: '№ 97111',
    file: '/97111.pdf',
    preview: '/cert-97111.png',
    tag: 'ГОСТ / Дорожная навигация',
  },
  {
    id: 2,
    title: 'Знаки безопасности',
    subtitle: 'Знаки, плакаты и таблички безопасности',
    number: '№ 97112',
    file: '/97112.pdf',
    preview: '/cert-97112.png',
    tag: 'Безопасность / Навигация',
  },
  {
    id: 3,
    title: 'Знаки для трубопроводов',
    subtitle: 'Информационно-предупреждающие знаки для трубопроводов',
    number: '№ 97113',
    file: '/97113.pdf',
    preview: '/cert-97113.png',
    tag: 'Промышленная навигация',
  },
  {
    id: 4,
    title: 'Опоры и крепления',
    subtitle: 'Опоры дорожных и газовых знаков',
    number: '№ 97114',
    file: '/97114.pdf',
    preview: '/cert-97114.png',
    tag: 'Опоры / Крепёжные системы',
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-[var(--primary-red)]" />
            <span className="text-[var(--primary-red)] font-semibold text-sm uppercase tracking-wider">
              Документы
            </span>
            <span className="w-12 h-[2px] bg-[var(--primary-red)]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[var(--dark-gray)] leading-[0.95] mb-4">
            СЕРТИФИКАТЫ
            <span className="block text-[var(--primary-red)]">КАЧЕСТВА</span>
          </h2>
          <p className="text-[var(--text-gray)] text-base md:text-lg max-w-2xl mx-auto">
            Наша продукция сертифицирована и соответствует всем требованиям
            российских стандартов качества и безопасности
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-7">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="relative h-full overflow-hidden border border-[var(--border-gray)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(16,24,40,0.06)] hover:border-[var(--primary-red)]/30 flex flex-col">

                {/* Top Section: Small Preview */}
                <div className="relative w-full aspect-[4/3] bg-[var(--light-gray)] overflow-hidden flex items-center justify-center p-6 group-hover:bg-[#f4f5f7] transition-colors duration-500">

                  {/* Document Thumbnail */}
                  <div className="relative w-28 sm:w-32 aspect-[1/1.41] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-black/5 transition-all duration-500 group-hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)] group-hover:-translate-y-1.5 group-hover:rotate-2">
                    <img
                      src={cert.preview}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-[var(--primary-red)] uppercase tracking-wider shadow-sm">
                      <FileCheck size={12} />
                      PDF
                    </span>
                    <span className="bg-white/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-semibold text-[var(--dark-gray)] shadow-sm">
                      {cert.number}
                    </span>
                  </div>

                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[var(--primary-red)] text-white shadow-md flex items-center justify-center hover:bg-[var(--primary-red-dark)] transition-transform translate-y-4 group-hover:translate-y-0 duration-300 hover:scale-105"
                      aria-label="Смотреть"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={cert.file}
                      download
                      className="w-12 h-12 rounded-full bg-[var(--dark-gray)] text-white shadow-md flex items-center justify-center hover:bg-black transition-transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 hover:scale-105"
                      aria-label="Скачать"
                    >
                      <Download size={18} />
                    </a>
                  </div>
                </div>

                {/* Bottom Section: Text */}
                <div className="flex flex-col flex-1 p-5 lg:p-6 bg-white z-30">
                  <div className="mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-gray)]">
                      {cert.tag}
                    </span>
                  </div>
                  <h3 className="text-sm lg:text-base font-bold text-[var(--dark-gray)] leading-snug mb-1.5 line-clamp-2 group-hover:text-[var(--primary-red)] transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-gray)] leading-relaxed line-clamp-2 flex-1 mb-5">
                    {cert.subtitle}
                  </p>
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto group/btn inline-flex items-center justify-between w-full border border-[var(--border-gray)] px-4 py-3 text-sm font-semibold text-[var(--dark-gray)] transition-colors duration-300 hover:border-[var(--primary-red)] hover:text-[var(--primary-red)]"
                  >
                    <span>Открыть документ</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
