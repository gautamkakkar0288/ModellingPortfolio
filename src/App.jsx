import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function App() {
  // Only show the overlay on initial mount
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans relative">
      {show && (
        <motion.div
          key="page-overlay"
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -40, scale: 1.04 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: 'radial-gradient(ellipse at center, #18181b 60%, #000 100%)' }}
        />
      )}
      <Hero />
      <About />
      <Gallery />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
} 