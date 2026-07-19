import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TOTAL_FRAMES = 107;
const FRAME_PATH   = (i) => `/frames/frame_${String(i).padStart(4, '0')}.webp`;
const TOTAL_ASSETS = TOTAL_FRAMES + 1; // frames + hero video

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const titleRef     = useRef(null);
  const barFillRef   = useRef(null);
  const counterRef   = useRef(null);

  const [progress, setProgress]   = useState(0);
  const loadedCount                = useRef(0);

  // ── Tick progress ──────────────────────────────────────────────────────────
  function tick() {
    loadedCount.current += 1;
    const pct = Math.round((loadedCount.current / TOTAL_ASSETS) * 100);
    setProgress(pct);
  }

  // ── Reveal animation ───────────────────────────────────────────────────────
  function runReveal() {
    const tl = gsap.timeline();

    // 1. Fade out bar + counter
    tl.to([barFillRef.current, counterRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    });

    // 2. GARGI glows and scales up
    tl.to(titleRef.current, {
      scale: 1.05,
      duration: 0.8,
      ease: 'power2.inOut',
      textShadow: '0 0 60px rgba(255,255,255,0.7), 0 0 120px rgba(255,200,220,0.4)',
    }, '-=0.1');

    // 3. Entire screen slides up and off
    tl.to(preloaderRef.current, {
      y: '-100vh',
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      },
    }, '+=0.1');
  }

  // ── Kick off when progress hits 100 ───────────────────────────────────────
  useEffect(() => {
    if (progress >= 100) runReveal();
  }, [progress]);

  // ── Preload assets ─────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Hero video — count as one asset on canplaythrough
    const video = document.createElement('video');
    video.src    = '/hero.mp4';
    video.preload = 'auto';
    video.muted  = true;
    const onVideoReady = () => { tick(); video.removeEventListener('canplaythrough', onVideoReady); };
    video.addEventListener('canplaythrough', onVideoReady);
    // Fallback: if video never fires, count it after 4 s so we don't stall
    const videoTimeout = setTimeout(() => { if (loadedCount.current < 1) tick(); }, 4000);
    video.load();

    // Frames — 4 parallel lanes to balance speed vs connection count
    let nextFrame = 1;
    function loadNext() {
      if (nextFrame > TOTAL_FRAMES) return;
      const frameIdx = nextFrame++;
      const img   = new Image();
      img.onload  = () => { tick(); loadNext(); };
      img.onerror = () => { tick(); loadNext(); }; // count failures too so we always reach 100
      img.src = FRAME_PATH(frameIdx);
    }
    for (let lane = 0; lane < 4; lane++) loadNext();

    // Failsafe: if assets take too long, force completion after 8s
    const failsafeTimeout = setTimeout(() => {
      const remaining = TOTAL_ASSETS - loadedCount.current;
      if (remaining > 0) {
        for (let i = 0; i < remaining; i++) tick();
      }
    }, 8000);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(videoTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []);

  // ── Sync bar width + counter DOM directly (avoid re-render lag) ───────────
  useEffect(() => {
    if (barFillRef.current) barFillRef.current.style.width = `${progress}%`;
    if (counterRef.current) counterRef.current.textContent  = `${progress}%`;
  }, [progress]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white w-full h-screen"
    >
      {/* Name */}
      <h1
        ref={titleRef}
        className="text-7xl md:text-8xl font-black tracking-widest uppercase select-none"
        style={{ fontFamily: "'Playfair Display', serif", willChange: 'transform, text-shadow' }}
      >
        GARGI
      </h1>

      {/* Progress bar */}
      <div className="h-[2px] bg-white/20 w-48 relative overflow-hidden mt-8">
        <div
          ref={barFillRef}
          className="absolute left-0 top-0 h-full bg-white transition-none"
          style={{
            width: '0%',
            boxShadow: '0 0 10px 2px rgba(255,255,255,0.5)',
          }}
        />
      </div>

      {/* Counter */}
      <p
        ref={counterRef}
        className="mt-4 text-xs tracking-[0.3em] text-white/50 font-light"
      >
        0%
      </p>
    </div>
  );
}
