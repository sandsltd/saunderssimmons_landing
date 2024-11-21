'use client'

import AnimatedHero from './AnimatedHero'
import { motion } from 'framer-motion'
import { FaRocket, FaPalette, FaBolt, FaMobile, FaCheck, FaClock, FaUsers, FaGoogle, FaShieldAlt, FaLock, FaMapMarkerAlt, FaHandshake, FaUmbrella, FaStore, FaHardHat, FaUtensils, FaBriefcase, FaCut, FaShoppingBag, } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ContactForm from './ContactForm'


// Add this component near the top of the file
const FloatingCTA = () => (
  <div className="fixed bottom-8 right-8 z-50 md:hidden">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
    >
      <FaRocket className="w-4 h-4" />
      Get Started Free
    </motion.button>
  </div>
)

// Add this interface with your other types
interface Technology {
  name: string;
  icon?: string;
  content?: React.ReactNode;
  color: string;
  border: string;
  description: string;
}

// Add interface for trust badges
interface TrustBadge {
  text: string;
  icon: typeof FaGoogle | typeof FaShieldAlt | typeof FaLock | typeof FaBolt | typeof FaMapMarkerAlt | typeof FaHandshake | typeof FaUmbrella;
  description: string;
}

// Add these interfaces
interface LocalBusiness {
  name: string;
  location: string;
  industry: string;
  testimonial: string;
  logo: string;
}

interface IndustryTemplate {
  industry: string;
  icon: typeof FaStore | typeof FaHardHat | typeof FaUtensils | typeof FaBriefcase | typeof FaCut | typeof FaShoppingBag;
  features: string[];
  description: string;
}

interface FeatureCategory {
  category: string;
  icon: typeof FaCheck | typeof FaRocket | typeof FaShieldAlt | typeof FaMobile;
  features: string[];
}

export default function BlockPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = document.getElementById('case-study-video') as HTMLVideoElement
    if (video) {
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => setIsPlaying(false)

      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('ended', handleEnded)

      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <AnimatedHero />
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0 
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 50
                }}
                className="opacity-0 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all hover:-translate-y-2 duration-300"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  index % 3 === 0 ? 'bg-red-500' : 
                  index % 3 === 1 ? 'bg-blue-500' : 
                  'bg-green-500'
                }`}>
                  {getFeatureIcon(feature.title)}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges - with hover hint */}
          <div className="mt-20 w-full">
            <div className="max-w-6xl mx-auto">
              {/* Hover hint text */}
              <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.p 
                  className="text-gray-400 text-sm sm:text-base"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="hidden sm:inline">Hover</span>
                  <span className="sm:hidden">Tap</span>
                  {" "}to learn more ✨
                </motion.p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center text-center">
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="group relative cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                        <Icon className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-300">{badge.text}</span>
                      </div>
                      
                      {/* Info Card */}
                      <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-300 pointer-events-none
                        bottom-[120%] left-1/2 -translate-x-1/2
                        w-72 bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 shadow-xl 
                        border border-gray-700 z-[60]">
                        <div className="text-white text-sm leading-relaxed">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-5 h-5 text-blue-400" />
                            <h3 className="font-bold text-lg">{badge.text}</h3>
                          </div>
                          <p className="text-gray-300">{badge.description}</p>
                        </div>
                        {/* Arrow pointing down */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 
                          bg-slate-800/95 border-r border-b border-gray-700"></div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-blue-500/5"></div>
        <div className="max-w-6xl mx-auto relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Your Website Journey Starts Here
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Quick Chat",
                description: "Drop us a message in our simple form - takes less time than making a cuppa! ☕️"
              },
              {
                step: "2",
                title: "Let's Plan",
                description: "We'll have a friendly chat about your vision and craft the perfect plan together 🎯"
              },
              {
                step: "3",
                title: "Watch the Magic",
                description: "Sit back while we build your dream website. Before you know it, you'll be live! 🚀"
              }
            ].map((step, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 p-6 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                    <div className="h-[2px] flex-grow bg-gradient-to-r from-blue-500 to-transparent"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-lg text-gray-300">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-8 h-8 text-blue-500 transform translate-x-1/2 -translate-y-1/2">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Added CTA Button */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link 
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 
                px-6 py-3 rounded-xl text-lg font-semibold text-white
                transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700"
            >
              Start Your Journey
              <motion.span 
                animate={{ 
                  x: [0, 3, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-6 text-white"
          >
            Built with Modern Technology
          </motion.h2>
          
          <p className="text-center text-gray-400 mb-16">
            <span className="hidden md:inline">Hover</span>
            <span className="md:hidden">Tap</span>
            {" "}to learn how each technology benefits your business
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((tech: Technology, index: number) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="flex flex-col items-center group relative cursor-pointer"
              >
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${tech.color} p-5 flex items-center justify-center mb-4 border ${tech.border} shadow-lg group-hover:scale-105 transition-all duration-300`}>
                  {tech.content ? (
                    tech.content
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={tech.icon!}
                        alt={tech.name}
                        fill
                        className="object-contain filter brightness-0 invert"
                      />
                    </div>
                  )}
                  
                  {/* Info Card */}
                  <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 
                    pointer-events-none
                    bottom-[120%] left-1/2 -translate-x-1/2
                    w-72 bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-700 z-[60]">
                    <div className="text-white text-sm leading-relaxed">
                      <h3 className="font-bold text-lg mb-2">{tech.name}</h3>
                      <p>{tech.description}</p>
                    </div>
                    {/* Arrow pointing down */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-slate-800/95 border-r border-b border-gray-700"></div>
                  </div>
                </div>
                <p className="text-lg font-semibold text-white">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Everything You Need
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {websiteFeatures.map((category, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
              >
                <div className="flex items-center gap-4 mb-8">
                  <category.icon className="w-8 h-8 text-blue-400" />
                  <h3 className="text-2xl font-semibold">{category.category}</h3>
                </div>
                <ul className="grid grid-cols-2 gap-4">
                  {category.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <FaCheck className="w-5 h-5 text-green-400 shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Industry Solutions
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {industryTemplates.map((template, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <template.icon className="w-8 h-8 text-blue-400" />
                  <h3 className="text-2xl font-semibold">{template.industry}</h3>
                </div>
                <p className="text-gray-300 mb-6">{template.description}</p>
                <ul className="space-y-3">
                  {template.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <FaCheck className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Recent Success Story
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">JJ Mobile Valeting</h3>
              <p className="text-gray-300">
                A complete digital transformation for a local business, resulting in:
              </p>
              <ul className="space-y-4">
                {[
                  '300% increase in online bookings',
                  'First page Google ranking',
                  'Mobile-first design',
                  'Integrated booking system'
                ].map((achievement, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-6"
              >
                <Link 
                  href="#contact" 
                  className="inline-block bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:bg-blue-600"
                >
                  Get Similar Results
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden group"
            >
              {/* Video container */}
              <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-all duration-300"></div>
                
                <video 
                  className="w-full h-full object-cover"
                  poster="/sands_logo.png"
                  controls
                  playsInline
                  preload="metadata"
                  controlsList="nodownload"
                  id="case-study-video"
                >
                  <source 
                    src="https://saunders-simmons.co.uk/wp-content/uploads/2024/09/jj_mob_testimonial.mov"
                    type="video/quicktime"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Custom play/pause button */}
                <div 
                  onClick={() => {
                    const video = document.getElementById('case-study-video') as HTMLVideoElement;
                    if (video) {
                      if (isPlaying) {
                        video.pause();
                      } else {
                        video.play();
                      }
                    }
                  }}
                  className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer ${!isPlaying ? 'inset-0 flex items-center justify-center' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'backdrop-blur-sm' : 'w-16 h-16 bg-blue-500/90'}`}>
                    {isPlaying ? (
                      <svg 
                        className="w-6 h-6 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg 
                        className="w-8 h-8 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We've Worked With Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Who We've Worked With
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localBusinesses.map((business, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <Image
                  src={business.logo}
                  alt={business.name}
                  width={120}
                  height={40}
                  className="mb-4"
                />
                <p className="text-lg font-semibold mb-1">{business.name}</p>
                <p className="text-sm text-gray-400 mb-4">{business.location}</p>
                <p className="text-gray-300 italic">"{business.testimonial}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-500/5"></div>
        <div className="max-w-6xl mx-auto relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            What Our Clients Say
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 p-8 relative">
                  {/* Quote mark decoration */}
                  <div className="absolute -top-4 -left-4">
                    <div className={`w-8 h-8 rounded-full ${
                      index % 2 === 0 ? 'bg-blue-500' : 'bg-red-500'
                    } flex items-center justify-center`}>
                      "
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg mb-6">{testimonial.quote}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{testimonial.author}</p>
                      <p className="text-gray-400 text-sm">{testimonial.date}</p>
                    </div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-blue-500/5"></div>
        <div className="max-w-4xl mx-auto relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            How We Compare
          </motion.h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden">
            {comparisonPoints.map((point, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className={`grid grid-cols-3 p-6 ${index !== comparisonPoints.length - 1 ? 'border-b border-gray-700' : ''}`}
              >
                <div className="font-semibold">{point.feature}</div>
                <div className="text-gray-400">{point.traditional}</div>
                <div className="text-green-400 font-semibold">{point.yours}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-green-500/5"></div>
        <div className="max-w-6xl mx-auto relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className={`relative bg-white/5 backdrop-blur-lg rounded-xl border ${pkg.popular ? 'border-blue-500' : 'border-gray-700'} p-8`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <p className="text-3xl font-bold mb-6">{pkg.price}</p>
                <ul className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <FaCheck className="w-5 h-5 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-8 py-4 rounded-lg font-semibold ${pkg.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 hover:bg-white/20'}`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 p-6"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Let's Get Started
          </motion.h2>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
const features = [
  {
    title: "Beautiful Design",
    description: "Your website will be crafted with care using the latest in modern web design. Sleek, speedy, and mobile-friendly."
  },
  {
    title: "No Start-Up Costs",
    description: "Say goodbye to big upfront payments. We believe in helping small businesses get online without breaking the bank."
  },
  {
    title: "Blazing Fast",
    description: "We build on Next.js, ensuring your site loads faster than you can say 'search engine rankings.'"
  },
  {
    title: "Tailored for Mobile",
    description: "Over 60% of web traffic is on mobile, so we optimise your site to look flawless on any device."
  }
]

const testimonials = [
  {
    quote: "These guys built my website so well and fast that I was shocked. Literally helped so much for business. 5⭐️",
    author: "Sheldon Jones",
    date: "June 2024"
  },
  {
    quote: "I'm so thrilled with the website tailor-made for me! Nick and Dan have been approachable, flexible, and creative throughout. Highly recommend.",
    author: "Emily Stiles",
    date: "May 2024"
  }
]

const steps = [
  "Fill in our quick form — it only takes 2 minutes!",
  "We'll reach out to learn more about your vision.",
  "Your free website will be ready in no time!"
]

const faqs = [
  {
    question: "Is it really free to get started?",
    answer: "Absolutely! We only charge for hosting once your website is live."
  },
  {
    question: "What's included in the hosting fee?",
    answer: "Hosting, security, regular backups, and ongoing support to keep your site running smoothly."
  },
  {
    question: "How long will it take to build my site?",
    answer: "Most sites are ready in just 7 days after our initial chat."
  }
]

const packages = [
  {
    name: "Basic",
    price: "£29/month",
    features: [
      "5-Page Website",
      "Mobile Responsive",
      "Basic SEO",
      "Contact Form",
      "Monthly Updates"
    ]
  },
  {
    name: "Professional",
    price: "£49/month",
    popular: true,
    features: [
      "10-Page Website",
      "Advanced SEO",
      "Blog Integration",
      "Social Media Integration",
      "Weekly Updates",
      "Analytics Dashboard"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited Pages",
      "E-commerce Integration",
      "Custom Features",
      "Priority Support",
      "Daily Updates",
      "Custom Analytics"
    ]
  }
]

// Helper function to get feature icons
function getFeatureIcon(title: string) {
  switch (title) {
    case "Beautiful Design":
      return <FaPalette className="w-6 h-6 text-white" />
    case "No Start-Up Costs":
      return <FaRocket className="w-6 h-6 text-white" />
    case "Blazing Fast":
      return <FaBolt className="w-6 h-6 text-white" />
    case "Tailored for Mobile":
      return <FaMobile className="w-6 h-6 text-white" />
    default:
      return null
  }
}

interface FormStep {
  question: string;
  type: 'text' | 'email' | 'radio' | 'textarea';
  options?: string[];
  placeholder?: string;
}

const trustBadges: TrustBadge[] = [
  {
    text: "5-Star Rated on Google",
    icon: FaGoogle,
    description: "We're chuffed to bits with our 5-star Google reviews! Our happy customers love what we do, and we think you will too. Pop over to Google to see what they're saying about us."
  },
  {
    text: "GDPR Compliant",
    icon: FaShieldAlt,
    description: "Your data's safe as houses with us! We follow all the proper GDPR guidelines, so you can rest easy knowing your information is in good hands. No funny business here!"
  },
  {
    text: "Secure Payments",
    icon: FaLock,
    description: "When it comes to payments, we don't mess about. We use top-notch secure payment systems, so you can focus on running your business while we handle the technical bits."
  },
  {
    text: "Fast Response Time",
    icon: FaBolt,
    description: "Need a hand? We're quick off the mark! No waiting around for days - we'll get back to you in hours. Because nobody likes to be kept hanging, right?"
  },
  {
    text: "Based in Somerset, England",
    icon: FaMapMarkerAlt,
    description: "Proudly Somerset born and bred! We love a good chin-wag over a cuppa, so pop by for a face-to-face chat about your website. We know our local business community inside out!"
  },
  {
    text: "Fully Insured",
    icon: FaUmbrella,
    description: "Belt and braces, that's us! We're fully covered with Professional Indemnity and Public Liability insurance. Not that you'll need it, but isn't it nice to know it's there?"
  },
  {
    text: "Community Focused",
    icon: FaHandshake,
    description: "We're big on giving back to our lovely Somerset community. From local charities to community groups, we love helping out with discounted rates and even free websites. Because that's what neighbours do!"
  }
];

const comparisonPoints = [
  {
    feature: "Upfront Costs",
    traditional: "£3000+",
    yours: "£0"
  },
  {
    feature: "Delivery Time",
    traditional: "4-8 weeks",
    yours: "7 days"
  },
  {
    feature: "Ongoing Updates",
    traditional: "Extra Cost",
    yours: "Included"
  }
]

// Add this constant with your other constants
const technologies: Technology[] = [
  { 
    name: "Next.js", 
    icon: "/nextjs-icon.svg", 
    color: "from-black to-gray-800",
    border: "border-gray-700",
    description: "Next.js ensures your website loads instantly and ranks higher on Google. This means more visitors find your business and have a better experience, leading to higher conversion rates."
  },
  { 
    name: "React", 
    icon: "/react-icon.svg", 
    color: "from-blue-500 to-blue-600",
    border: "border-blue-400",
    description: "Built with the same technology that powers Facebook, React makes your website incredibly responsive and smooth. Updates happen instantly, keeping your customers engaged and improving their experience."
  },
  { 
    name: "Tailwind CSS", 
    icon: "/tailwind-icon.svg", 
    color: "from-cyan-500 to-cyan-600",
    border: "border-cyan-400",
    description: "Tailwind CSS ensures your website looks professional on all devices while keeping load times minimal. This means better mobile performance and higher engagement from your customers."
  },
  { 
    name: "TypeScript", 
    content: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="100%" height="100%" rx="6" fill="white"/>
        <path fill="#007ACC" d="M22.67 47h99.67v73.67H22.67z"/>
        <path data-name="original" fill="#fff" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"/>
      </svg>
    ),
    color: "from-blue-600 to-blue-700",
    border: "border-blue-500",
    description: "TypeScript makes your website more reliable and secure. This means fewer errors, better performance, and a consistently smooth experience for your customers."
  }
];

// Add these constants
const localBusinesses: LocalBusiness[] = [
  {
    name: "The Cottage Trading Co",
    location: "Castle Cary",
    industry: "Retail",
    testimonial: "Our online shop has transformed our business. We're now reaching customers well beyond Somerset!",
    logo: "/logos/cottage-trading.svg"
  },
  {
    name: "The Railway Inn",
    location: "Frome",
    industry: "Hospitality",
    testimonial: "Table bookings have gone through the roof since getting our new website. Proper job!",
    logo: "/logos/railway-inn.svg"
  }
  // Add more local businesses
];

const industryTemplates: IndustryTemplate[] = [
  {
    industry: "Restaurants & Pubs",
    icon: FaUtensils,
    features: [
      "Online Menu Management",
      "Table Booking System",
      "Food & Drink Gallery",
      "Special Events Calendar",
      "Customer Reviews Integration"
    ],
    description: "Perfect for Somerset's fantastic food scene. Show off your dishes and make bookings a breeze!"
  },
  {
    industry: "Trades & Services",
    icon: FaHardHat,
    features: [
      "Project Gallery",
      "Quick Quote Forms",
      "Service Area Maps",
      "Customer Testimonials",
      "Emergency Contact Forms"
    ],
    description: "Ideal for builders, plumbers, and other trades. Let your work do the talking!"
  }
];

const websiteFeatures: FeatureCategory[] = [
  {
    category: "Core Features",
    icon: FaCheck,
    features: [
      "Mobile-First Design",
      "Contact Forms",
      "Google Maps",
      "Social Media Links",
      "Fast Loading Pages",
      "SSL Security"
    ]
  },
  {
    category: "Business Growth",
    icon: FaRocket,
    features: [
      "SEO Optimisation",
      "Google Analytics",
      "Content Management",
      "Regular Backups",
      "Performance Reports"
    ]
  }
];

