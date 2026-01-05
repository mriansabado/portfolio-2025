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
                AI Integration & Automation
              </h3>
                <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
                  Implementing AI-powered features using OpenAI and Anthropic APIs, building intelligent workflows that automate processes and reduce manual effort
                </p>
            </div>
          </div>
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 animate-slide-up delay-100'>
            <div className='flex flex-col h-full'>
              <h3 className='text-xl sm:text-2xl font-semibold text-white mb-4'>
                Full-Stack Development
              </h3>
              <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
                Building production applications with React, TypeScript, Python, Django, and Node.js, creating seamless integrations from frontend to backend
              </p>
            </div>
          </div>

          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 animate-slide-up delay-200'>
            <div className='flex flex-col h-full'>
              <h3 className='text-xl sm:text-2xl font-semibold text-white mb-4'>
                Cloud & Serverless Architecture
              </h3>
              <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
                Deploying scalable, serverless solutions on AWS (Lambda, S3, API Gateway, CloudFront) that deliver measurable business value while optimizing costs
              </p>
            </div>
          </div>

          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 animate-slide-up delay-300'>
            <div className='flex flex-col h-full'>
              <h3 className='text-xl sm:text-2xl font-semibold text-white mb-4'>
                Mobile & Cross-Platform
              </h3>
              <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
                Developing native and cross-platform mobile applications with React Native, Swift, and SwiftUI, delivering seamless experiences across iOS and Android
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;