import { motion } from 'framer-motion';
import { FaAws, FaReact } from 'react-icons/fa';
import { SiVercel, SiVuedotjs } from 'react-icons/si';
import profilePhoto from '../assets/profile-photo.jpg';
import { resumeFocusAreas, resumeQuickFacts, resumeRequestHref, resumeSummary } from '../data/resume';

interface ResumeProps {
  isNightMode?: boolean;
}

const logoIcons = [FaReact, SiVuedotjs, FaAws, SiVercel];

const Resume = ({ isNightMode = false }: ResumeProps) => {
  return (
    <section
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
      style={{
        background: isNightMode
          ? 'linear-gradient(to bottom, rgba(15,23,42,0.82), rgba(2,6,23,0.95))'
          : 'linear-gradient(to bottom, rgba(30,27,75,0.78), rgba(15,23,42,0.94))'
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(125,211,252,0.12),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.1),_transparent_22%)]" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#7dd3fc' }}>
            Resume snapshot
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4" style={{ color: '#f8fafc' }}>
            The 5-second employer version
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#cbd5e1' }}>
            Most people skim first. So this section starts with the quick-fit answers, then gives more detail if you keep reading.
          </p>
        </motion.div>

        <motion.div
          className="stack-card p-6 sm:p-8 md:p-10 max-w-6xl mx-auto"
          style={{
            background: isNightMode
              ? 'linear-gradient(180deg, rgba(15,23,42,0.9), rgba(30,41,59,0.72))'
              : 'linear-gradient(180deg, rgba(30,27,75,0.9), rgba(30,41,59,0.72))'
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[1.75rem] border border-slate-400/20">
                <img src={profilePhoto} alt="Ian Sabado" className="h-full w-full object-cover" />
              </div>
              <div className="rounded-[1.5rem] border border-slate-400/20 bg-slate-950/30 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: '#fde68a' }}>
                  Core stack
                </p>
                <div className="flex flex-wrap gap-3">
                  {logoIcons.map((Icon, index) => (
                    <div
                      key={index}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-400/15 bg-white/5"
                      style={{ color: '#f8fafc' }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {resumeQuickFacts.map((fact) => (
                  <div
                    key={fact}
                    className="rounded-[1.2rem] border border-emerald-200/10 bg-emerald-300/[0.04] px-4 py-3"
                  >
                    <p className="text-sm font-medium leading-relaxed" style={{ color: '#f8fafc' }}>
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-3" style={{ color: '#f8fafc' }}>
                {resumeSummary.headline}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: '#e2e8f0' }}>
                {resumeSummary.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {resumeFocusAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-[1.35rem] border border-slate-400/15 bg-slate-950/30 p-4"
                  >
                    <p className="text-sm leading-relaxed" style={{ color: '#e2e8f0' }}>
                      {area}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {resumeSummary.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.35rem] border border-slate-400/15 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] mb-2" style={{ color: '#94a3b8' }}>
                      {item.label}
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#f8fafc' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={resumeRequestHref}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm sm:text-base font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #7dd3fc 0%, #c4b5fd 52%, #fde68a 100%)',
                    color: '#0f172a'
                  }}
                >
                  Request full resume
                </a>
                <p className="self-center text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                  Happy to send the full version for roles, freelance work, or a friendly intro call.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
