'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'

export default function AnimatedHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden" aria-labelledby="hero-heading">
      {/* Enhanced background with particles, gradients and glow effects */}
      <div className="absolute w-full h-full">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/95 to-slate-900" />
        
        {/* Starry background */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:24px_24px] animate-twinkle" />
        
        {/* Purple-blue glow effects */}
        <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-purple-500/30 rounded-full"
          style={{ 
            filter: 'blur(64px)',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          }} 
        />
        <div className="absolute -right-40 top-0 w-80 h-80 bg-blue-500/30 rounded-full"
          style={{ 
            filter: 'blur(64px)',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          }} 
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
      </div>

      {/* Main content - Updated spacing and layout */}
      <motion.div 
        className="max-w-6xl mx-auto text-center px-4 sm:px-6 z-10 flex flex-col min-h-[100svh]"
      >
        {/* Logo - Adjusted position */}
        <div className="absolute top-6 sm:top-8 left-4 sm:left-6">
          <Image
            src="/sands_logo.png"
            alt="Saunders Simmons"
            width={140}
            height={45}
            priority
            className="w-[35px] sm:w-[45px] md:w-[55px] h-auto drop-shadow-xl"
            aria-label="Saunders Simmons Logo"
          />
        </div>

        {/* Main content container - Centered vertically */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Headings section - Reduced spacing */}
          <div className="space-y-2 sm:space-y-3">
            <motion.h1 
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight 
                drop-shadow-2xl [text-shadow:_0_0_40px_rgba(255,255,255,0.15)]"
            >
              Give Your Business
            </motion.h1>
            
            {/* Animated text - Reduced height */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex justify-center items-center min-h-[60px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[120px] 
                overflow-visible my-2 sm:my-4"
              role="heading"
              aria-level={2}
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
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                  lineHeight: '1.2',
                  fontSize: 'clamp(1.5rem, 5vw, 4.5rem)',
                  fontWeight: '800',
                  color: '#93C5FD',
                  letterSpacing: '-0.02em',
                  maxWidth: '95%',
                  margin: '0 auto'
                }}
                aria-live="polite"
              />
            </motion.div>
          </div>

          {/* Description text - Moved closer to heading */}
          <div className="mt-4 sm:mt-6 mb-8 sm:mb-10">
            <h2 className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto space-y-1">
              Get a beautiful website that brings you more customers.
              <span className="block text-blue-300 font-medium">While you focus on what you do best.</span>
              <span className="block">
                <strong className="text-white">No upfront costs</strong>
                <span className="text-gray-300">. Just results.</span>
              </span>
            </h2>
          </div>

          {/* CTA and scroll indicator - Closer to content */}
          <div className="space-y-6">
            {/* CTA Button */}
            <div className="relative w-full max-w-md mx-auto">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-2"
              >
                <Link 
                  href="#contact" 
                  className="flex items-center justify-center gap-3 
                    bg-gradient-to-r from-blue-500 to-blue-600 
                    px-6 py-3 sm:py-4 rounded-xl 
                    text-base sm:text-lg font-semibold text-white
                    transition-all duration-300 
                    shadow-[0_0_25px_rgba(59,130,246,0.5)]
                    hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]
                    hover:from-blue-600 hover:to-blue-700
                    relative overflow-hidden group"
                  aria-label="Get Your Free Website - Worth £3000"
                >
                  <span className="relative z-10">Get Your Free Website</span>
                  <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-lg 
                    text-xs sm:text-sm font-bold relative z-10
                    group-hover:bg-white/25 transition-colors">
                    Worth £3000
                  </span>
                  <motion.span 
                    className="text-lg sm:text-xl relative z-10"
                    animate={{ 
                      y: [-2, 2, -2],
                      rotate: [-5, 5, -5]
                    }}
                    transition={{ 
                      y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    role="img"
                    aria-label="Rocket"
                  >
                    🚀
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Link>
              </motion.div>
            </div>

            {/* Scroll indicator - Simplified */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Link 
                href="#features"
                className="inline-flex flex-col items-center group"
                aria-label="Scroll to features section"
              >
                <span className="text-sm font-medium mb-1 
                  group-hover:text-blue-300 transition-colors">
                  Curious to learn more?
                </span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-blue-400 group-hover:text-blue-300 transition-colors"
                  aria-hidden="true"
                >
                  ↓
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}