'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'

export default function AnimatedHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden">
      {/* Enhanced background with subtle animation */}
      <div className="absolute w-full h-full bg-gradient-to-b from-slate-900 via-slate-800/95 to-slate-900">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:24px_24px]">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
        </div>
      </div>

      {/* Logo Section with enhanced positioning */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20"
      >
        <Image
          src="/sands_logo.png"
          alt="Saunders Simmons"
          width={140}
          height={45}
          priority
          className="w-[35px] sm:w-[50px] md:w-[60px] h-auto drop-shadow-lg"
        />
      </motion.div>

      {/* Main content with improved spacing and animations */}
      <motion.div 
        className="max-w-6xl mx-auto text-center px-3 sm:px-4 z-10 flex flex-col min-h-[100svh] justify-between 
          pt-16 sm:pt-20 md:pt-24 pb-2 sm:pb-4"
      >
        <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8">
          {/* Main heading and animated text section */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            >
              Give Your Business
            </motion.h1>
            
            {/* Animated text - fixed container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex justify-center items-center h-[60px] sm:h-[80px] md:h-[120px] lg:h-[160px] overflow-visible"
            >
              <TypeAnimation
              sequence={[
                'More Customers',
                2000,
                'A Strong First Impression',
                2000,
                'A Local Advantage',
                2000,
                'Better Visibility',
                2000,
                '24/7 Availability',
                2000,
                'A Way to Be Found',
                2000,
                'A Competitive Edge',
                2000,
                'More Bookings',
                2000,
                'A Space to Shine',
                2000,
                'Trust and Credibility',
                2000,
                'Stronger Connections',
                2000,
                'A Voice in Your Community',
                2000,
                'More Leads, More Sales',
                2000,
                'A Platform for Growth',
                2000,
                'More Word-of-Mouth Referrals',
                2000,
                'A Professional Reputation',
                2000,
                'Customer Confidence',
                2000,
                'A Way to Tell Your Story',
                2000,
                'A Local Presence Online',
                2000,
                'A Step Towards Success',
                2000,
              ]}

                wrapper="span"
                repeat={Infinity}
                speed={40}
                style={{ 
                  display: 'inline-block',
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                  lineHeight: '1.1',
                  fontSize: 'clamp(1.875rem, 8vw, 6rem)',
                  fontWeight: '800',
                  color: '#60A5FA'
                }}
              />
            </motion.div>
          </div>

          {/* Description text - fixed structure */}
          <div className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto space-y-1 sm:space-y-2">
            <p>Get a beautiful website that brings you more customers.</p>
            <p className="text-blue-400 font-medium">While you focus on what you do best.</p>
            <p>
              <span className="font-bold text-white">No upfront costs</span>
              <span className="text-gray-300">. Just results.</span>
            </p>
          </div>

          {/* Benefits section with enhanced styling */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="space-y-1.5 sm:space-y-2">
              {[
                {
                  text: "Attract More Customers",
                  icon: "🎯",
                  color: "from-blue-600/20 to-blue-700/20",
                  borderColor: "border-blue-500/20"
                },
                {
                  text: "Focus On What You Love",
                  icon: "💪",
                  color: "from-purple-600/20 to-purple-700/20",
                  borderColor: "border-purple-500/20"
                },
                {
                  text: "Stand Out From The Crowd",
                  icon: "✨",
                  color: "from-red-600/20 to-red-700/20",
                  borderColor: "border-red-500/20"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-2 sm:gap-3 bg-gradient-to-r ${benefit.color} 
                    rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-gray-100 hover:scale-102 transition-all duration-300
                    border ${benefit.borderColor} shadow-lg backdrop-blur-sm`}
                >
                  <span className="text-xl sm:text-2xl">{benefit.icon}</span>
                  <span className="font-medium text-sm sm:text-base md:text-lg">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section with enhanced design */}
        <div className="relative w-full max-w-md mx-auto space-y-2 sm:space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-2"
          >
            <Link 
              href="#contact" 
              className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500 to-blue-600 
                px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-xl font-semibold text-white
                transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700"
            >
              <span>Get Your Free Website</span>
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-lg text-xs sm:text-sm font-bold">Worth £3000</span>
              <motion.span 
                className="text-lg sm:text-xl"
                animate={{ 
                  y: [-3, 3, -3],
                  rotate: [-10, 10, -10]
                }}
                transition={{ 
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                🚀
              </motion.span>
            </Link>
          </motion.div>

          {/* Enhanced scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-blue-400 hover:text-blue-300 transition-colors pb-1"
          >
            <Link 
              href="#features"
              className="flex flex-col items-center group"
            >
              <span className="text-xs sm:text-sm font-medium mb-1">Curious to learn more?</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}