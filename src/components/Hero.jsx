import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useParallax from './useParallax';
// import Particles from './Particles';

const words = ['Gargi'];

const navLinks = [
  { label: 'ABOUT', href: '#about', section: 'about' },
  { label: 'GALLERY', href: '#gallery', section: 'gallery' },
  { label: 'CONTACT', href: '#contact', section: 'contact' },
  { label: 'HOME', href: '#', section: 'home', onClick: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => window.location.reload(), 400); } },
];

const sectionMap = {
  about: 'About Me',
  'body-measurements': 'Body Measurements',
  gallery: 'Photo Gallery',
  timeline: 'Past Work Timeline',
  contact: 'Contact',
};

export default function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [navSticky, setNavSticky] = useState(false);
  const parallax = useParallax(0.3);
  const [gargiLanded, setGargiLanded] = useState(false);
  const [showStickyBrand, setShowStickyBrand] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let i = 0;
    let j = 0;
    const interval = setInterval(() => {
      if (j < words[i].length) {
        setDisplayed(words[i].slice(0, j + 1));
        j++;
      } else {
        setGargiLanded(true);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setNavSticky(window.scrollY > 40);
      setShowStickyBrand(window.scrollY > window.innerHeight * 0.7);
      // Section highlight logic
      const sections = [
        { id: 'about', section: 'about' },
        { id: 'body-measurements', section: 'body-measurements' },
        { id: 'gallery', section: 'gallery' },
        { id: 'timeline', section: 'timeline' },
        { id: 'contact', section: 'contact' },
      ];
      let found = 'home';
      for (let s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            found = s.section;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ objectPosition: `center ${parallax}px` }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      {/* Sticky Nav with Animated Gargi Brand */}
      <nav className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${navSticky ? 'backdrop-blur bg-black/60 shadow-lg' : 'bg-transparent'} flex items-center justify-center md:justify-between py-4 px-6`}
        style={{ transition: 'all 0.3s' }}>
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={showStickyBrand ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex items-center gap-2 mr-8"
        >
          <motion.span
            className="text-2xl md:text-3xl font-extrabold tracking-widest select-none cursor-pointer relative group"
            whileHover={{ scale: 1.15, color: '#ec4899', textShadow: '0 0 16px #ec4899' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Gargi
          </motion.span>
        </motion.div>
        <ul className={`flex flex-wrap justify-center md:justify-end gap-8 md:gap-12 font-light tracking-widest uppercase text-white/90 flex-1 transition-all duration-300 ${navSticky ? 'text-base md:text-lg' : 'text-lg md:text-2xl'}`}>
          {navLinks.map(link => {
            // Only highlight About, Body Measurements, Gallery, Timeline, Contact
            let highlight = false;
            if (
              (link.section === 'about' && activeSection === 'about') ||
              (link.section === 'gallery' && activeSection === 'gallery') ||
              (link.section === 'contact' && activeSection === 'contact') ||
              (link.section === 'home' && activeSection === 'home')
            ) highlight = true;
            // Custom highlight for body measurements and timeline
            if (link.label === 'ABOUT' && activeSection === 'body-measurements') highlight = true;
            if (link.label === 'GALLERY' && activeSection === 'timeline') highlight = true;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`relative px-2 transition-all duration-200 hover:text-pink-400 hover:scale-110 focus:scale-110 focus:text-pink-400 outline-none group ${highlight ? 'text-pink-400 font-bold' : ''}`}
                  style={{ letterSpacing: '0.15em' }}
                  onClick={link.onClick}
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-pink-400 scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className={`text-6xl md:text-8xl font-extrabold tracking-tight mb-4 mt-24 transition-all duration-300 ${gargiLanded ? 'hover:scale-110 hover:text-pink-400 hover:drop-shadow-[0_0_16px_rgba(236,72,153,0.7)] cursor-pointer' : ''}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
            {displayed}
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-light mb-8 max-w-2xl text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Fashion Model | Modern. Bold. Timeless.
        </motion.p>
        <motion.a
          href="#gallery"
          className="inline-block px-8 py-3 rounded-full glass text-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-white/20 border border-white/30"
          whileHover={{ scale: 1.08 }}
        >
          View Portfolio
        </motion.a>
      </motion.div>
    </section>
  );
} 