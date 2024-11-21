'use client'

import AnimatedHero from './AnimatedHero'
import { motion } from 'framer-motion'
import { FaRocket, FaPalette, FaBolt, FaMobile, FaCheck, FaGoogle, FaShieldAlt, FaLock, FaMapMarkerAlt, FaHandshake, FaUmbrella, FaStore, FaHardHat, FaUtensils, FaBriefcase, FaCut, FaShoppingBag, FaPlay, FaPause, FaWhatsapp, FaChevronDown, FaPhone } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import ContactForm from './ContactForm'


// Add this component near the top of the file
// const FloatingCTA = () => (
//   <div className="fixed bottom-8 right-8 z-50 md:hidden">
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
//     >
//       <FaRocket className="w-4 h-4" />
//       Get Started Free
//     </motion.button>
//   </div>
// )

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

// Keep just one features definition at the top with other interfaces
interface Feature {
  title: string;
  description: string;
  icon: typeof FaPalette | typeof FaRocket | typeof FaBolt | typeof FaMobile;
}

// Single features array with icons included
const features: Feature[] = [
  {
    title: "Beautiful Design",
    description: "Stand out from the crowd with a stunning website that captures your brand's personality and wows your visitors.",
    icon: FaPalette
  },
  {
    title: "Free Website",
    description: "Get a professionally designed website at no cost - you'll only need hosting to keep it running smoothly.",
    icon: FaRocket
  },
  {
    title: "Lightning Fast",
    description: "We build with speed in mind, because nobody likes waiting around! Your visitors get instant access to your content.",
    icon: FaBolt
  },
  {
    title: "Mobile Magic",
    description: "Your website looks fantastic on every device - from smartphones to desktop computers. No squinting required!",
    icon: FaMobile
  }
];

// Add this helper component at the top of the file
const ScrollIndicator = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="text-blue-400 hover:text-blue-300 transition-colors text-center mt-12 mb-4"
  >
    <Link 
      href="#features"
      className="flex flex-col items-center group"
    >
      <span className="text-sm font-medium mb-1 
        group-hover:text-blue-300 transition-colors">
        {text}
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-blue-400 group-hover:text-blue-300 transition-colors"
      >
        <svg 
          className="w-5 h-5" 
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
);

// Add this new component near the top of the file
const AnimatedSection = ({ 
  children, 
  className = "", 
  id 
}: { 
  children: React.ReactNode, 
  className?: string,
  id?: string 
}) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={className}
    id={id}
  >
    {children}
  </motion.section>
);

// Add this container animation variant
const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Add these variants near your other animation definitions
const journeyContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const journeyItemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    transition: {
      duration: 0.1
    }
  },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const numberCircleVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

// Add these new animation variants near your other variants
const checkmarkVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const rocketVariants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Add this near your other components
const Footer = () => (
  <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-blue-500/20">
    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
    
    <div className="relative max-w-6xl mx-auto px-4 py-12">
      {/* Logo Section */}
      <div className="flex justify-center mb-12">
        <Image
          src="/sands_logo.png"
          alt="Saunders Simmons Ltd"
          width={180}
          height={40}
          className="h-8 w-auto"
        />
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            Contact Us
          </h3>
          <a 
            href="tel:03300436608" 
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center justify-center md:justify-start gap-2"
          >
            <FaPhone className="w-4 h-4" />
            03300 436608
          </a>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            Our Office
          </h3>
          <address className="text-gray-400 not-italic">
            Unit 1-2 15 Oxford Road<br />
            Pen Mill Trading Estate<br />
            Yeovil<br />
            BA21 5HR
          </address>
        </div>

        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            Company Details
          </h3>
          <p className="text-gray-400">
            Company Number: 15839557
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-blue-500/20">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Saunders & Simmons. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function BlockPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [activeBadge, setActiveBadge] = useState<number | null>(null);
  const [activeTech, setActiveTech] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
    <>
      {/* Remove this line */}
      {/* <FloatingCTA /> */}
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        <AnimatedHero />
        
        {/* Features Section */}
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Why Choose Us?
            </h2>
            
            <motion.div 
              variants={containerAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemAnimation}
                  className="group p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 
                    transition-[border-color,transform] duration-300 hover:border-blue-500/40"
                  style={{
                    transform: "translateY(0px)",
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    index % 3 === 0 ? 'bg-red-500' : 
                    index % 3 === 1 ? 'bg-blue-500' : 
                    'bg-green-500'
                  }`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Trust Badges - with hover hint */}
        <AnimatedSection className="py-16 px-4 bg-gray-900" id="trust">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-200 mb-2">
              <span className="hidden md:inline">Hover to learn more ✨</span>
              <span className="md:hidden">Tap to learn more ✨</span>
            </h2>
            
            <div className="flex flex-col md:flex-row md:flex-wrap gap-3 mt-8 justify-center">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.text}
                    className="group relative"
                  >
                    <div 
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          setActiveBadge(activeBadge === index ? null : index);
                        }
                      }}
                      className="w-full md:w-[240px] min-h-[88px] text-left p-4 rounded-xl bg-gray-800/50 
                        border border-gray-700/50 backdrop-blur-sm
                        hover:border-blue-500/50 hover:bg-gray-800/80
                        transition-all duration-300 cursor-pointer md:cursor-default"
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Icon className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-200 font-medium text-sm line-clamp-2">
                          {badge.text}
                        </span>
                      </div>
                      
                      {activeBadge === index && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 overflow-hidden"
                        >
                          <p className="text-gray-400 text-sm">
                            {badge.description}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Desktop hover tooltip */}
                    <div className="hidden md:block absolute opacity-0 group-hover:opacity-100 
                      bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 rounded-lg bg-gray-800 
                      border border-gray-700 shadow-xl transition-opacity duration-200
                      pointer-events-none z-10 w-[240px]"
                    >
                      <p className="text-gray-300 text-sm">
                        {badge.description}
                      </p>
                      <div className="absolute bottom-0 left-1/2 -mb-2 -ml-2 w-4 h-4 
                        bg-gray-800 border-b border-r border-gray-700 
                        transform rotate-45"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* After Features Section */}
        <ScrollIndicator text="Keep scrolling - it gets even better" />

        {/* How It Works Section */}
        <AnimatedSection className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-blue-500/5"></div>
          <div className="max-w-6xl mx-auto relative">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Your Website Journey Starts Here
            </h2>
            
            <motion.div 
              variants={journeyContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
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
                  key={index}
                  variants={journeyItemVariants}
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="bg-slate-800/50 rounded-xl border border-gray-700 p-6 
                      hover:border-blue-500/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div 
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={numberCircleVariants}
                        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold"
                      >
                        {step.step}
                      </motion.div>
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-[2px] flex-grow bg-gradient-to-r from-blue-500 to-transparent"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-lg text-gray-300">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="hidden md:block absolute top-1/2 right-0 w-8 h-8 text-blue-500 
                        transform translate-x-1/2 -translate-y-1/2"
                    >
                      →
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Added CTA Button with animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-center"
            >
              <Link 
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 
                  px-6 py-3 rounded-xl text-lg font-semibold text-white
                  transition-all duration-300 shadow-lg hover:shadow-blue-500/25 
                  hover:from-blue-600 hover:to-blue-700"
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
        </AnimatedSection>

        {/* After Trust Badges */}
        <ScrollIndicator text="Take a peek under the hood" />

        {/* Technology Stack Section */}
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Built with Modern Technology
            </h2>
            
            <p className="text-center text-gray-400 mb-16">
              <span className="hidden md:inline">Hover</span>
              <span className="md:hidden">Tap</span>
              {" "}to learn how each technology benefits your business
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {technologies.map((tech: Technology, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setActiveTech(activeTech === index ? null : index);
                    }
                  }}
                  className="relative"
                >
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${tech.color} p-4 md:p-5 
                      flex items-center justify-center mb-3 md:mb-4 border ${tech.border} shadow-lg 
                      transition-all duration-300 ${activeTech === index ? 'scale-95' : ''}`}
                    >
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
                    </div>
                    <p className="text-base md:text-lg font-semibold text-white text-center">{tech.name}</p>
                  </div>

                  {/* Mobile Description */}
                  {activeTech === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm 
                        rounded-xl p-4 shadow-xl border border-gray-700 mx-2 md:mx-0"
                    >
                      <div className="text-white text-sm leading-relaxed">
                        <p>{tech.description}</p>
                      </div>
                      {/* Arrow pointing up */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 
                        bg-slate-800/95 border-l border-t border-gray-700">
                      </div>
                    </motion.div>
                  )}

                  {/* Desktop Hover Card - Hidden on Mobile */}
                  <div className="hidden md:block absolute opacity-0 invisible group-hover:opacity-100 
                    group-hover:visible transition-all duration-300 pointer-events-none
                    bottom-[120%] left-1/2 -translate-x-1/2 w-72 bg-slate-800/95 backdrop-blur-sm 
                    rounded-xl p-4 shadow-xl border border-gray-700 z-[60]"
                  >
                    <div className="text-white text-sm leading-relaxed">
                      <h3 className="font-bold text-lg mb-2">{tech.name}</h3>
                      <p>{tech.description}</p>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 
                      bg-slate-800/95 border-r border-b border-gray-700">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

       

        {/* Everything You Need Section */}
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Everything You Need
            </h2>
            
            <div className="grid md:grid-cols-2 gap-16">
              {websiteFeatures.map((category, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      initial="initial"
                      animate="animate"
                      variants={category.icon === FaRocket ? rocketVariants : checkmarkVariants}
                      className={`${category.icon === FaRocket ? "text-blue-400" : "text-green-400"}
                        p-3 rounded-lg ${category.icon === FaRocket ? "bg-blue-500/10" : "bg-green-500/10"}`}
                    >
                      <category.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-white">{category.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {category.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-2 group"
                      >
                        <motion.div
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true }}
                          variants={category.icon === FaRocket ? rocketVariants : checkmarkVariants}
                          className={`${category.icon === FaRocket ? "text-blue-400" : "text-green-400"}
                            transition-colors duration-200 group-hover:${category.icon === FaRocket ? "text-blue-300" : "text-green-300"}`}
                        >
                          <category.icon className="w-4 h-4" />
                        </motion.div>
                        <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

         {/* After Technologies */}
         <ScrollIndicator text="See how we help businesses like yours" />

        {/* Industry Solutions Section */}
        <AnimatedSection className="py-20 px-4 bg-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Industry Solutions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {industryTemplates.map((template, index) => (
                <div
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
                </div>
              ))}
            </div>

            {/* Add feature note */}
            <div className="mt-6 text-center text-gray-400 text-sm">
              <p>† Premium features available as add-ons to enhance your website experience</p>
            </div>

            {/* Don't see your industry section with enhanced styling and animations */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                  <h3 className="text-3xl font-bold mb-4">
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
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* After Templates */}
        <ScrollIndicator text="Meet some happy local businesses" />

        {/* Case Study Section */}
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-4xl text-center mb-8 md:mb-16 text-white font-bold">
              Recent Success Story
            </h2>

            {/* Changed to flex-col for mobile, grid for larger screens */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              {/* Video Column - Moved to top on mobile */}
              <div className="w-full order-1 md:order-2 relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-gray-700 group">
                {/* Thumbnail with Logo */}
                <Image
                  src="/case_study_jj_logo_1.png"
                  alt="JJ Mobile Valeting Logo"
                  fill
                  className={`object-contain p-6 md:p-8 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
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

                {/* Play/Pause Button - Increased tap target size */}
                <button
                  onClick={handlePlayPause}
                  className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-0 active:opacity-100' : 'opacity-100'} transition-opacity duration-300`}
                >
                  <div className="bg-blue-500/90 p-4 md:p-4 rounded-full transform transition-transform duration-300 active:scale-95 md:hover:scale-110 hover:bg-blue-600/90">
                    {isPlaying ? (
                      <FaPause className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    ) : (
                      <FaPlay className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                    )}
                  </div>
                </button>

                {/* Video Description Overlay - Adjusted padding and text size */}
                {!isPlaying && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                    <p className="text-white text-base md:text-lg font-semibold">
                      Hear from James about his experience
                    </p>
                    <p className="text-gray-200 text-xs md:text-sm">
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
                        duration: 60,
                        ease: "linear"
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Content Column - Moved to bottom on mobile */}
              <div className="order-2 md:order-1 w-full">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">JJ Mobile Valeting</h3>
                <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg">
                  A complete digital transformation for a local business, resulting in:
                </p>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "300% increase in online bookings",
                    "First page Google ranking",
                    "Mobile-first design",
                    "Integrated booking system"
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 md:gap-3"
                    >
                      <FaCheck className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0" />
                      <span className="text-gray-300 text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 md:mt-8">
                  <Link 
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
                      px-4 md:px-6 py-2.5 md:py-3 rounded-lg text-white text-sm md:text-base font-semibold 
                      transition-all duration-300 active:scale-95 md:hover:scale-100"
                  >
                    Get Similar Results
                    <motion.span 
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <ScrollIndicator text="And there's more..." />

        {/* Who We've Worked With Section */}
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Who We've Worked With
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {localBusinesses.map((business, index) => (
                <div
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
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <ScrollIndicator text="See how we compare to traditional agencies" />

        {/* Comparison Section */}
        <AnimatedSection className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text mb-4">
                How We Compare
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
                See how our modern approach compares to traditional web agencies
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-blue-500/20 overflow-hidden shadow-xl">
              {/* Mobile Headers */}
              <div className="md:hidden grid grid-cols-3 p-4 border-b border-blue-500/20">
                <div className="text-gray-300 text-base">Feature</div>
                <div className="text-gray-300 text-base text-center">Traditional<br/>Agency</div>
                <div className="text-gray-300 text-base text-right">Saunders &<br/>Simmons</div>
              </div>

              {/* Comparison Items */}
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
                <div
                  key={index}
                  className={`p-6 ${index !== 2 ? 'border-b border-blue-500/20' : ''}`}
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden grid grid-cols-3 items-start">
                    {/* Feature Column */}
                    <div className="col-span-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{point.icon}</span>
                        <h3 className="text-xl font-semibold text-white">{point.feature}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{point.description}</p>
                    </div>
                    
                    {/* Comparison Values */}
                    <div className="col-span-3 grid grid-cols-3 mt-4">
                      <div className="col-span-1">
                        {/* Empty space for alignment */}
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                          {point.traditional}
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          {point.yours}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-4 md:items-center">
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
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced disclaimer styling */}
            <div className="mt-6 text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <p className="text-gray-300 text-xs md:text-sm">
                *Figures based on average UK web agency costs reported by Approved Index, 
                ranging from £2,500 to £6,000 for a basic business website
              </p>
            </div>

            {/* CTA button */}
            <div className="mt-8 text-center">
              <Link 
                href="#contact"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
                  px-6 py-3 rounded-lg text-white text-sm md:text-base font-semibold 
                  transition-all duration-300 active:scale-95 md:hover:scale-105"
              >
                Get Started Today
                <motion.span 
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <ScrollIndicator text="How much is hosting? Spoiler: Its cheaper than you think! 💰" />

        {/* Pricing Section */}
        <AnimatedSection className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          <div className="max-w-6xl mx-auto relative">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Simple, Transparent Pricing
            </h2>

            <div className="max-w-md mx-auto">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/20 p-8 shadow-xl">
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
              </div>
            </div>
          </div>
        </AnimatedSection>

        <ScrollIndicator text="Take a look at our FAQs! 💬" />
        {/* FAQ Section */}
        <AnimatedSection className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
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
                  key={index}
                  className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden
                    hover:border-blue-500/20 transition-colors duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4"
                  >
                    <h3 className="text-lg md:text-xl font-semibold">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: activeFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 w-6 h-6 flex items-center justify-center 
                        bg-blue-500/10 rounded-full border border-blue-500/20"
                    >
                      <FaChevronDown className="w-3 h-3 text-blue-400" />
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeFaq === index ? 'auto' : 0,
                      opacity: activeFaq === index ? 1 : 0
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut"
                    }}
                    className="overflow-hidden border-t border-gray-700/50"
                  >
                    <p className="p-6 text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-12 text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <p className="text-lg mb-4">Have a question? We're just a message away!</p>
              <a 
                href="https://wa.me/447432205615"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 
                  px-6 py-3 rounded-lg text-white font-semibold 
                  transition-all duration-300 active:scale-95"
              >
                <FaWhatsapp className="w-5 h-5" />
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </AnimatedSection>

                {/* After Testimonials */}
                <ScrollIndicator text="Ready to start? Let's chat! 💬" />

        {/* Contact Form Section */}
        <AnimatedSection className="py-20 px-4" id="contact">
          <div className="max-w-6xl mx-auto">
            <ContactForm />
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </>
  )
}

// Helper function to get feature icons
function getFeatureIcon(title: string) {
  switch (title) {
    case "Beautiful Design":
      return <FaPalette className="w-6 h-6 text-white" />
    case "Free Website":
      return <FaRocket className="w-6 h-6 text-white" />
    case "Lightning Fast":
      return <FaBolt className="w-6 h-6 text-white" />
    case "Mobile Magic":
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
  icon: typeof FaPalette | typeof FaRocket | typeof FaBolt | typeof FaMobile;
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

