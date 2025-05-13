import { motion } from 'framer-motion';
import useParallax from './useParallax';
import Particles from './Particles';

const stats = [
  { label: 'Height', value: "5'5\" (165 cm)" },
  { label: 'Bust', value: '36 ' },
  { label: 'Waist', value: '29 in (74 cm)' },
  { label: 'Hips', value: '34 in (86 cm)' },
  { label: 'Shoes', value: 'US 7' },
  { label: 'Dress', value: 'US 4' },
  { label: 'Hair', value: 'Black' },
  { label: 'Eyes', value: 'Black' },
];

export default function About() {
  const parallaxAbout = useParallax(0.15);
  const parallaxBody = useParallax(0.12);
  return (
    <>
      {/* About Me Section */}
      <section id="about" className="py-20 flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-black via-gray-900/60 to-black relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900/60 to-black"
          style={{ transform: `translateY(${parallaxAbout}px)` }}
          aria-hidden="true"
        />
        {/* Bright, Playable Particles Overlay */}
        <Particles color="#fff" count={24} size={8} repulseStrength={3.5} />
        <div className="relative z-10 flex flex-col md:flex-row items-center max-w-5xl w-full gap-12 px-4">
          <motion.img
            src="/gallery8.png"
            alt="About Gargi"
            className="w-full md:w-1/2 max-w-md rounded-2xl shadow-2xl object-cover mb-8 md:mb-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="glass p-10 rounded-2xl shadow-xl w-full md:w-1/2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">✨ About Me</h2>
            <p className="text-lg text-gray-200 mb-2">
              Hi, I'm Gargi, a dreamer, a doer, and a storyteller—using fashion as my language and the lens as my stage. Modeling is not just a passion for me; it's a canvas where confidence, creativity, and self-expression come to life.
            </p>
            <p className="text-lg text-gray-200 mb-2">
              From elegant editorials to bold runway walks, I bring energy, grace, and authenticity to every frame I step into. With a deep love for the art of transformation, I thrive in front of the camera, embodying characters, moods, and styles that go beyond the surface.
            </p>
            <p className="text-lg text-gray-200 mb-2">
              I believe beauty is not just seen—it's felt. It's in the attitude, the emotion, the pose, and the presence. Whether it's high fashion, commercial shoots, or creative collaborations, I aim to leave a lasting impression that speaks louder than words.
            </p>
            <p className="text-lg text-gray-200">
              When I'm not modeling, you'll find me exploring new creative avenues, soaking up inspiration from the world around me, and constantly evolving—not just in style, but in spirit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body Measurements Section */}
      <section id="body-measurements" className="py-20 flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-black via-gray-900/60 to-black relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900/60 to-black"
          style={{ transform: `translateY(${parallaxBody}px)` }}
          aria-hidden="true"
        />
        {/* Bright, Playable Particles Overlay */}
        <Particles color="#fff" count={24} size={8} repulseStrength={3.5} />
        <div className="relative z-10 flex flex-col md:flex-row items-center max-w-5xl w-full gap-12 px-4">
          <motion.div
            className="glass p-10 rounded-2xl shadow-xl w-full md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Body Measurements</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <motion.div className="glass rounded-xl p-4 shadow w-full" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}> <span className="text-gray-400 text-sm uppercase">Height</span> <span className="text-lg font-semibold text-white">5'5" (165 cm)</span> </motion.div>
                <motion.div className="glass rounded-xl p-4 shadow w-full" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}> <span className="text-gray-400 text-sm uppercase">Bust</span> <span className="text-lg font-semibold text-white">36 </span> </motion.div>
                <motion.div className="glass rounded-xl p-4 shadow w-full" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}> <span className="text-gray-400 text-sm uppercase">Waist</span> <span className="text-lg font-semibold text-white">29 in (74 cm)</span> </motion.div>
                <motion.div className="glass rounded-xl p-4 shadow w-full" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}> <span className="text-gray-400 text-sm uppercase">Hips</span> <span className="text-lg font-semibold text-white">34 in (86 cm)</span> </motion.div>
              </div>
              <div className="flex flex-col gap-4">
                <motion.div className="glass rounded-xl p-4 shadow w-full" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}> <span className="text-gray-400 text-sm uppercase">Shoes</span> <span className="text-lg font-semibold text-white">US 7</span> </motion.div>
                <motion.div className="glass rounded-xl p-4 shadow w-full" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}> <span className="text-gray-400 text-sm uppercase">Dress</span> <span className="text-lg font-semibold text-white">US 4</span> </motion.div>
                <motion.div className="glass rounded-xl p-4 shadow w-full" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}> <span className="text-gray-400 text-sm uppercase">Hair</span> <span className="text-lg font-semibold text-white">Black</span> </motion.div>
                <motion.div className="glass rounded-xl p-4 shadow w-full" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}> <span className="text-gray-400 text-sm uppercase">Eyes</span> <span className="text-lg font-semibold text-white">Black</span> </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.img
            src="/gallery4.png"
            alt="Body Measurements"
            className="w-full md:w-1/2 max-w-md rounded-2xl shadow-2xl object-cover"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
      </section>
    </>
  );
} 