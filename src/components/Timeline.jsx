import { motion } from 'framer-motion';
import useParallax from './useParallax';
import Particles from './Particles';

const projects = [
  {
    year: 2025,
    title: 'Pretrators',
    desc: 'Street Modelling',
    img: '/timeline1.png',
  },
  {
    year: 2025,
    title: 'Upgradables',
    desc: 'Fashion Shoot',
    img: '/timeline2.png',
  },
  {
    year: 2024,
    title: 'Recnstrct',
    desc: 'Fashion Work',
    img: '/timeline3.png',
  },
];

export default function Timeline() {
  const parallax = useParallax(0.1);
  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-black via-gray-900/60 to-black relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900/60 to-black"
        style={{ transform: `translateY(${parallax}px)` }}
        aria-hidden="true"
      />
      {/* Bright, Playable Particles Overlay */}
      <Particles color="#fff" count={20} size={8} repulseStrength={3.5} />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>Past Work Timeline</motion.h2>
        <div className="relative border-l-2 border-gray-700 ml-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              className={`mb-16 ml-8 flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} group`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(255,255,255,0.18)' }}
            >
              <img src={proj.img} alt={proj.title} className="w-32 h-32 object-cover rounded-xl shadow-lg border-4 border-gray-800 group-hover:shadow-2xl transition-shadow duration-300" />
              <div className="glass p-6 rounded-2xl shadow-xl min-w-[220px] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl cursor-pointer">
                <div className="text-gray-400 text-sm mb-1">{proj.year}</div>
                <div className="text-xl font-bold text-white mb-1">{proj.title}</div>
                <div className="text-gray-200 text-base">{proj.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 