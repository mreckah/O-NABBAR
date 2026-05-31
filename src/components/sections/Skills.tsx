import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading } from "../ui";
import { SKILL_CATEGORIES } from "../../constants/data";

// container animation removed (not used)

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.9 },
};

export default function Skills() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (newIndex: number) => {
    setDirection(newIndex > active ? 1 : -1);
    setActive(newIndex);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0,
    }),
  };

  return (
    <Section id="skills" label="skills">
      <SectionHeading>Skills</SectionHeading>

      <motion.div
        ref={containerRef}
        className="flex flex-wrap gap-2 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        {SKILL_CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.label}
            onClick={() => handleTabChange(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.05 }}
            className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
              active === i
                ? "border-teal-400 text-teal-400 bg-teal-400/10 shadow-[0_0_15px_rgba(0,212,170,0.2)]"
                : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      <div className="relative min-h-[120px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {SKILL_CATEGORIES[active].skills.map((skill) => (
              <motion.span
                key={skill}
                variants={item}
                initial="hidden"
                animate="show"
                exit="exit"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(0, 212, 170, 0.15)",
                  color: "#00d4aa",
                }}
                className="px-4 py-2 font-mono text-sm border border-white/[0.08] text-zinc-300 rounded-lg bg-white/[0.02] cursor-default transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
