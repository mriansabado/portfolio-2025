import React from 'react';

const Feature = () => {
    return (
      <section className='py-24 bg-black'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl font-bold text-white tracking-tighter mb-12 text-center'>
            What I Do
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {/* Feature Cards */}
            <div className='bg-gray-900 rounded-xl p-6'>
              <h3 className='text-xl font-semibold text-white mb-3'>Front-end Development</h3>
              <p className='text-gray-400'>Building responsive, performant user interfaces with modern frameworks</p>
            </div>
            <div className='bg-gray-900 rounded-xl p-6'>
              <h3 className='text-xl font-semibold text-white mb-3'>UI/UX Design</h3>
              <p className='text-gray-400'>Creating intuitive and beautiful user experiences</p>
            </div>
            <div className='bg-gray-900 rounded-xl p-6'>
              <h3 className='text-xl font-semibold text-white mb-3'>Architecture</h3>
              <p className='text-gray-400'>Designing scalable and maintainable application structures</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Feature
