import { motion } from 'framer-motion';
import { Section, SectionHeading, GlassCard, DecorativeBlob } from '../ui';

export default function Education() {
  return (
    <Section id="education" label="education">
      <SectionHeading>Education</SectionHeading>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <GlassCard className="p-6" hover>
            <h3 className="font-mono text-lg text-teal-400 font-bold mb-2">Engineering Degree in Big Data & Cloud Computing</h3>
            <p className="text-zinc-400 text-sm mb-2">ENSET Mohammedia — Mohammedia, Morocco — <span className="text-zinc-500 text-xs">September 2023 - Present</span></p>
            <p className="text-zinc-300 text-sm mb-3">Specializing in Big Data technologies, Cloud Computing, Data Engineering, and Machine Learning. Focus on distributed systems, data pipelines, and scalable architectures.</p>
            <ul className="list-disc list-inside text-zinc-400 text-sm space-y-1">
              <li>Data Engineering & ETL/ELT processes</li>
              <li>Big Data technologies (Hadoop, Spark, Kafka)</li>
              <li>Machine Learning & Predictive Analytics</li>
              <li>Cloud Computing & DevOps</li>
            </ul>
          </GlassCard>
        </div>

        <div>
          <GlassCard className="p-6" hover>
            <h3 className="font-mono text-lg text-teal-400 font-bold mb-2">Preparatory Classes for Engineering Schools (CPGE)</h3>
            <p className="text-zinc-400 text-sm mb-2">Technical High School Mohammedia — Mohammedia, Morocco — <span className="text-zinc-500 text-xs">September 2021 - June 2023</span></p>
            <p className="text-zinc-300 text-sm mb-3">Intensive two-year program in Mathematics, Physics, and Engineering Sciences preparing for competitive entrance exams to top engineering schools.</p>
            <ul className="list-disc list-inside text-zinc-400 text-sm space-y-1">
              <li>Advanced Mathematics & Physics</li>
              <li>Engineering Sciences</li>
              <li>Problem-solving & Analytical thinking</li>
              <li>Successfully qualified for ENSET Mohammedia</li>
            </ul>
          </GlassCard>
        </div>
      </div>

      <DecorativeBlob className="w-96 h-96 -top-44 -right-44" />
      <DecorativeBlob className="w-60 h-60 -bottom-28 -left-28" />
    </Section>
  );
}
