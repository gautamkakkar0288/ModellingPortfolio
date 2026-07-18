import { useState } from 'react';
import { motion } from 'framer-motion';
import FsLightbox from 'fslightbox-react';

const images = [
  '/gallery1.png',
  '/gallery2.png',
  '/gallery3.png',
  '/gallery4.png',
  '/gallery5.png',
  '/gallery6.png',
  '/gallery7.png',
  '/gallery8.png',
  '/gallery9.png',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function PremiumGallery() {
  const [lightbox, setLightbox] = useState({ toggler: false, slide: 1 });

  const open = (i) =>
    setLightbox((prev) => ({ toggler: !prev.toggler, slide: i + 1 }));

  return (
    <section id="gallery" className="bg-black py-24 px-4">
      {/* Section label */}
      <motion.div
        className="max-w-6xl mx-auto mb-14 flex items-center gap-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="block flex-1 h-px bg-white/10" />
        <h2 className="text-white font-extralight tracking-[0.45em] uppercase text-sm md:text-base whitespace-nowrap">
          Portfolio
        </h2>
        <span className="block flex-1 h-px bg-white/10" />
      </motion.div>

      {/* Grid */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {images.map((src, i) => (
          <motion.div
            key={src}
            variants={itemVariants}
            className="glass relative overflow-hidden cursor-pointer group"
            onClick={() => open(i)}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 40px 0 rgba(255,255,255,0.12)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <img
              src={src}
              alt={`Gargi portfolio ${i + 1}`}
              className="w-full h-80 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-xl font-semibold tracking-widest opacity-90">
                View
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <FsLightbox toggler={lightbox.toggler} sources={images} slide={lightbox.slide} />
    </section>
  );
}
