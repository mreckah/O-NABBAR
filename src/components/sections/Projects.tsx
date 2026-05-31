import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Section, SectionHeading, Tag, GlassCard } from "../ui";
import { FEATURED_PROJECT, PROJECTS } from "../../constants/data";

function FeaturedProject() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [gradientPos, setGradientPos] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPos((p) => (p + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mb-20 rounded-2xl overflow-hidden border border-teal-400/20 p-8 md:p-10 glass accent-gradient hover:animate-pulse-glow transition-all"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-teal-400 via-teal-400/50 to-transparent rounded-l-2xl" />

      <div className="pl-4 relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-teal-400 tracking-widest uppercase mb-3 block"
        >
          Featured Project
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="font-mono text-2xl md:text-3xl font-bold text-white mb-4"
        >
          {FEATURED_PROJECT.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-zinc-400 leading-relaxed mb-6 max-w-3xl"
        >
          {FEATURED_PROJECT.description}
        </motion.p>

        <ul className="flex flex-col gap-2 mb-6">
          {FEATURED_PROJECT.features.map((f, i) => (
            <li key={i} className="flex gap-3 text-zinc-400 text-sm">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="text-teal-400 flex-shrink-0"
              >
                -
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                {f}
              </motion.span>
            </li>
          ))}
        </ul>

        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {FEATURED_PROJECT.tech.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                delay: 0.8 + i * 0.03,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Tag label={t} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-4">
          <motion.a
            href={FEATURED_PROJECT.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white font-mono text-sm rounded-lg hover:border-teal-400/40 hover:text-teal-400 transition-all duration-200 group"
          >
            <span className="absolute inset-0 bg-teal-400/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            <Github size={16} className="relative z-10" />
            <span className="relative z-10">GitHub</span>
          </motion.a>
          {FEATURED_PROJECT.demo && (
            <motion.a
              href={FEATURED_PROJECT.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-teal-400 text-[#0a0a0a] font-mono text-sm font-semibold rounded-lg hover:bg-teal-300 transition-all duration-200"
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  totalCards: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const row = Math.floor(index / 3);
  const delayOffset = row * 0.1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delayOffset + index * 0.08, duration: 0.4 }}
    >
      <GlassCard className="h-full flex flex-col group/card" hover>
        <h4 className="font-mono font-bold text-white mb-3 group-hover/card:text-teal-400 transition-colors">
          {project.title}
        </h4>
        <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: delayOffset + index * 0.08 + 0.2 + i * 0.02,
              }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-xs font-mono text-teal-400 border border-teal-400/30 rounded-full bg-teal-400/5 whitespace-nowrap cursor-default transition-colors hover:bg-teal-400/10"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        {project.github ? (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-zinc-500 hover:text-teal-400 transition-colors text-sm font-mono mt-auto"
          >
            <Github size={14} />
            GitHub
          </motion.a>
        ) : project.demo ? (
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-zinc-500 hover:text-teal-400 transition-colors text-sm font-mono mt-auto"
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>
        ) : (
          <div className="text-zinc-600 text-sm font-mono mt-auto">
            No public link
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}

export default function Projects() {
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("projects");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeadingVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="projects" label="projects">
      <SectionHeading>Selected Projects</SectionHeading>
      <FeaturedProject />

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={headingVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="font-mono text-lg text-white mb-8"
      >
        Other Projects
      </motion.h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.filter((p) => p.github || p.demo).map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            index={i}
            totalCards={PROJECTS.length}
          />
        ))}
      </div>
    </Section>
  );
}
