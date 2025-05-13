import { motion } from 'framer-motion';
import { FiPhone, FiMail } from 'react-icons/fi';
import useParallax from './useParallax';
import Particles from './Particles';

export default function Contact() {
  const parallax = useParallax(0.08);
  return (
    <section id="contact" className="py-20 flex justify-center items-center bg-black/95 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900/60 to-black"
        style={{ transform: `translateY(${parallax}px)` }}
        aria-hidden="true"
      />
      {/* Bright, Playable Particles Overlay */}
      <Particles color="#fff" count={16} size={8} repulseStrength={3.5} />
      <motion.div
        className="glass p-10 rounded-2xl shadow-xl flex flex-col items-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>Contact</motion.h2>
        <div className="flex flex-col gap-6 text-lg text-gray-200">
          <div className="flex items-center gap-3">
            <FiPhone className="text-2xl text-white" />
            <span>+91 70567-09119</span>
          </div>
          <div className="flex items-center gap-3">
            <FiMail className="text-2xl text-white" />
            <span>gaarrgiii@gmail.com</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 