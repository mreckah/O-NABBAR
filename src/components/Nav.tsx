import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../constants/data";
import { useActiveSection } from "../hooks";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const updateUnderline = useCallback((linkId: string | null) => {
    if (!linkId || !linkRefs.current[linkId] || !navRef.current) {
      setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const el = linkRefs.current[linkId];
    if (el) {
      const navRect = navRef
        .current!.querySelector("ul")!
        .getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setUnderlineStyle({
        left: elRect.left - navRect.left + elRect.width / 2,
        width: elRect.width,
        opacity: 1,
      });
    }
  }, []);

  useEffect(() => {
    updateUnderline(active);
  }, [active, updateUnderline]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleMouseEnter = (linkId: string) => {
    setHoveredLink(linkId);
    updateUnderline(linkId);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
    updateUnderline(active);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/[0.06] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.button
          onClick={() => scrollTo("hero")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-mono text-xl font-bold text-teal-400 hover:text-teal-300 transition-colors tracking-tight"
        >
          Oussama NABBAR
        </motion.button>

        <ul className="hidden md:flex items-center gap-8 relative">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => handleMouseEnter(link.id)}
                onMouseLeave={handleMouseLeave}
                className={`font-mono text-sm transition-colors duration-200 py-2 px-1 ${
                  active === link.id
                    ? "text-teal-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}

          <motion.div
            className="absolute -bottom-1 h-0.5 bg-teal-400 rounded-full"
            initial={false}
            animate={{
              x: underlineStyle.left - underlineStyle.width / 2,
              width: underlineStyle.width,
              opacity: underlineStyle.opacity,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </ul>

        <motion.button
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-16 right-0 bottom-0 w-64 bg-[#0a0a0a]/95 backdrop-blur-md border-l border-white/[0.06] overflow-hidden"
          >
            <ul className="p-6 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => scrollTo(link.id)}
                    className={`font-mono text-sm transition-colors ${
                      active === link.id ? "text-teal-400" : "text-zinc-400"
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
