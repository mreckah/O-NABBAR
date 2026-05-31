import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Section, SectionHeading, Tag, DecorativeBlob } from '../ui';
import { EXPERIENCES } from '../../constants/data';

function TimelineLine() {
  const [progress, setProgress] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress(100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (lineRef.current) observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={lineRef} className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 ml-2 hidden md:block overflow-hidden">
      <div
        className="w-full bg-gradient-to-b from-teal-400 to-teal-400/20 transition-all duration-1000 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}

function TimelineDot({ index, isVisible }: { index: number; isVisible: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
      className="hidden md:block absolute left-0 top-2 w-5 h-5 rounded-full border-2 border-teal-400 bg-[#0a0a0a] -translate-x-[8px] z-10 shadow-[0_0_10px_rgba(0,212,170,0.3)]"
    />
  );
}

export default function Experience() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(EXPERIENCES.map(() => false));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    EXPERIENCES.forEach((_, i) => {
      const el = document.getElementById(`exp-card-${i}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <Section id="experience" label="experience" className="relative">
      <SectionHeading>Experience</SectionHeading>

      <div className="relative" ref={sectionRef}>
        <TimelineLine />

        <div className="flex flex-col gap-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.company}
              id={`exp-card-${i}`}
              initial={{ opacity: 0, x: -30 }}
              animate={visibleCards[i] ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5, type: 'spring', stiffness: 100 }}
              className="md:pl-10 relative"
            >
              <TimelineDot index={i} isVisible={visibleCards[i]} />

              <motion.div
                whileHover={{ x: 4 }}
                className="border border-white/[0.08] rounded-xl bg-white/[0.02] p-6 transition-all duration-300 hover:border-teal-400/30 hover:shadow-[-4px_0_20px_rgba(0,212,170,0.1)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-mono font-bold text-white text-lg">{exp.company}</h3>
                    <p className="text-teal-400 font-mono text-sm mt-0.5">{exp.role}</p>
                    {exp.project && (
                      <p className="text-zinc-500 text-xs font-mono mt-0.5">{exp.project}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2 mb-5">
                  {exp.bullets.map((b, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={visibleCards[i] ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.15 + 0.3 + j * 0.05 }}
                      className="flex gap-3 text-zinc-400 text-sm leading-relaxed"
                    >
                      <span className="text-teal-400 mt-1 flex-shrink-0">-</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={visibleCards[i] ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.15 + 0.5 }}
                >
                  {exp.tags.map((tag, tIdx) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={visibleCards[i] ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.15 + 0.5 + tIdx * 0.03 }}
                    >
                      <Tag label={tag} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <DecorativeBlob className="w-64 h-64 top-1/4 -right-32" />
    </Section>
  );
}
