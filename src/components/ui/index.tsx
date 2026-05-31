import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState, useRef } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  label?: string;
}

export function Section({ id, children, className = '', label }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`py-24 px-6 max-w-6xl mx-auto relative ${className}`}
    >
      {label && (
        <span className="absolute top-24 left-6 font-mono text-xs text-teal-400/10 select-none pointer-events-none">
          // {label}
        </span>
      )}
      {children}
    </motion.section>
  );
}

interface SectionHeadingProps {
  children: ReactNode;
  animate?: boolean;
}

export function SectionHeading({ children, animate = true }: SectionHeadingProps) {
  const [InView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const text = typeof children === 'string' ? children : '';

  return (
    <div className="mb-16" ref={ref}>
      <h2 className="font-mono text-3xl font-bold text-white mb-3">{children}</h2>
      <div className="relative h-px w-16 bg-zinc-800 overflow-hidden">
        {animate && InView && (
          <motion.div
            className="absolute inset-0 bg-teal-400"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
        {!animate && <div className="absolute inset-0 bg-teal-400" />}
      </div>
    </div>
  );
}

export function Tag({ label, animate = true }: { label: string; animate?: boolean }) {
  return animate ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      className="inline-block px-3 py-1 text-xs font-mono text-teal-400 border border-teal-400/30 rounded-full bg-teal-400/5 whitespace-nowrap cursor-default transition-colors hover:bg-teal-400/10"
    >
      {label}
    </motion.span>
  ) : (
    <span className="inline-block px-3 py-1 text-xs font-mono text-teal-400 border border-teal-400/30 rounded-full bg-teal-400/5 whitespace-nowrap">
      {label}
    </span>
  );
}

export function GlassCard({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, borderColor: 'rgba(0, 212, 170, 0.3)' } : undefined}
      transition={{ duration: 0.2 }}
      className={`rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 ${
        hover ? 'transition-all duration-300 hover:bg-white/[0.05]' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function DecorativeBlob({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-10 pointer-events-none animate-blob ${className}`}
      style={{
        background: 'radial-gradient(circle, #00d4aa 0%, transparent 70%)',
      }}
    />
  );
}

export function NumberHighlight({ value }: { value: string | number }) {
  return <span className="text-teal-400 font-mono">{value}</span>;
}
