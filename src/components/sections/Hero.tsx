import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useTypewriter } from "../../hooks";
import { SOCIAL_LINKS } from "../../constants/data";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 170, 0.5)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const SOCIALS = [
  { href: SOCIAL_LINKS.github, Icon: Github, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${SOCIAL_LINKS.email}`, Icon: Mail, label: "Email" },
];

function ProfilePhoto() {
  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mb-8 group"
    >
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-[3px] border-teal-400/70 shadow-[0_0_32px_rgba(16,185,129,0.12)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 mx-auto transition-transform duration-500 group-hover:scale-105">
        <div className="profile-ring opacity-80 animate-spin-slow" />
        <img
          src={`${import.meta.env.BASE_URL}images/image.png`}
          alt="Oussama NABBAR"
          className="w-full h-full object-cover relative z-10"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${import.meta.env.BASE_URL}images/profile-placeholder.svg`;
          }}
        />
      </div>
    </motion.div>
  );
}

function AnimatedName() {
  const name = "NABBAR Oussama";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex justify-center flex-wrap">
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 + i * 0.04, duration: 0.3, ease: "easeOut" }}
          className="font-mono text-5xl md:text-7xl font-bold text-white tracking-tight"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  const typed = useTypewriter();
  const [glowPulse, setGlowPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowPulse(true);
      setTimeout(() => setGlowPulse(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-4rem)] pt-20 md:pt-24 flex flex-col items-center justify-center overflow-hidden"
    >
      <ParticleCanvas />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl animate-blob-reverse pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <ProfilePhoto />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="font-mono text-teal-400 text-sm tracking-widest uppercase mb-4"
        >
          Data and AI Engineer
        </motion.p>

        <AnimatedName />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
          className="h-10 mb-6 flex items-center justify-center mt-4"
        >
          <span className="font-mono text-xl md:text-2xl text-zinc-300">
            {typed}
            <span className="inline-block w-0.5 h-6 bg-teal-400 ml-0.5 animate-pulse align-middle" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Building intelligent data systems that monitor themselves.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={
              glowPulse
                ? { boxShadow: "0 0 30px rgba(0,212,170,0.5)" }
                : { boxShadow: "0 0 0px rgba(0,212,170,0)" }
            }
            className="px-7 py-3 bg-teal-400 text-[#0a0a0a] font-mono font-semibold text-sm rounded-lg hover:bg-teal-300 transition-all duration-200 relative overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
          </motion.button>
          <motion.a
            href={`${import.meta.env.BASE_URL}cv.pdf`}
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 border border-teal-400/50 text-teal-400 font-mono text-sm rounded-lg hover:bg-teal-400/10 transition-all duration-200 flex items-center gap-2 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-teal-400/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            <Download size={15} className="relative z-10" />
            <span className="relative z-10">Download CV</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          {SOCIALS.map(({ href, Icon, label }, index) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 + index * 0.1 }}
              whileHover={{ scale: 1.2, color: "#00d4aa" }}
              className="text-zinc-500 transition-colors duration-200"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={scrollDown}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-teal-400 transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}