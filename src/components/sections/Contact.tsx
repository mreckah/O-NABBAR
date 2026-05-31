import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  Loader2,
} from "lucide-react";
import { Section, SectionHeading, GlassCard, DecorativeBlob } from "../ui";
import { useClipboard } from "../../hooks";
import { SOCIAL_LINKS } from "../../constants/data";

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: "Email",
    value: SOCIAL_LINKS.email,
    copyable: true,
    href: `mailto:${SOCIAL_LINKS.email}`,
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+212 674-807105",
    copyable: false,
    href: "tel:+212674807105",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Casablanca, Maroc",
    copyable: false,
    href: null,
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/nabbar-oussama",
    copyable: false,
    href: SOCIAL_LINKS.linkedin,
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "github.com/mreckah",
    copyable: false,
    href: SOCIAL_LINKS.github,
  },
];

function Toast({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 10,
        scale: show ? 1 : 0.9,
      }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 bg-teal-400 text-[#0a0a0a] font-mono text-sm px-4 py-2 rounded-lg shadow-lg pointer-events-none z-50 flex items-center gap-2"
    >
      <Check size={14} />
      Email copied to clipboard
    </motion.div>
  );
}

function ContactCard({
  item,
  index,
}: {
  item: (typeof CONTACT_ITEMS)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasPulsed, setHasPulsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { copied, copy } = useClipboard();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasPulsed) {
            setTimeout(() => setHasPulsed(true), 500);
          }
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasPulsed]);

  const { Icon, label, value, copyable, href } = item;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <GlassCard hover={false} className="flex items-center gap-4 py-4 group">
        <motion.div
          animate={hasPulsed ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="w-9 h-9 rounded-lg bg-teal-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-400/20 transition-colors"
        >
          <Icon size={16} className="text-teal-400" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-zinc-500 text-xs font-mono mb-0.5">{label}</p>
          {href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-zinc-300 text-sm hover:text-teal-400 transition-colors truncate block"
            >
              {value}
            </a>
          ) : (
            <p className="text-zinc-300 text-sm truncate">{value}</p>
          )}
        </div>
        {copyable && (
          <motion.button
            onClick={() => copy(value)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-zinc-600 hover:text-teal-400 transition-colors flex-shrink-0"
            aria-label="Copy email"
          >
            {copied ? (
              <Check size={15} className="text-teal-400" />
            ) : (
              <Copy size={15} />
            )}
          </motion.button>
        )}
      </GlassCard>
    </motion.div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { copied } = useClipboard();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;
    setStatus("sending");
    setTimeout(() => {
      window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      setStatus("sent");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 3000);
    }, 400);
  };

  return (
    <>
      <Section
        id="contact"
        label="contact"
        className="relative overflow-hidden"
      >
        <SectionHeading>Contact</SectionHeading>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div className="flex flex-col gap-4">
            {CONTACT_ITEMS.map((item, i) => (
              <ContactCard key={item.label} item={item} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="font-mono text-xs text-zinc-500 block mb-1.5">
                  Name
                </label>
                <input
                  name="name"
                  required
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-white/[0.03] border rounded-lg px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none transition-all duration-300 ${
                    focusedField === "name"
                      ? "border-teal-400/50 shadow-[0_0_15px_rgba(0,212,170,0.15)]"
                      : "border-white/[0.08]"
                  }`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-zinc-500 block mb-1.5">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-white/[0.03] border rounded-lg px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none transition-all duration-300 ${
                    focusedField === "email"
                      ? "border-teal-400/50 shadow-[0_0_15px_rgba(0,212,170,0.15)]"
                      : "border-white/[0.08]"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-zinc-500 block mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-white/[0.03] border rounded-lg px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none transition-all duration-300 resize-none ${
                    focusedField === "message"
                      ? "border-teal-400/50 shadow-[0_0_15px_rgba(0,212,170,0.15)]"
                      : "border-white/[0.08]"
                  }`}
                  placeholder="What's on your mind?"
                />
              </div>
              <motion.button
                type="submit"
                disabled={status !== "idle"}
                whileHover={status === "idle" ? { scale: 1.02 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className="flex items-center justify-center gap-2 bg-teal-400 text-[#0a0a0a] font-mono font-semibold text-sm py-3 rounded-lg transition-all duration-200 disabled:opacity-60 relative overflow-hidden group"
              >
                {status === "idle" && (
                  <>
                    <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                    <Send size={16} className="relative z-10" />
                    <span className="relative z-10">Send Message</span>
                  </>
                )}
                {status === "sending" && (
                  <>
                    <Loader2 size={16} className="animate-spin relative z-10" />
                    <span className="relative z-10">Opening...</span>
                  </>
                )}
                {status === "sent" && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={16} className="relative z-10" />
                      <span className="relative z-10">Sent</span>
                    </motion.div>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <DecorativeBlob className="w-80 h-80 -bottom-40 -left-40 opacity-[0.03]" />
        <DecorativeBlob className="w-60 h-60 top-0 right-0 opacity-[0.03]" />
      </Section>

      <footer className="border-t border-white/[0.06] py-8 text-center relative overflow-hidden">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-zinc-600 text-sm mb-4"
        >
          Built by Oussama NABBAR - 2026
        </motion.p>
        <div className="flex items-center justify-center gap-6">
          {[
            { href: SOCIAL_LINKS.github, Icon: Github, label: "GitHub" },
            { href: SOCIAL_LINKS.linkedin, Icon: Linkedin, label: "LinkedIn" },
            {
              href: `mailto:${SOCIAL_LINKS.email}`,
              Icon: Mail,
              label: "Email",
            },
          ].map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, color: "#00d4aa" }}
              className="text-zinc-600 transition-colors"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </footer>

      <Toast show={copied} />
    </>
  );
}
