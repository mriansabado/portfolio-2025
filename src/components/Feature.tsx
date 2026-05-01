import { motion } from 'framer-motion';

interface FeatureProps {
  isNightMode?: boolean;
}

const Feature = ({ isNightMode = false }: FeatureProps) => {
  const features = [
    {
      title: "Ad-hoc fixes & ongoing help",
      description: "Weird site behavior, broken forms, checkout issues, slow pages — I troubleshoot and fix it. Same-day quotes on small jobs; bigger work gets a flat quote up front. Shopify, WordPress, Wix, custom code, and most platforms.",
      gradient: "from-orange-300 via-yellow-200 to-orange-200",
      borderColor: "rgba(234, 88, 12, 0.4)",
      accentColor: "#ea580c",
      nightGradient: "from-orange-900/40 via-orange-800/30 to-yellow-900/20",
      nightAccent: "#fb923c"
    },
    {
      title: "SEO & local listings",
      description: "Google Business Profile, listings that match across Yelp and Apple Maps, on-page basics, and tracking so you can see what's working — explained in plain English, not agency jargon.",
      gradient: "from-pink-300 via-rose-200 to-pink-200",
      borderColor: "rgba(236, 72, 153, 0.4)",
      accentColor: "#ec4899",
      nightGradient: "from-pink-900/40 via-rose-800/30 to-fuchsia-900/20",
      nightAccent: "#f472b6"
    },
    {
      title: "Sites & rebuilds",
      description: "Clean, mobile-friendly sites that don't feel like a template — from a focused multi-page build to custom Shopify or WordPress when you need more. I train you so you can update content without living in my inbox.",
      gradient: "from-blue-300 via-cyan-200 to-blue-200",
      borderColor: "rgba(59, 130, 246, 0.4)",
      accentColor: "#3b82f6",
      nightGradient: "from-blue-900/40 via-cyan-800/30 to-indigo-900/20",
      nightAccent: "#60a5fa"
    },
    {
      title: "Mobile apps (iOS & Android)",
      description: "React Native / Expo builds for focused ideas — ordering, menus, internal tools, events. App Store and Play setup included. Not the fit for the next Instagram; great when you need something specific shipped.",
      gradient: "from-green-300 via-emerald-200 to-green-200",
      borderColor: "rgba(34, 197, 94, 0.4)",
      accentColor: "#22c55e",
      nightGradient: "from-green-900/40 via-emerald-800/30 to-teal-900/20",
      nightAccent: "#4ade80"
    }
  ];

  return (
    <section 
      className='py-12 sm:py-16 md:py-20 relative overflow-hidden'
      style={{
        background: isNightMode
          ? 'linear-gradient(to bottom, #1e293b, #0f172a)'
          : 'linear-gradient(to bottom, #fff9f0, #fef3e2)',
        paddingBottom: '6rem'
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-orange-200/10 via-yellow-100/5 to-pink-200/10'></div>
      <div className='container mx-auto px-2 sm:px-6 relative z-10'>
        <motion.div 
          className='text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-2'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-sm sm:text-base font-semibold tracking-wide uppercase mb-2"
            style={{ color: isNightMode ? '#94a3b8' : '#64748b' }}
          >
            Mauna Digital
          </p>
          <h2 
            className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-3 sm:mb-4'
            style={{ 
              color: isNightMode ? '#f1f5f9' : '#1a1a1a',
              textShadow: isNightMode 
                ? '2px 2px 4px rgba(0,0,0,0.5)' 
                : '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Small business tech, handled
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed"
            style={{ color: isNightMode ? '#cbd5e1' : '#4a4a4a' }}
          >
            If something's broken, your site feels stuck, or Google isn't sending people your way, I'll explain it in plain English and fix what needs fixing — local in San Diego or fully remote.
          </p>
          <motion.a
            href="https://maunadigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold text-white mb-6 sm:mb-8"
            style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.35)'
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Visit Mauna Digital
          </motion.a>
          <h3
            className="text-xl sm:text-2xl font-bold mb-4"
            style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
          >
            How I help
          </h3>
          <div 
            className='h-1 w-24 sm:w-32 mx-auto rounded-full'
            style={{
              background: 'linear-gradient(to right, #ea580c, #f97316, #fb923c)',
              boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)'
            }}
          ></div>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto pb-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 ${isNightMode ? '' : `bg-gradient-to-br ${feature.gradient}`}`}
              style={{
                border: `3px solid ${isNightMode ? feature.nightAccent + '40' : feature.borderColor}`,
                boxShadow: isNightMode
                  ? `0 8px 24px ${feature.nightAccent}30, 0 4px 8px rgba(0,0,0,0.3)`
                  : `0 8px 24px ${feature.accentColor}25, 0 4px 8px rgba(0,0,0,0.08)`,
                transformStyle: 'preserve-3d',
                background: isNightMode
                  ? `linear-gradient(135deg, ${feature.nightGradient})`
                  : undefined,
                position: 'relative',
                overflow: 'hidden'
              }}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                rotateY: 2,
                rotateX: 1,
                z: 20,
                boxShadow: isNightMode
                  ? `0 16px 48px ${feature.nightAccent}40, 0 8px 16px rgba(0,0,0,0.3)`
                  : `0 16px 48px ${feature.accentColor}35, 0 8px 16px rgba(0,0,0,0.15)`
              }}
            >
              {/* Decorative accent line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: isNightMode
                    ? `linear-gradient(to right, ${feature.nightAccent}, ${feature.nightAccent}80)`
                    : `linear-gradient(to right, ${feature.accentColor}, ${feature.accentColor}80)`,
                  boxShadow: isNightMode
                    ? `0 2px 8px ${feature.nightAccent}50`
                    : `0 2px 8px ${feature.accentColor}40`
                }}
              />
              {/* Colorful corner accent for night mode */}
              {isNightMode && (
                <div 
                  className="absolute top-0 right-0 w-20 h-20 opacity-20 blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${feature.nightAccent}, transparent)`
                  }}
                />
              )}
              <div className='flex flex-col h-full relative z-10'>
                <h3 
                  className='text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3'
                  style={{ 
                    color: isNightMode ? '#f1f5f9' : '#1a1a1a',
                    textShadow: !isNightMode ? '0 1px 2px rgba(0,0,0,0.05)' : `0 1px 3px ${feature.nightAccent}30`
                  }}
                >
                  {feature.title}
                </h3>
                <p 
                  className='text-xs sm:text-sm md:text-base leading-relaxed'
                  style={{ 
                    color: isNightMode ? '#cbd5e1' : '#4a4a4a',
                    lineHeight: '1.5'
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;