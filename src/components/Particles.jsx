import { useRef, useEffect } from 'react';

export default function Particles({ className = '', style = {}, count = 40 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let mouse = { x: -1000, y: -1000 };
    let animationId;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    }
    window.addEventListener('resize', resize);

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

    let particles = [];
    function createParticles() {
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          ox: x, // original x
          oy: y, // original y
          r: 3 + Math.random() * 2,
          dx: 0,
          dy: 0,
        });
      }
    }
    createParticles();

    function animate() {
      ctx.clearRect(0, 0, width, height);
      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 90) {
            ctx.save();
            ctx.globalAlpha = 0.08 * (1 - dist / 90);
            ctx.strokeStyle = '#fff';
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      // Animate dots
      for (let p of particles) {
        // Repel from mouse
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < 80) {
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
          const force = (80 - dist) / 80 * 6;
          p.dx += Math.cos(angle) * force * 0.18;
          p.dy += Math.sin(angle) * force * 0.18;
        }
        // Return to original position
        const ox = p.ox - p.x;
        const oy = p.oy - p.y;
        p.dx += ox * 0.01;
        p.dy += oy * 0.01;
        // Move
        p.x += p.dx;
        p.y += p.dy;
        p.dx *= 0.92;
        p.dy *= 0.92;
        // Draw dot with glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.restore();
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });
      cancelAnimationFrame(animationId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-0 ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
} 