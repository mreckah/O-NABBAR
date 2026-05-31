import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Section, SectionHeading, GlassCard } from '../ui';
import { CERTIFICATIONS } from '../../constants/data';

const ISSUER_COLORS: Record<string, string> = {
  'Amazon Web Services': 'from-orange-500/20 to-yellow-500/20',
  'Cisco': 'from-cyan-500/20 to-blue-500/20',
  'Databricks': 'from-red-500/20 to-pink-500/20',
};

const ISSUER_ABBREV: Record<string, string> = {
  'Amazon Web Services': 'AWS',
  'Cisco': 'CISCO',
  'Databricks': 'DB',
};

function CertificationCard({ cert, index }: { cert: typeof CERTIFICATIONS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0, rotateX: -20 }}
      whileInView={{ opacity: 1, scaleY: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      style={{ transformOrigin: 'top' }}
    >
      <GlassCard
        hover
        className={`relative overflow-hidden group ${ISSUER_COLORS[cert.issuer] ? `bg-gradient-to-br ${ISSUER_COLORS[cert.issuer]}` : ''}`}
      >
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#0a0a0a]/50 border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-teal-400/30 transition-colors">
              <span className="font-mono text-teal-400 text-xs font-bold">
                {ISSUER_ABBREV[cert.issuer] || cert.issuer.slice(0, 3).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-500 text-xs font-mono mb-1 transition-colors group-hover:text-teal-400">
                {cert.issuer}
              </p>
              <h3 className="text-white text-sm font-medium leading-snug">{cert.name}</h3>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-600 text-xs font-mono">{cert.date}</span>
            {cert.link && (
              <motion.a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-1.5 text-teal-400 text-xs font-mono hover:text-teal-300 transition-colors group/btn"
              >
                <span>Credential</span>
                <ExternalLink size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
              </motion.a>
            )}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-teal-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </GlassCard>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <Section id="certifications" label="certifications">
      <SectionHeading>Certifications</SectionHeading>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {CERTIFICATIONS.map((cert, i) => (
          <CertificationCard key={cert.name} cert={cert} index={i} />
        ))}
      </div>
    </Section>
  );
}
