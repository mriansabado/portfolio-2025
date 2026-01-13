import { motion } from 'framer-motion';

const Feature = () => {
  const features = [
    {
      title: "AI Integration & Automation",
      description: "Implementing AI-powered features using OpenAI and Anthropic APIs, building intelligent workflows that automate processes and reduce manual effort",
      gradient: "from-orange-100 to-yellow-50",
      borderColor: "rgba(234, 88, 12, 0.2)"
    },
    {
      title: "Full-Stack Development",
      description: "Building production applications with React, TypeScript, Python, Django, and Node.js, creating seamless integrations from frontend to backend",
      gradient: "from-pink-100 to-rose-50",
      borderColor: "rgba(236, 72, 153, 0.2)"
    },
    {
      title: "Cloud & Serverless Architecture",
      description: "Deploying scalable, serverless solutions on AWS (Lambda, S3, API Gateway, CloudFront) that deliver measurable business value while optimizing costs",
      gradient: "from-blue-100 to-cyan-50",
      borderColor: "rgba(59, 130, 246, 0.2)"
    },
    {
      title: "Mobile & Cross-Platform",
      description: "Developing native and cross-platform mobile applications with React Native, Swift, and SwiftUI, delivering seamless experiences across iOS and Android",
      gradient: "from-green-100 to-emerald-50",
      borderColor: "rgba(34, 197, 94, 0.2)"
    }
  ];

  return (
    <section 
      className='py-12 sm:py-16 md:py-24 relative'
      style={{
        background: 'linear-gradient(to bottom, #fff9f0, #fef3e2)'
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-orange-200/10 via-yellow-100/5 to-pink-200/10'></div>
      <div className='container mx-auto px-2 sm:px-6 relative z-10'>
        <motion.div 
          className='text-center mb-12 sm:mb-16 md:mb-20'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className='text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-6 sm:mb-8'
            style={{ 
              color: '#1a1a1a',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            What I Do
          </h2>
          <div 
            className='h-1 w-24 sm:w-32 mx-auto rounded-full'
            style={{
              background: 'linear-gradient(to right, #ea580c, #f97316, #fb923c)',
              boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)'
            }}
          ></div>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl p-5 sm:p-8`}
              style={{
                border: `2px solid ${feature.borderColor}`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 3,
                rotateX: 2,
                z: 20,
                boxShadow: '0 16px 48px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.15)'
              }}
            >
              <div className='flex flex-col h-full'>
                <h3 
                  className='text-xl sm:text-2xl font-semibold mb-4'
                  style={{ color: '#1a1a1a' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className='text-base sm:text-lg leading-relaxed'
                  style={{ color: '#4a4a4a' }}
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