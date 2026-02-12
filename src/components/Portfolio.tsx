'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const portfolioImages = [
  '/example/5465161991300255289.jpg',
  '/example/5465161991300255290.jpg',
  '/example/5465161991300255291.jpg',
  '/example/5465161991300255292.jpg',
  '/example/5465161991300255326.jpg',
  '/example/5465161991300255327.jpg',
  '/example/5465161991300255328.jpg',
  '/example/5465161991300255329.jpg',
  '/example/5465161991300255330.jpg',
  '/example/5465161991300255331.jpg',
  '/example/5465161991300255333.jpg',
  '/example/5465161991300255334.jpg',
  '/example/5465161991300255335.jpg',
  '/example/5465161991300255336.jpg',
  '/example/5465161991300255337.jpg',
  '/example/5465161991300255338.jpg',
  '/example/5465161991300255339.jpg',
  '/example/5465161991300255340.jpg',
  '/example/5465161991300255341.jpg',
  '/example/5465161991300255342.jpg',
  '/example/5465161991300255343.jpg',
  '/example/5465161991300255344.jpg',
  '/example/5465161991300255345.jpg',
  '/example/5465161991300255346.jpg',
  '/example/5465161991300255347.jpg',
  '/example/5465161991300255348.jpg',
  '/example/5465161991300255349.jpg',
  '/example/5465161991300255350.jpg',
  '/example/5465161991300255351.jpg',
  '/example/5465161991300255352.jpg',
  '/example/5465161991300255353.jpg',
  '/example/5465161991300255354.jpg',
  '/example/5465161991300255355.jpg',
  '/example/5465161991300255356.jpg',
  '/example/5465161991300255357.jpg',
  '/example/5465161991300255358.jpg',
  '/example/5465161991300255359.jpg',
  '/example/5465161991300255360.jpg',
  '/example/5465161991300255361.jpg',
  '/example/5465161991300255362.jpg',
  '/example/5465161991300255363.jpg',
  '/example/5465161991300255364.jpg',
  '/example/5465161991300255365.jpg',
  '/example/5465161991300255366.jpg',
  '/example/5465161991300255367.jpg',
  '/example/5465161991300255368.jpg',
  '/example/5465161991300255369.jpg',
  '/example/5465161991300255370.jpg',
  '/example/5465161991300255371.jpg',
  '/example/5465161991300255372.jpg',
  '/example/5465161991300255374.jpg',
  '/example/5465161991300255375.jpg',
  '/example/5465161991300255376.jpg',
  '/example/5465161991300255377.jpg',
  '/example/5465161991300255378.jpg',
  '/example/5465161991300255379.jpg',
  '/example/5465161991300255380.jpg',
  '/example/5465161991300255381.jpg',
];

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const displayedImages = showAll ? portfolioImages : portfolioImages.slice(0, 12);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? portfolioImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === portfolioImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-[var(--light-gray)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-gradient-to-r from-[var(--dark-gray)] to-gray-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            Портфолио
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--dark-gray)] mb-6">
            Наши работы
          </h2>
          <p className="text-lg text-[var(--text-gray)] max-w-2xl mx-auto">
            Примеры реализованных проектов по навигации и городской инфраструктуре
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => openLightbox(showAll ? index : portfolioImages.indexOf(image))}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={image}
                alt={`Пример работы ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 ring-2 ring-[var(--primary-red)] ring-opacity-0 group-hover:ring-opacity-100 rounded-xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {!showAll && portfolioImages.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[var(--primary-red)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--primary-red-dark)] transition-colors shadow-lg shadow-red-500/25"
            >
              Показать все работы ({portfolioImages.length})
            </motion.button>
          </motion.div>
        )}

        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10"
          >
            <motion.button
              onClick={() => setShowAll(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[var(--dark-gray)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--medium-gray)] transition-colors"
            >
              Свернуть
            </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={portfolioImages[selectedImage]}
                alt={`Пример работы ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {selectedImage + 1} / {portfolioImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
