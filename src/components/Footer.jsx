import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    controls.start({ opacity: showTop ? 1 : 0, y: showTop ? 0 : 40 });
  }, [showTop, controls]);

  return (
    <footer className="relative bg-black/80 py-8 mt-12 flex flex-col items-center glass">
      <div className="flex gap-6 mb-4">
        <a href="https://www.instagram.com/gxrgii/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors text-2xl transform hover:scale-125 duration-200"><FaInstagram /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-2xl transform hover:scale-125 duration-200"><FaLinkedin /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors text-2xl transform hover:scale-125 duration-200"><FaTwitter /></a>
      </div>
      <div className="text-gray-400 text-sm mb-2">&copy; {new Date().getFullYear()} Gargi. All rights reserved.</div>
      <motion.button
        className="fixed bottom-8 right-8 bg-white/20 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-lg border border-white/30 transition-transform hover:scale-110 hover:shadow-pink-400/50 hover:shadow-lg z-50"
        style={{ display: showTop ? 'block' : 'none' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        animate={controls}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5 }}
        aria-label="Back to Top"
        whileHover={{ scale: 1.15, boxShadow: '0 0 16px 2px #f472b6' }}
      >
        ↑ Back to Top
      </motion.button>
    </footer>
  );
} 