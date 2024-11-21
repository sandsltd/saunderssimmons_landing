'use client'

import AnimatedHero from './AnimatedHero'
import { motion } from 'framer-motion'
import { FaRocket, FaPalette, FaBolt, FaMobile, FaCheck, FaGoogle, FaShieldAlt, FaLock, FaMapMarkerAlt, FaHandshake, FaUmbrella, FaStore, FaHardHat, FaUtensils, FaBriefcase, FaCut, FaShoppingBag, FaPlay, FaPause, FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
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

// Add this near the top with your other interfaces
interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Beautiful Design",
    description: "Stunning, modern websites that make your business stand out from the crowd."
  },
  {
    title: "No Start-Up Costs",
    description: "Get started with £0 upfront. Only pay when you're happy with your website."
  },
  {
    title: "Blazing Fast",
    description: "Lightning-quick loading times that keep your customers engaged."
  },
  {
    title: "Tailored for Mobile",
    description: "Perfect viewing experience on all devices, from phones to desktops."
  }
];

export default function BlockPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle play/pause with proper error handling
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // Create a new video element and load the source
      video.src = "https://saunders-simmons.co.uk/wp-content/uploads/2024/09/jj_mob_testimonial.mov";
      video.load();
      
      // Play the video after loading
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log('Video playing successfully');
          })
          .catch(error => {
            console.error('Error attempting to play video:', error);
            // Try playing muted first (browsers often require this)
            video.muted = true;
            return video.play();
          })
          .then(() => {
            // If muted play works, unmute and try again
            video.muted = false;
            setIsPlaying(true);
          })
          .catch(error => {
            console.error('Final error playing video:', error);
            setIsPlaying(false);
          });
      }
    }
  };

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
                      <FaCheck className="w-5 h-5 text-green-400 shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Add feature note */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-center text-gray-400 text-sm"
          >
            <p>† Premium features available as add-ons to enhance your website experience</p>
          </motion.div>

          {/* Don't see your industry section with enhanced styling and animations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                  Don't See Your Industry?
                </h3>
                
                <div className="max-w-2xl mx-auto">
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Every business is unique, and we love a challenge! 
                    <span className="block mt-2">
                      From local cafes to innovative startups, we've crafted websites that make businesses shine. 
                      Let's work together to create something amazing for yours.
                    </span>
                  </p>
                  
                  <Link 
                    href="#contact"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 
                      px-8 py-4 rounded-xl text-lg font-semibold text-white
                      transition-all duration-300 shadow-lg hover:shadow-blue-500/25 
                      hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5"
                  >
                    Let's Discuss Your Ideas
                    <motion.span 
                      className="group-hover:translate-x-1 transition-transform duration-300"
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
                </div>

                {/* Added decorative elements */}
                <div className="mt-8 flex justify-center gap-4 text-gray-400">
                  <motion.span
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl"
                  >
                    🎨
                  </motion.span>
                  <motion.span
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl"
                  >
                    💡
                  </motion.span>
                  <motion.span
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl"
                  >
                    ✨
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6">JJ Mobile Valeting</h3>
              <p className="text-gray-300 mb-8">
                A complete digital transformation for a local business, resulting in:
              </p>
              <ul className="space-y-4">
                {[
                  "300% increase in online bookings",
                  "First page Google ranking",
                  "Mobile-first design",
                  "Integrated booking system"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <FaCheck className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link 
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
                    px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300"
                >
                  Get Similar Results
                  <motion.span 
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Image/Video Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-gray-700 group"
            >
              {/* Thumbnail with Logo */}
              <Image
                src="/case_study_jj_logo_1.png"
                alt="JJ Mobile Valeting Logo"
                fill
                className={`object-contain p-8 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                priority
              />
              
              {/* Video */}
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                playsInline
                controls={false}
                preload="auto"
                onEnded={() => setIsPlaying(false)}
              />

              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'} transition-opacity duration-300`}
              >
                <div className="bg-blue-500/90 p-4 rounded-full transform transition-transform duration-300 hover:scale-110 hover:bg-blue-600/90">
                  {isPlaying ? (
                    <FaPause className="w-8 h-8 text-white" />
                  ) : (
                    <FaPlay className="w-8 h-8 text-white ml-1" />
                  )}
                </div>
              </button>

              {/* Video Description Overlay */}
              {!isPlaying && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-lg font-semibold">
                    Hear from James about his experience
                  </p>
                  <p className="text-gray-200 text-sm">
                    Click to watch the full testimonial
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 60, // Adjust to match your video duration
                      ease: "linear"
                    }}
                  />
                </div>
              )}
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {localBusinesses.map((business, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors duration-300"
              >
                <div className="h-16 mb-4 relative">
                  <Image
                    src={business.logo}
                    alt={business.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-white">{business.name}</p>
                  <p className="text-sm text-gray-400">{business.location}</p>
                  <div className="text-yellow-400 flex gap-0.5">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-gray-300 italic leading-relaxed">"{business.testimonial}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text mb-4">
              How We Compare
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how our modern approach compares to traditional web agencies. We've revolutionized the way websites are built and maintained.
            </p>
          </motion.div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-blue-500/20 overflow-hidden shadow-xl">
            {/* Table Headers */}
            <div className="grid grid-cols-4 items-center p-6 border-b border-blue-500/20 bg-white/5">
              <div className="font-semibold text-gray-300">Feature</div>
              <div className="col-span-2 text-center font-semibold text-gray-300">Traditional Agency</div>
              <div className="text-right font-semibold text-gray-300">Saunders & Simmons</div>
            </div>

            {[
              {
                feature: "Upfront Costs",
                traditional: "£3000+",
                yours: "£0",
                icon: "💰",
                description: "Start with zero upfront costs"
              },
              {
                feature: "Delivery Time",
                traditional: "4-8 weeks",
                yours: "7 days",
                icon: "⚡",
                description: "Get online faster"
              },
              {
                feature: "Content Writing",
                traditional: "Extra Cost",
                yours: "Included",
                icon: "✍️",
                description: "Professional content writing & stock images included"
              }
            ].map((point, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className={`group grid grid-cols-4 items-center p-8 ${
                  index !== 2 ? 'border-b border-blue-500/20' : ''
                } hover:bg-white/5 transition-colors duration-300`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{point.icon}</span>
                    <span className="font-semibold text-white">{point.feature}</span>
                  </div>
                  <p className="text-sm text-gray-400">{point.description}</p>
                </div>
                <div className="col-span-2 text-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    {point.traditional}
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-400 font-semibold border border-green-500/20">
                    {point.yours}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced disclaimer styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-6 text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
          >
            <p className="text-gray-300 text-sm">
              *Figures based on average UK web agency costs reported by Approved Index, 
              ranging from £2,500 to £6,000 for a basic business website
            </p>
          </motion.div>

          {/* Your existing CTA button */}
          <motion.div className="mt-8 text-center">
            <Link 
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Get Started Today
              <motion.span 
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
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

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/20 p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-2">Just Hosting Package</h3>
              <p className="text-3xl font-bold mb-6">£25/month <span className="text-sm font-normal text-gray-400">ex VAT</span></p>
              <ul className="space-y-4 mb-8">
                {[
                  "Website Hosting",
                  "SSL Certificate",
                  "Regular Backups",
                  "Security Updates",
                  "Technical Support"
                ].map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <FaCheck className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="#contact"
                className="block w-full py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-center transition-colors duration-300"
              >
                Get Started
              </Link>
              <p className="text-sm text-gray-400 text-center mt-4">
                12-month minimum agreement
              </p>
            </motion.div>
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
            {[
              {
                question: "Why are you offering websites for free?",
                answer: "We believe in supporting local businesses. By removing the barrier of high upfront costs, we help small businesses establish their online presence. As your business grows, we're here to support you with additional services like SEO and advanced features when you need them."
              },
              {
                question: "Do you offer SEO services?",
                answer: "Yes! While our free website package includes basic SEO setup, we offer comprehensive SEO services to help boost your online visibility. This includes keyword research, content optimization, local SEO, and regular performance reporting. Get in touch to learn more about our SEO packages."
              },
              {
                question: "What if I already have a website?",
                answer: "No problem at all! We can redesign your existing site with a fresh, modern look and transfer it to our hosting platform. This includes updating your content, improving the user experience, and ensuring your site is mobile-friendly."
              },
              {
                question: "Do you have other packages available?",
                answer: "Yes, we offer custom packages for businesses needing additional features like e-commerce, booking systems, or advanced functionality. Please use the contact form below to discuss your specific requirements, and we'll create a tailored solution for you."
              },
              {
                question: "What about domain names?",
                answer: "We can help you register a new domain name or use your existing one. If you need a new domain, we'll help you choose and register the perfect one. If you already have a domain, we'll assist with pointing it to your new website at no extra charge."
              },
              {
                question: "How long will it take to build my site?",
                answer: "Most sites are ready within 7 days of our initial chat. We handle everything from design to content writing, making the process quick and hassle-free for you."
              }
            ].map((faq, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 p-6 hover:border-blue-500/20 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
          >
            <p className="text-lg mb-4">Have a question? We're just a message away!</p>
            <a 
              href="https://wa.me/447432205615"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              <FaWhatsapp className="w-5 h-5" />
              Message us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

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

interface TrustBadge {
  text: string;
  icon: typeof FaGoogle | typeof FaShieldAlt | typeof FaLock | typeof FaBolt | typeof FaMapMarkerAlt | typeof FaHandshake | typeof FaUmbrella;
  description: string;
}

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

interface Feature {
  title: string;
  description: string;
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

const localBusinesses: LocalBusiness[] = [
  {
    name: "Natalie Mae Hair Extensions",
    location: "Dorset",
    industry: "Beauty & Hair",
    testimonial: "Nick and Dan have been amazing from start to finish. They've created exactly what I wanted and more. The whole process has been so easy and stress free. I couldn't recommend them enough!",
    logo: "/natalie_mae_logo.png"
  },
  {
    name: "Stur Of The Moment",
    location: "Sturminster Newton",
    industry: "Retail",
    testimonial: "Working with Nick and Dan was a pleasure from start to finish. They understood exactly what I wanted and delivered a website that exceeded my expectations.",
    logo: "/stur_moment_logo.png"
  },
  {
    name: "Hobs Bottom Forest School",
    location: "Dorset",
    industry: "Education",
    testimonial: "The website is perfect and exactly what I wanted. Nick and Dan were so helpful throughout the whole process, making everything simple and straightforward.",
    logo: "/hobs_bottom_logo.png"
  },
  {
    name: "Hazelbury Bryan Hedgehog Rescue",
    location: "Hazelbury Bryan",
    industry: "Animal Welfare",
    testimonial: "I went to Nick as I wanted to get together some information about hedgehogs and what to do if you find one during the day. I gave him the remit and in just a few days I had a website. Not only a website but a fantastic, well written and user friendly website. It was like magic. Dan and Nick make it all look so easy.",
    logo: "/hedgehog_rescue_logo.png"
  }
];

const industryTemplates: IndustryTemplate[] = [
  {
    industry: "Restaurants & Pubs",
    icon: FaUtensils,
    description: "Perfect for Somerset's fantastic food scene. Show off your dishes and connect with customers!",
    features: [
      "Online Menu Display",
      "Food & Drink Gallery",
      "Customer Reviews Integration",
      "Table Booking System†",
      "Special Events Calendar†"
    ]
  },
  {
    industry: "Trades & Services",
    icon: FaHardHat,
    description: "Ideal for builders, plumbers, and other trades. Let your work do the talking!",
    features: [
      "Project Gallery",
      "Quick Quote Forms",
      "Service Area Maps",
      "Customer Testimonials",
      "Emergency Contact Forms"
    ]
  },
  {
    industry: "Retail & Shopping",
    icon: FaShoppingBag,
    description: "Perfect for local shops and boutiques. Showcase your products and boost your local presence!",
    features: [
      "Product Galleries",
      "Opening Hours Display",
      "Location Maps",
      "Special Offers Section",
      "Social Media Integration"
    ]
  },
  {
    industry: "Health & Beauty",
    icon: FaCut,
    description: "Ideal for salons, spas, and wellness businesses. Showcase your services beautifully!",
    features: [
      "Service Price Lists",
      "Before/After Gallery",
      "Staff Profiles",
      "Online Booking System†",
      "Gift Voucher System†"
    ]
  }
];

const websiteFeatures = [
  {
    category: "Core Features",
    icon: FaCheck,
    features: [
      "Mobile-First Design",
      "Google Maps Integration",
      "Fast Loading Pages",
      "Contact Forms",
      "Social Media Links",
      "SSL Security"
    ]
  },
  {
    category: "Technical Benefits",
    icon: FaRocket,
    features: [
      "Modern Tech Stack",
      "Regular Backups",
      "99.9% Uptime",
      "CDN Delivery",
      "Image Optimization",
      "Responsive Design"
    ]
  }
];

