import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading, GlassCard, DecorativeBlob } from "../ui";
import { BIO, STATS } from "../../constants/data";

function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const hasPlus = value.includes("+");
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * numericValue));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <GlassCard className="text-center group" hover>
        <p className="font-mono text-3xl font-bold text-teal-400 mb-1">
          {displayValue}
          {hasPlus ? "+" : ""}
        </p>
        <p className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">
          {label}
        </p>
      </GlassCard>
    </motion.div>
  );
}

export default function About() {
  const [lang, setLang] = useState<"en" | "fr">("en");

  return (
    <Section id="about" label="about">
      <SectionHeading>About</SectionHeading>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <motion.button
              onClick={() => setLang("en")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-mono text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
                lang === "en"
                  ? "border-teal-400 text-teal-400 bg-teal-400/10"
                  : "border-white/10 text-zinc-500 hover:border-white/20"
              }`}
            >
              EN
            </motion.button>
            <motion.button
              onClick={() => setLang("fr")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-mono text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
                lang === "fr"
                  ? "border-teal-400 text-teal-400 bg-teal-400/10"
                  : "border-white/10 text-zinc-500 hover:border-white/20"
              }`}
            >
              FR
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={lang}
              initial={{ opacity: 0, y: 10, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -10, rotateX: 10 }}
              transition={{ duration: 0.35 }}
              className="text-zinc-400 leading-relaxed text-base text-center md:text-left"
            >
              {BIO[lang]}
            </motion.p>
          </AnimatePresence>

          <motion.div
            className="mt-8 flex flex-col gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-zinc-500 text-sm font-mono text-center md:text-left">
              <span className="text-zinc-300">School:</span>{" "}
              <span className="text-teal-400">ENSET Mohammedia</span>
            </p>
            <p className="text-zinc-500 text-sm font-mono text-center md:text-left">
              <span className="text-zinc-300">Specialization:</span>{" "}
              <span className="text-teal-400">
                Big Data and Cloud Computing
              </span>
            </p>
            <p className="text-zinc-500 text-sm font-mono text-center md:text-left">
              <span className="text-zinc-300">Status:</span>{" "}
              <span className="text-teal-400">
                Final-year Engineering Student
              </span>
            </p>
            <p className="text-zinc-500 text-sm font-mono text-center md:text-left">
              <span className="text-zinc-300">Location:</span>{" "}
              <span className="text-teal-400">Casablanca, Maroc</span>
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>

      <DecorativeBlob className="w-96 h-96 -top-48 -right-48" />
      <DecorativeBlob className="w-64 h-64 -bottom-32 -left-32" />
      {/* Education moved to its own dedicated section; Activities removed per request */}
    </Section>
  );
}
