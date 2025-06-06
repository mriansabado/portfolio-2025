const Feature = () => {
  return (
    <section className='py-12 sm:py-16 md:py-24 relative'>
      <div className='absolute inset-0 bg-[url("/src/assets/wavy-bg.jpg")] bg-cover bg-center opacity-40'></div>
      <div className='container mx-auto px-2 sm:px-6 relative z-10'>
        <div className='text-center mb-12 sm:mb-16 md:mb-20'>
          <h2 className='text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6 sm:mb-8 animate-fade-in'>
            What I Do
          </h2>
          <div className='h-1 w-24 sm:w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-fade-in'></div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto'>
          {/* Feature Cards */}
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 animate-slide-up'>
            <div className='flex flex-col h-full'>
              <h3 className='text-xl sm:text-2xl font-semibold text-white mb-4'>
                Front-end Development
              </h3>
              <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
                Building responsive, cross-browser compatible interfaces using React, Vue.js, TypeScript, and modern CSS frameworks like TailwindCSS              </p>
            </div>
          </div>
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 animate-slide-up delay-100'>
            <div className='flex flex-col h-full'>
              <h3 className='text-xl sm:text-2xl font-semibold text-white mb-4'>
                UI/UX Design
              </h3>
              <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
                Creating intuitive and beautiful user experiences with a focus on modern design principles and cross-browser compatibility              </p>
            </div>
          </div>

          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 animate-slide-up delay-200'>
            <div className='flex flex-col h-full'>
              <h3 className='text-xl sm:text-2xl font-semibold text-white mb-4'>
                Architecture
              </h3>
              <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
                Building applications for the cloud using AWS services like Lambda, S3, and Amplify that scale efficiently and stay maintainable              </p>
            </div>
          </div>

          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 animate-slide-up delay-300'>
            <div className='flex flex-col h-full'>
              <h3 className='text-xl sm:text-2xl font-semibold text-white mb-4'>
                Full Stack Development
              </h3>
              <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
                Building full-stack solutions with MVC architecture patterns and database integration for complete web applications              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;