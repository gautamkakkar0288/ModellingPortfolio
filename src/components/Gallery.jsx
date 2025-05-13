import { useState } from 'react';
import { motion } from 'framer-motion';
import FsLightbox from 'fslightbox-react';
import useParallax from './useParallax';
import Particles from './Particles';

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

export default function Gallery() {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });
  const parallax = useParallax(0.12);

  const openLightboxOnSlide = (slide) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide,
    });
  };

  return (
    <section id="gallery" className="py-20 bg-black/90 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900/60 to-black"
        style={{ transform: `translateY(${parallax}px)` }}
        aria-hidden="true"
      />
      {/* Bright, Playable Particles Overlay */}
      <Particles color="#fff" count={32} size={10} repulseStrength={3.5} />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>Photo Gallery</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((src, i) => (
            <motion.div
              key={src}
              className="relative overflow-hidden rounded-2xl shadow-lg glass cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(255,255,255,0.18)' }}
              onClick={() => openLightboxOnSlide(i + 1)}
            >
              <img src={src} alt="Gargi Portfolio" className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xl font-semibold tracking-widest opacity-90">View</span>
              </div>
            </motion.div>
          ))}
        </div>
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={images}
          slide={lightboxController.slide}
        />
      </div>
    </section>
  );
} 