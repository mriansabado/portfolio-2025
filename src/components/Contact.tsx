import { motion } from 'framer-motion';

interface ContactProps {
  isNightMode?: boolean;
}

const Contact = ({ isNightMode = false }: ContactProps) => {
  return (
    <section 
      className="py-12 sm:py-16 md:py-24 relative overflow-hidden"
      style={{
        background: isNightMode
          ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
          : 'linear-gradient(to bottom, #fef3e2, #fff9f0)'
      }}
    >
      {/* Decorative background elements */}
      {isNightMode ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-indigo-900/10" />
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-800/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-800/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-yellow-100/15 to-pink-200/20" />
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/15 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-pink-300/15 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-14 max-w-3xl mx-auto px-2"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: isNightMode ? '#f1f5f9' : '#1a1a1a',
              textShadow: isNightMode 
                ? '2px 2px 4px rgba(0,0,0,0.5)' 
                : '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Need a hand? Let&apos;s talk
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: isNightMode ? '#cbd5e1' : '#4a4a4a' }}
          >
            Send your site or describe what&apos;s going on — I&apos;ll give honest feedback on what to fix first, what can wait, and what it might cost. No pressure. I usually reply within 24 hours.
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12"
            style={{
              background: isNightMode ? '#1e293b' : 'white',
              boxShadow: isNightMode
                ? '0 12px 32px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)'
                : '0 12px 32px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
              border: isNightMode 
                ? '2px solid rgba(148, 163, 184, 0.2)'
                : '2px solid rgba(234, 88, 12, 0.2)',
              transformStyle: 'preserve-3d'
            }}
            whileHover={{
              scale: 1.02,
              rotateY: 2,
              boxShadow: isNightMode
                ? '0 20px 48px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)'
                : '0 20px 48px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.15)'
            }}
          >
            <h3 
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-center"
              style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
            >
              Contact
            </h3>
            <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-3 sm:space-x-4 transition-colors group p-3 sm:p-4 rounded-lg sm:rounded-xl w-full sm:w-auto"
                style={{
                  background: isNightMode
                    ? 'linear-gradient(135deg, #334155 0%, #475569 100%)'
                    : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
                  border: isNightMode
                    ? '1px solid rgba(148, 163, 184, 0.3)'
                    : '1px solid rgba(234, 88, 12, 0.2)',
                  boxShadow: isNightMode
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 4px 12px rgba(234, 88, 12, 0.15)'
                }}
              >
                <div 
                  className="p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    boxShadow: '0 4px 8px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a 
                  href="mailto:ian@maunadigital.com" 
                  className="text-base sm:text-lg md:text-xl font-medium"
                  style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
                >
                  ian@maunadigital.com
                </a>
              </motion.div>
              <motion.a
                href="mailto:ian@maunadigital.com?subject=Free%20website%20check"
                whileHover={{ scale: 1.02, y: -2 }}
                className="text-center text-sm sm:text-base font-medium underline underline-offset-4"
                style={{ color: isNightMode ? '#94a3b8' : '#64748b' }}
              >
                Free website check — email me your URL
              </motion.a>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-3 sm:space-x-4 transition-colors group p-3 sm:p-4 rounded-lg sm:rounded-xl w-full sm:w-auto"
                style={{
                  background: isNightMode
                    ? 'linear-gradient(135deg, #334155 0%, #475569 100%)'
                    : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
                  border: isNightMode
                    ? '1px solid rgba(148, 163, 184, 0.3)'
                    : '1px solid rgba(234, 88, 12, 0.2)',
                  boxShadow: isNightMode
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 4px 12px rgba(234, 88, 12, 0.15)'
                }}
              >
                <div 
                  className="p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    boxShadow: '0 4px 8px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a 
                  href="tel:4159716114" 
                  className="text-base sm:text-lg md:text-xl font-medium"
                  style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
                >
                  415-971-6114
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-3 sm:space-x-4 transition-colors group p-3 sm:p-4 rounded-lg sm:rounded-xl w-full sm:w-auto"
                style={{
                  background: isNightMode
                    ? 'linear-gradient(135deg, #334155 0%, #475569 100%)'
                    : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
                  border: isNightMode
                    ? '1px solid rgba(148, 163, 184, 0.3)'
                    : '1px solid rgba(234, 88, 12, 0.2)',
                  boxShadow: isNightMode
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 4px 12px rgba(234, 88, 12, 0.15)'
                }}
              >
                <div 
                  className="p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    boxShadow: '0 4px 8px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span 
                  className="text-base sm:text-lg md:text-xl font-medium"
                  style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
                >
                  San Diego, CA — local or remote
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12"
            style={{
              background: isNightMode ? '#1e293b' : 'white',
              boxShadow: isNightMode
                ? '0 12px 32px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)'
                : '0 12px 32px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
              border: isNightMode 
                ? '2px solid rgba(148, 163, 184, 0.2)'
                : '2px solid rgba(234, 88, 12, 0.2)',
              transformStyle: 'preserve-3d'
            }}
            whileHover={{
              scale: 1.02,
              rotateY: 2,
              boxShadow: isNightMode
                ? '0 20px 48px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)'
                : '0 20px 48px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.15)'
            }}
          >
            <h3 
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-center"
              style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
            >
              Connect
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://maunadigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 sm:space-x-3 transition-colors group p-3 sm:p-4 rounded-lg sm:rounded-xl"
                style={{
                  background: isNightMode
                    ? 'linear-gradient(135deg, #334155 0%, #475569 100%)'
                    : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
                  border: isNightMode
                    ? '1px solid rgba(148, 163, 184, 0.3)'
                    : '1px solid rgba(234, 88, 12, 0.2)',
                  boxShadow: isNightMode
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 4px 12px rgba(234, 88, 12, 0.15)'
                }}
              >
                <div 
                  className="p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    boxShadow: '0 4px 8px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <span 
                  className="text-base sm:text-lg font-medium"
                  style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
                >
                  Mauna Digital
                </span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://github.com/mriansabado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 sm:space-x-3 transition-colors group p-3 sm:p-4 rounded-lg sm:rounded-xl"
                style={{
                  background: isNightMode
                    ? 'linear-gradient(135deg, #334155 0%, #475569 100%)'
                    : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
                  border: isNightMode
                    ? '1px solid rgba(148, 163, 184, 0.3)'
                    : '1px solid rgba(234, 88, 12, 0.2)',
                  boxShadow: isNightMode
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 4px 12px rgba(234, 88, 12, 0.15)'
                }}
              >
                <div 
                  className="p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    boxShadow: '0 4px 8px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <span 
                  className="text-base sm:text-lg font-medium"
                  style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
                >
                  GitHub
                </span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://leetcode.com/u/mriansabado/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 sm:space-x-3 transition-colors group p-3 sm:p-4 rounded-lg sm:rounded-xl"
                style={{
                  background: isNightMode
                    ? 'linear-gradient(135deg, #334155 0%, #475569 100%)'
                    : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
                  border: isNightMode
                    ? '1px solid rgba(148, 163, 184, 0.3)'
                    : '1px solid rgba(234, 88, 12, 0.2)',
                  boxShadow: isNightMode
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 4px 12px rgba(234, 88, 12, 0.15)'
                }}
              >
                <div 
                  className="p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    boxShadow: '0 4px 8px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  >
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </div>
                <span 
                  className="text-base sm:text-lg font-medium"
                  style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
                >
                  LeetCode
                </span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.linkedin.com/in/ian-sabado-658828b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 sm:space-x-3 transition-colors group p-3 sm:p-4 rounded-lg sm:rounded-xl"
                style={{
                  background: isNightMode
                    ? 'linear-gradient(135deg, #334155 0%, #475569 100%)'
                    : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
                  border: isNightMode
                    ? '1px solid rgba(148, 163, 184, 0.3)'
                    : '1px solid rgba(234, 88, 12, 0.2)',
                  boxShadow: isNightMode
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 4px 12px rgba(234, 88, 12, 0.15)'
                }}
              >
                <div 
                  className="p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    boxShadow: '0 4px 8px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <span 
                  className="text-base sm:text-lg font-medium"
                  style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}
                >
                  LinkedIn
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <p
          className="text-center text-xs sm:text-sm mt-10 sm:mt-14"
          style={{ color: isNightMode ? '#64748b' : '#94a3b8' }}
        >
          © {new Date().getFullYear()} Mauna Digital LLC. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;