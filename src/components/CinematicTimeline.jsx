import { motion } from 'framer-motion';

const entries = [
  { year: '2025', title: 'Pretrators',  desc: 'Street Modelling', img: '/timeline1.png' },
  { year: '2025', title: 'Upgradables', desc: 'Fashion Shoot',    img: '/timeline2.png' },
  { year: '2024', title: 'Recnstrct',   desc: 'Fashion Work',     img: '/timeline3.png' },
];

export default function CinematicTimeline() {
  return (
    <section
      id="timeline"
      className="py-20 bg-gradient-to-b from-black via-gray-900/60 to-black relative overflow-hidden"
    >
      {/* Section label */}
      <motion.div
        className="max-w-4xl mx-auto px-4 mb-16 flex items-center gap-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="block flex-1 h-px bg-white/10" />
        <h2 className="text-white font-extralight tracking-[0.45em] uppercase text-sm md:text-base whitespace-nowrap">
          Past Work
        </h2>
        <span className="block flex-1 h-px bg-white/10" />
      </motion.div>

      {/* Timeline entries */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Vertical line */}
        <div className="relative border-l-2 border-gray-700 ml-6">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.title}
              className={`mb-16 ml-8 flex items-center gap-8 group
                ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
              `}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(255,255,255,0.12)' }}
            >
              {/* Thumbnail */}
              <img
                src={entry.img}
                alt={entry.title}
                className="w-32 h-32 object-cover rounded-xl shadow-lg border-4 border-gray-800 group-hover:shadow-2xl transition-shadow duration-300 shrink-0"
              />

              {/* Glass card */}
              <div className="glass p-6 rounded-2xl shadow-xl min-w-[220px] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl cursor-pointer">
                <div className="text-gray-400 text-sm mb-1 tracking-widest font-light">
                  {entry.year}
                </div>
                <div className="text-xl font-bold text-white mb-1 tracking-wide">
                  {entry.title}
                </div>
                <div className="text-gray-300 text-base font-light">
                  {entry.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
