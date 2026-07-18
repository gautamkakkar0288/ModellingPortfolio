import { useState } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen font-sans relative">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Hero />
      <About />
      <Gallery />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
}
