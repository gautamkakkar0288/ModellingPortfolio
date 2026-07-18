import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';

const socials = [
  { icon: FaInstagram, href: 'https://www.instagram.com/gxrgii/', label: 'Instagram', hoverColor: '#ec4899' },
  { icon: FaLinkedin,  href: 'https://linkedin.com',              label: 'LinkedIn',  hoverColor: '#60a5fa' },
  { icon: FaTwitter,   href: 'https://twitter.com',               label: 'Twitter',   hoverColor: '#38bdf8' },
];

export default function CinematicContact() {
  return (
    <section
      id="contact"
      className="relative bg-black/95 py-20 flex justify-center items-center overflow-hidden"
    >
      {/* Faint radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(236,72,153,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="glass relative z-10 flex flex-col items-center text-center py-20 px-16 rounded-2xl shadow-2xl mx-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-white tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Contact
        </motion.h2>

        {/* Contact details */}
        <div className="flex flex-col gap-6 text-lg text-gray-200 mb-10">
          <div className="flex items-center gap-3 justify-center">
            <FiPhone className="text-2xl text-white/60 shrink-0" />
            <span className="font-light tracking-wide">+91 70567-09119</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <FiMail className="text-2xl text-white/60 shrink-0" />
            <a
              href="mailto:gaarrgiii@gmail.com"
              className="font-light tracking-wide hover:text-pink-400 transition-colors duration-300"
            >
              gaarrgiii@gmail.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <span className="w-16 h-px bg-white/15 mb-10 block" />

        {/* Social icons */}
        <div className="flex items-center gap-10 mb-12">
          {socials.map(({ icon: Icon, href, label, hoverColor }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/40 text-2xl transition-colors duration-300"
              whileHover={{ scale: 1.25, color: hoverColor }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-white/20 font-extralight text-xs tracking-[0.4em] uppercase">
          &copy; {new Date().getFullYear()} Gargi. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}
