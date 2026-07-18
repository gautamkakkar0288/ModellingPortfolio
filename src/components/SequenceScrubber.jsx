import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 107;

function getFramePath(index) {
  return `/frames/frame_${String(index + 1).padStart(4, '0')}.webp`;
}

// Stat data — left and right columns, top to bottom
const LEFT_STATS = [
  { label: 'Hair',   value: 'Black' },
  { label: 'Height', value: "5'5\u2033" },
  { label: 'Bust',   value: '36'    },
  { label: 'Waist',  value: '29\u2033' },
];

const RIGHT_STATS = [
  { label: 'Eyes',  value: 'Black' },
  { label: 'Shoes', value: 'US 7'  },
  { label: 'Dress', value: 'US 4'  },
  { label: 'Hips',  value: '34\u2033' },
];

export default function SequenceScrubber() {
  const sectionRef   = useRef(null);
  const canvasRef    = useRef(null);
  const images       = useRef([]);
  const currentFrame = useRef(0);

  // One ref array per column — indexed 0–3 top to bottom
  const leftRefs  = useRef([]);
  const rightRefs = useRef([]);

  function drawFrame(index) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = images.current[index];
    if (!img || !img.complete) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scale image so it fills 98% of the canvas height, centred horizontally
    const scale = (canvas.height * 0.98) / img.naturalHeight;
    const dw = img.naturalWidth  * scale;
    const dh = img.naturalHeight * scale;
    const dx = (canvas.width  - dw) / 2;
    const dy = (canvas.height - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  useGSAP(() => {
    // ── Canvas sizing ────────────────────────────────────────────
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame.current);
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Preload all frames ───────────────────────────────────────
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      if (i === 0) img.onload = () => drawFrame(0);
      images.current[i] = img;
    }

    // ── Sequence scrub ───────────────────────────────────────────
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        const index = Math.min(FRAME_COUNT - 1, Math.floor(self.progress * FRAME_COUNT));
        if (index !== currentFrame.current) {
          currentFrame.current = index;
          drawFrame(index);
        }
      },
    });

    // ── Stat overlay animation ───────────────────────────────────
    // Interleaved order: L[0], R[0], L[1], R[1], L[2], R[2], L[3], R[3]
    const ordered = [
      leftRefs.current[0],  rightRefs.current[0],
      leftRefs.current[1],  rightRefs.current[1],
      leftRefs.current[2],  rightRefs.current[2],
      leftRefs.current[3],  rightRefs.current[3],
    ];

    // All start hidden, 40px below final position
    gsap.set(ordered, { opacity: 0, y: 40 });

    // One timeline scrubbed to the 300vh section.
    // 8 items animate in sequentially — each staggered 0.9 units apart.
    // Total animate-in window: 0 → ~7.2 units (0–72% scroll).
    // A hold tween pushes the timeline to 10 units so items stay
    // fully visible from ~72% all the way to 100% scroll progress.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,          // slight lag = smoother feel on fast scroll
      },
    });

    ordered.forEach((el, i) => {
      tl.to(
        el,
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        i * 0.9,             // stagger start position
      );
    });

    // Extend timeline so all items hold until the section ends
    tl.to({}, { duration: 2.8 });

    return () => window.removeEventListener('resize', resize);
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="h-[300vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Radial spotlight (behind everything) ── */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

        {/* ── GARGI watermark ── */}
        <div className="absolute inset-0 flex items-center justify-center text-[15vw] font-black text-white opacity-[0.03] tracking-widest pointer-events-none z-0 select-none">
          GARGI
        </div>

        {/* ── Canvas (above background layers, below stats) ── */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10" />

        {/* ── Stats overlay ── */}
        <div className="absolute inset-0 z-20 w-full h-full max-w-7xl mx-auto px-4 md:px-12 py-32 flex justify-between pointer-events-none">

          {/* Left column */}
          <div className="flex flex-col justify-around h-full">
            {LEFT_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item"
                ref={(el) => { leftRefs.current[i] = el; }}
              >
                <p className="text-sm tracking-[0.2em] text-gray-400 mb-1 uppercase">
                  {stat.label}
                </p>
                <p className="text-3xl md:text-4xl font-light text-white drop-shadow-lg">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-around h-full items-end">
            {RIGHT_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item text-right"
                ref={(el) => { rightRefs.current[i] = el; }}
              >
                <p className="text-sm tracking-[0.2em] text-gray-400 mb-1 uppercase">
                  {stat.label}
                </p>
                <p className="text-3xl md:text-4xl font-light text-white drop-shadow-lg">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
