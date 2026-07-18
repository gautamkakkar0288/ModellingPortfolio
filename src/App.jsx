import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenisRef } from './lenisInstance';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import SequenceScrubber from './components/SequenceScrubber';
import PremiumGallery from './components/PremiumGallery';
import CinematicTimeline from './components/CinematicTimeline';
import CinematicContact from './components/CinematicContact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove();
    };
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Preloader — fixed overlay, slides up once all assets are ready */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 1. Hero — video background, navbar, animated name */}
      <Hero />

      {/* 2. Cinematic scroll scrubber — 3D spin + measurements overlays */}
      <SequenceScrubber />

      {/* 3. Premium photo gallery with lightbox */}
      <PremiumGallery />

      {/* 4. Past work timeline */}
      <CinematicTimeline />

      {/* 5. Full-screen contact */}
      <CinematicContact />
    </div>
  );
}
