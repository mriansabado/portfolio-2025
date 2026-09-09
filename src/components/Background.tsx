import '../Background.css'
import { motion } from 'framer-motion'
import { FaArrowRight } from "react-icons/fa";
import profilePhoto from '../assets/profile-photo.jpg';
import { personalSummary } from '../data/content';
import { resumeQuickFacts } from '../data/resume';

interface BackgroundProps {
  isNightMode?: boolean;
}

const Background = ({ isNightMode = false }: BackgroundProps) => {
  const pageBackground = isNightMode
    ? 'linear-gradient(180deg, #111827 0%, #0f172a 58%, #1f2937 100%)'
    : 'linear-gradient(180deg, #7dd3fc 0%, #fef3c7 20%, #f59e0b 42%, #312e81 100%)'

  const heroOverlay = isNightMode
    ? 'radial-gradient(circle at 14% 16%, rgba(251,191,36,0.18), transparent 24%), radial-gradient(circle at 78% 22%, rgba(251,146,60,0.12), transparent 18%), radial-gradient(circle at 72% 76%, rgba(244,114,182,0.12), transparent 22%), linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.72))'
    : 'radial-gradient(circle at 16% 18%, rgba(251,191,36,0.28), transparent 24%), radial-gradient(circle at 82% 20%, rgba(251,146,60,0.2), transparent 18%), radial-gradient(circle at 70% 74%, rgba(125,211,252,0.18), transparent 24%), linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(15,23,42,0.48))'

  const badges = [
    'React',
    'Vue',
    'AWS',
    'Vercel',
    'React Native'
  ]

  return (
    <div className="galaxy-shell">
      <main>
        <section
          className="galaxy-hero"
          style={{
            width: '100vw',
            minHeight: '100vh',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            background: pageBackground,
            transition: 'background 2000ms ease'
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: heroOverlay,
              transition: 'background 2000ms ease'
            }}
          />
          <div className="galaxy-grid" />
          <div className="hero-noise" />

          <motion.div
            className="hero-scribble h-14 w-36"
            style={{
              bottom: '14%',
              left: '8%',
              borderColor: 'rgba(244, 114, 182, 0.28)'
            }}
            animate={{ x: [0, 8, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="min-h-screen flex items-center py-24">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] items-center w-full">
                <motion.div
                  className="max-w-4xl text-left"
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75 }}
                >
                  <motion.p
                    className="marker-kicker mb-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.5 }}
                  >
                    {personalSummary.locationLine}
                  </motion.p>
                  <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.2rem] font-black tracking-[-0.06em] leading-[1.02] mb-6"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    style={{ color: '#f8fafc' }}
                  >
                    <span
                      style={
                        isNightMode
                          ? undefined
                          : {
                              background: 'linear-gradient(120deg, #0f172a 0%, #1e3a8a 45%, #312e81 100%)',
                              color: 'transparent',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text'
                            }
                      }
                    >
                      {personalSummary.greeting}
                    </span>
                    <span
                      className="block pb-[0.08em] glow-text"
                      style={
                        isNightMode
                          ? undefined
                          : {
                              background: 'linear-gradient(120deg, #0f172a 0%, #1e3a8a 45%, #312e81 100%)',
                              color: 'transparent',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text'
                            }
                      }
                    >
                      I build products with care and follow-through.
                    </span>
                  </motion.h1>
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mb-8"
                    style={{ color: isNightMode ? '#e2e8f0' : '#0f172a' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.65 }}
                  >
                    {personalSummary.intro}
                  </motion.p>
                  <div className="grid gap-3 sm:grid-cols-2 max-w-3xl mb-8">
                    {resumeQuickFacts.map((fact) => (
                      <div
                        key={fact}
                        className="rounded-2xl border px-4 py-3 text-sm font-medium"
                        style={{
                          borderColor: 'rgba(148, 163, 184, 0.16)',
                          background: 'rgba(15, 23, 42, 0.34)',
                          color: '#e2e8f0'
                        }}
                      >
                        {fact}
                      </div>
                    ))}
                  </div>
                  <motion.p
                    className="text-sm sm:text-base font-medium tracking-[0.14em] uppercase mb-8"
                    style={{ color: '#94a3b8' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.29, duration: 0.6 }}
                  >
                    React • Vue • AWS • Vercel • React Native
                  </motion.p>
                  <motion.div
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.65 }}
                  >
                    {badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border px-4 py-2 text-sm font-semibold"
                        style={{
                          borderColor: 'rgba(251, 191, 36, 0.22)',
                          background: 'rgba(15, 23, 42, 0.45)',
                          color: '#fef3c7'
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </motion.div>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.65 }}
                  >
                    <motion.a
                      href="mailto:mriansabado@gmail.com?subject=Portfolio%20Inquiry"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-slate-950"
                      style={{
                        background: 'linear-gradient(135deg, #fcd34d 0%, #fb7185 52%, #c4b5fd 100%)',
                        boxShadow: '0 16px 30px rgba(251, 113, 133, 0.18)'
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Let&apos;s build something
                      <FaArrowRight className="text-xs" />
                    </motion.a>
                    <motion.a
                      href="https://github.com/mriansabado"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-slate-100 border"
                      style={{
                        borderColor: 'rgba(251, 191, 36, 0.18)',
                        background: 'rgba(15, 23, 42, 0.36)'
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      See shipped work
                    </motion.a>
                  </motion.div>
                </motion.div>

                <motion.aside
                  className="stack-card p-6 sm:p-8"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22, duration: 0.75 }}
                >
                  <div className="relative z-10">
                    <div className="hero-profile-wrap">
                      <div className="hero-profile-photo-ring">
                        <img src={profilePhoto} alt="Ian Sabado" className="hero-profile-photo" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: '#fcd34d' }}>
                          Friendly, detail-focused builder
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>
                          Hawaii roots, San Diego home base, and a frontend skill set built for teams that care about product quality.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#fcd34d' }}>
                      A few quick receipts
                    </p>
                    <div className="space-y-4">
                      {[
                        ['4+ years', 'Shipping production UI across agency, product, and founder-mode work.'],
                        ['2 iOS apps', 'Built with React Native, including App Store releases and cross-device product thinking.'],
                        ['30+ sites', 'Maintained and improved large site portfolios without letting the details get sloppy.'],
                        ['Open to work', 'Frontend roles, freelance builds, and contract work where polish and follow-through matter.']
                      ].map(([label, copy]) => (
                        <div
                          key={label}
                          className="rounded-3xl border px-4 py-4"
                          style={{
                            borderColor: 'rgba(148, 163, 184, 0.16)',
                            background: 'rgba(255, 255, 255, 0.03)'
                          }}
                        >
                          <p className="text-lg font-bold mb-1" style={{ color: '#f8fafc' }}>{label}</p>
                          <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>{copy}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                      {personalSummary.voiceLine}
                    </p>
                  </div>
                </motion.aside>
              </div>
            </div>
          </div>
        </section>

        <motion.section
          className="relative overflow-hidden w-screen py-20 md:py-28"
          style={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            background: 'linear-gradient(to bottom, rgba(2,6,23,0.65), rgba(15,23,42,0.2))'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-orbit h-[22rem] w-[22rem] -top-10 left-[8%]" />
          <div className="section-orbit h-[16rem] w-[16rem] bottom-8 right-[10%]" style={{ animationDuration: '24s' }} />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              className="paper-panel rounded-[2rem] max-w-5xl mx-auto p-8 md:p-12"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] mb-4 text-center" style={{ color: '#fcd34d' }}>
                Why people tend to like working with me
              </p>
              <p
                className="text-center text-lg md:text-2xl leading-relaxed"
                style={{ color: '#e2e8f0' }}
              >
                I like making software feel clear, polished, and a little memorable. That has meant shipping frontend work for large content platforms, building tools that save teams real time, and making my own products on nights and weekends, with a little Hawaii warmth and a San Diego product pace in the mix.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default Background;