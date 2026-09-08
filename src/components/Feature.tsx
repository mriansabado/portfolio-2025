import { motion } from 'framer-motion';
import { strengths } from '../data/content';

interface FeatureProps {
  isNightMode?: boolean;
}

const Feature = ({ isNightMode = false }: FeatureProps) => {
  return (
    <section
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
      style={{
        background: isNightMode
          ? 'linear-gradient(to bottom, rgba(17,24,39,0.9), rgba(2,6,23,0.95))'
          : 'linear-gradient(to bottom, rgba(15,23,42,0.88), rgba(2,6,23,0.95))',
        paddingBottom: '6rem'
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.08),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.08),_transparent_24%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: '#fcd34d' }}
          >
            What it&apos;s like to work with me
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-3 sm:mb-4"
            style={{ color: '#f8fafc' }}
          >
            Thoughtful product sense, careful execution, and polished UI
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg mb-4 leading-relaxed"
            style={{ color: '#e2e8f0' }}
          >
            I do my best work where product thinking and frontend craft overlap: shaping the interaction, building it cleanly, and making sure the final result feels smooth, warm, and easy to trust.
          </p>
          <p
            className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed font-medium"
            style={{ color: '#94a3b8' }}
          >
            The through-line in my work is simple: thoughtful UX, clear hierarchy, and products that feel intentional instead of assembled.
          </p>
          <h3
            className="text-xl sm:text-2xl font-bold mb-4"
            style={{ color: '#f8fafc' }}
          >
            A few patterns in how I build
          </h3>
          <div
            className="h-1 w-24 sm:w-32 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, #fcd34d, #fb7185, #c4b5fd)'
            }}
          ></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto pb-8">
          {strengths.map((service, index) => (
            <motion.div
              key={service.title}
              className="stack-card p-5 sm:p-6"
              style={{
                background: isNightMode
                  ? `linear-gradient(180deg, rgba(15,23,42,0.88), rgba(30,41,59,0.72))`
                  : `linear-gradient(180deg, rgba(30,27,75,0.88), rgba(30,41,59,0.72))`
              }}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{
                y: -5,
                rotate: index % 2 === 0 ? -0.4 : 0.4
              }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <p
                    className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em]"
                    style={{ color: '#fcd34d' }}
                  >
                    {service.eyebrow}
                  </p>
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      background: 'rgba(251, 191, 36, 0.08)',
                      color: '#fde68a',
                      border: '1px solid rgba(251, 191, 36, 0.18)'
                    }}
                  >
                    {service.icon}
                  </div>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-semibold mb-3"
                  style={{ color: '#f8fafc' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed mb-4"
                  style={{ color: '#e2e8f0' }}
                >
                  {service.description}
                </p>
                <p
                  className="text-sm leading-relaxed mt-auto"
                  style={{ color: '#94a3b8' }}
                >
                  {service.note}
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