import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../lib/cn';
import { useResolvedTheme } from '../../features/preferences/usePreferences';

export type Scene = 'network' | 'flow' | 'mesh' | 'orbit';

interface NetworkCanvasProps {
  scene?: Scene;
  className?: string;
  density?: number;
  /** Pause rendering (e.g. inactive slides). */
  active?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
  phase: number;
  lane: number;
  speed: number;
}

const rand = (min = 0, max = 1) => min + Math.random() * (max - min);

/** Animated node-network backgrounds (canvas). Reacts subtly to the pointer, honors reduced motion. */
export function NetworkCanvas({ scene = 'network', className, density = 1, active = true }: NetworkCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const theme = useResolvedTheme();
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dark = theme === 'dark';
    const ink = dark ? '255,255,255' : '10,10,10';
    const accent = dark ? '215,247,30' : '107,138,0';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let t = 0;
    let visible = true;

    const seed = () => {
      const count = Math.max(28, Math.min(150, Math.round(w * h / 13000 * density)));
      particles = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.18, 0.18),
        r: rand(0.8, 2),
        accent: Math.random() < 0.12,
        phase: rand(0, Math.PI * 2),
        lane: Math.floor(rand(0, 9)),
        speed: rand(0.6, 2.2)
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const node = (x: number, y: number, r: number, isAccent: boolean, phase: number) => {
      if (isAccent) {
        const pulse = (Math.sin(t * 0.03 + phase) + 1) / 2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${accent},${0.12 * (1 - pulse)})`;
        ctx.arc(x, y, r + 4 + pulse * 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${accent},0.95)`;
        ctx.arc(x, y, r + 1, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${ink},0.35)`;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawNetwork = () => {
      const linkDist = 130;
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 140 && d > 0) {
            p.x += dx / d * 0.5;
            p.y += dy / d * 0.5;
          }
        }
      }
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(${a.accent || b.accent ? accent : ink},${(1 - d / linkDist) * (a.accent || b.accent ? 0.35 : 0.14)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < 170) {
          ctx.strokeStyle = `rgba(${accent},${(1 - pd / 170) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(a.x, a.y);
          ctx.stroke();
        }
      }
      particles.forEach((p) => node(p.x, p.y, p.r, p.accent, p.phase));
    };

    const laneY = (lane: number, x: number, lanes: number) =>
    h * (lane + 1) / (lanes + 1) + Math.sin(x * 0.004 + t * 0.008 + lane) * 18;

    const drawFlow = () => {
      const lanes = 9;
      for (let l = 0; l < lanes; l += 1) {
        const near = Math.abs(laneY(l, pointer.x, lanes) - pointer.y) < 40;
        ctx.strokeStyle = `rgba(${near ? accent : ink},${near ? 0.35 : 0.08})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 24) {
          const y = laneY(l, x, lanes);
          if (x === 0) ctx.moveTo(x, y);else
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      for (const p of particles) {
        if (!reduce) p.x += p.speed;
        if (p.x > w + 40) p.x = -40;
        const lane = p.lane % lanes;
        const y = laneY(lane, p.x, lanes);
        const tail = p.speed * 18;
        ctx.strokeStyle = `rgba(${p.accent ? accent : ink},${p.accent ? 0.85 : 0.3})`;
        ctx.lineWidth = p.accent ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(p.x - tail, laneY(lane, p.x - tail, lanes));
        ctx.lineTo(p.x, y);
        ctx.stroke();
        node(p.x, y, p.r * 0.8, p.accent, p.phase);
      }
    };

    const drawMesh = () => {
      const cols = Math.ceil(w / 56) + 2;
      const rows = Math.ceil(h / 56) + 2;
      const pts: {x: number;y: number;z: number;}[][] = [];
      for (let r = 0; r < rows; r += 1) {
        pts[r] = [];
        for (let c = 0; c < cols; c += 1) {
          const bx = c * 56 - 28;
          const by = r * 56 - 28;
          let z = Math.sin(c * 0.45 + t * 0.018) * Math.cos(r * 0.38 + t * 0.012);
          const pd = Math.hypot(bx - pointer.x, by - pointer.y);
          if (pd < 220) z += (1 - pd / 220) * 1.2;
          pts[r][c] = { x: bx, y: by - z * 16, z };
        }
      }
      ctx.lineWidth = 0.7;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const p = pts[r][c];
          const alpha = 0.05 + Math.max(0, p.z) * 0.12;
          if (c + 1 < cols) {
            ctx.strokeStyle = `rgba(${ink},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pts[r][c + 1].x, pts[r][c + 1].y);
            ctx.stroke();
          }
          if (r + 1 < rows) {
            ctx.strokeStyle = `rgba(${ink},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pts[r + 1][c].x, pts[r + 1][c].y);
            ctx.stroke();
          }
          if (p.z > 0.85) node(p.x, p.y, 1.4, true, c + r);
        }
      }
    };

    const drawOrbit = () => {
      const rtl = document.documentElement.dir === 'rtl';
      const cx = (rtl ? w * 0.28 : w * 0.72) + (pointer.x > 0 ? (pointer.x - w / 2) * 0.02 : 0);
      const cy = h * 0.5 + (pointer.y > 0 ? (pointer.y - h / 2) * 0.02 : 0);
      const rings = [90, 160, 240, 330, 430];
      rings.forEach((radius, i) => {
        ctx.strokeStyle = `rgba(${ink},${0.09 - i * 0.01})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      const positions = particles.slice(0, 40).map((p, i) => {
        const ring = rings[i % rings.length];
        const angle = p.phase + t * 0.002 * (i % 2 ? 1 : -1) * (1 + i % 3 * 0.4);
        return { x: cx + Math.cos(angle) * ring, y: cy + Math.sin(angle) * ring, p };
      });
      positions.forEach((a, i) => {
        positions.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(${a.p.accent ? accent : ink},${(1 - d / 110) * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      positions.forEach(({ x, y, p }) => node(x, y, p.r, p.accent, p.phase));
      node(cx, cy, 5, true, 0);
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      if (scene === 'network') drawNetwork();else
      if (scene === 'flow') drawFlow();else
      if (scene === 'mesh') drawMesh();else
      drawOrbit();
    };

    const loop = () => {
      if (visible && active) {
        t += 1;
        render();
      }
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (reduce) {
      render();
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [scene, theme, reduce, density, active]);

  return <canvas ref={ref} aria-hidden className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />;
}