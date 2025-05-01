import React from 'react';

const Feature = () => {
  return (
    <section className='py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-end mb-12'>
          <h2 className='text-4xl md:text-6xl font-bold text-white tracking-tighter'>
            What I Do
          </h2>
          <div className='h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mt-4'></div>
        </div>
        
        <div className='grid md:grid-cols-2 gap-8 max-w-5xl ml-auto'>
          {/* Feature Cards */}
          <div className='group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-gray-700'>
            <div className='flex flex-col h-full'>
              <h3 className='text-2xl font-semibold text-white mb-4 group-hover:text-purple-400 transition-colors'>
                Front-end Development
              </h3>
              <p className='text-gray-400 text-lg'>
                Building responsive, performant user interfaces with modern frameworks like React, Next.js, and TailwindCSS
              </p>
            </div>
          </div>

          <div className='group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-gray-700'>
            <div className='flex flex-col h-full'>
              <h3 className='text-2xl font-semibold text-white mb-4 group-hover:text-pink-400 transition-colors'>
                UI/UX Design
              </h3>
              <p className='text-gray-400 text-lg'>
                Creating intuitive and beautiful user experiences with a focus on modern design principles and accessibility
              </p>
            </div>
          </div>

          <div className='group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-gray-700'>
            <div className='flex flex-col h-full'>
              <h3 className='text-2xl font-semibold text-white mb-4 group-hover:text-purple-400 transition-colors'>
                Architecture
              </h3>
              <p className='text-gray-400 text-lg'>
                Designing scalable and maintainable application structures with modern best practices
              </p>
            </div>
          </div>

          <div className='group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-gray-700'>
            <div className='flex flex-col h-full'>
              <h3 className='text-2xl font-semibold text-white mb-4 group-hover:text-pink-400 transition-colors'>
                Full Stack Development
              </h3>
              <p className='text-gray-400 text-lg'>
                Implementing end-to-end solutions with modern backend technologies and databases
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature; 