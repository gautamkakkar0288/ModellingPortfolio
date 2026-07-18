import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 90;
const FRAME_PATH   = (i) => `/frames/frame_${String(i).padStart(4, '0')}.webp`;

// ── Data ──────────────────────────────────────────────────────────────────────
const leftStats = [
  { label: 'Hair',   value: 'Black' },
  { label: 'Height', value: "5′5″"  },
  { label: 'Bust',   value: '36'    },
  { label: 'Waist',  value: '29″'   },
];
const rightStats = [
  { label: 'Eyes',  value: 'Black' },
  { label: 'Shoes', value: 'US 7'  },
  { label: 'Dress', value: 'US 4'  },
  { label: 'Hips',  value: '34″'   },
];

export default function SequenceScrubber() {
  const sectionRef    = useRef(null);
  const canvasRef     = useRef(null);
  const framesRef     = useRef([]);
  const frameIndexRef = useRef(0);

  // 4 refs per column
  const lRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const rRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // ── Preload ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const images = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => { if (i === 1) drawFrame(0); };
      images.push(img);
    }
    framesRef.current = images;
  }, []);

  // ── Draw ───────────────────────────────────────────────────────────────────
  function drawFrame(index) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = framesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // object-fit: contain at 100% screen height, centred
    const maxH   = canvas.height * 1.0;
    const maxW   = canvas.width;
    const aspect = img.naturalWidth / img.naturalHeight;
    let drawW    = maxH * aspect;
    let drawH    = maxH;
    if (drawW > maxW) { drawW = maxW; drawH = maxW / aspect; }
    const offsetX = (canvas.width  - drawW) / 2;
    const offsetY = (canvas.height - drawH) / 2;
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }

  // ── GSAP ──────────────────────────────────────────────────────────────────
  useGSAP(() => {
    // Frame scrubbing
    gsap.to({}, {
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (TOTAL_FRAMES - 1));
          if (index !== frameIndexRef.current) {
            frameIndexRef.current = index;
            drawFrame(index);
          }
        },
      },
    });

    // ── Stat items: interleaved order L0 R0 L1 R1 L2 R2 L3 R3 ─────────────
    // Ordered array so sequential position() calls interleave the columns
    const orderedRefs = [
      lRefs[0], rRefs[0],
      lRefs[1], rRefs[1],
      lRefs[2], rRefs[2],
      lRefs[3], rRefs[3],
    ];

    // Set initial hidden state
    gsap.set(orderedRefs.map((r) => r.current), { opacity: 0, y: 40 });

    // Build one scrubbed timeline — each item staggers 0.12 timeline units apart
    const STEP = 0.12;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    orderedRefs.forEach((ref, i) => {
      tl.to(
        ref.current,
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        i * STEP        // stagger position within the timeline
      );
    });
  }, { scope: sectionRef });

  // Redraw on resize
  useEffect(() => {
    const onResize = () => drawFrame(frameIndexRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section ref={sectionRef} className="h-[300vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Spotlight — deepest layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

        {/* Watermark — behind model, in front of spotlight */}
        <div className="absolute inset-0 flex items-center justify-center text-[15vw] font-black text-white opacity-[0.03] tracking-widest pointer-events-none z-0 select-none">
          GARGI
        </div>

        {/* Canvas — above background layers */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)' }}
        />

        {/* ── Text overlay ─────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-20 w-full h-full max-w-7xl mx-auto px-4 md:px-12 py-32 flex justify-between pointer-events-none">

          {/* LEFT column */}
          <div className="flex flex-col justify-around h-full">
            {leftStats.map((stat, i) => (
              <div key={stat.label} ref={lRefs[i]} className="stat-item">
                <p className="text-sm tracking-[0.2em] text-gray-400 mb-1 uppercase font-light">
                  {stat.label}
                </p>
                <p className="text-3xl md:text-4xl font-light text-white drop-shadow-lg">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col justify-around h-full items-end text-right">
            {rightStats.map((stat, i) => (
              <div key={stat.label} ref={rRefs[i]} className="stat-item">
                <p className="text-sm tracking-[0.2em] text-gray-400 mb-1 uppercase font-light">
                  {stat.label}
                </p>
                <p className="text-3xl md:text-4xl font-light text-white drop-shadow-lg">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

        </div>
        {/* ── /Text overlay ────────────────────────────────────────────────── */}

      </div>
    </section>
  );
}
