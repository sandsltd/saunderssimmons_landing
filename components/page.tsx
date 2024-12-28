'use client'

import AnimatedHero from './AnimatedHero'
import { motion } from 'framer-motion'
import { FaRocket, FaPalette, FaBolt, FaMobile, FaCheck, FaGoogle, FaShieldAlt, FaLock, FaMapMarkerAlt, FaHandshake, FaUmbrella, FaStore, FaHardHat, FaUtensils, FaBriefcase, FaCut, FaShoppingBag, FaWhatsapp, FaChevronDown, FaPhone, FaExternalLinkAlt, FaSearch, FaPause, FaPlay } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import ContactForm from './ContactForm'



// Add interfaces at the top
interface TrustBadge {
  text: string;
  icon: typeof FaGoogle | typeof FaShieldAlt | typeof FaLock | typeof FaBolt | typeof FaMapMarkerAlt | typeof FaHandshake | typeof FaUmbrella;
  description: string;
}

interface Technology {
  name: string;
  icon?: string;
  content?: React.ReactNode;
  color: string;
  border: string;
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

// Add the data arrays
const trustBadges: TrustBadge[] = [
  {
    text: "5-Star Rated on Google",
    icon: FaGoogle,
    description: "We're chuffed to bits with our 5-star Google reviews! Our happy customers love what we do, and we think you will too."
  },
  // ... add other trust badges
];

const technologies: Technology[] = [
  {
    name: "Next.js",
    icon: "/nextjs-icon.svg",
    color: "from-black to-gray-800",
    border: "border-gray-700",
    description: "Next.js ensures your website loads instantly and ranks higher on Google."
  },
  // ... add other technologies
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
  // ... add other features
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
  // ... add other templates
];

const localBusinesses: LocalBusiness[] = [
  {
    name: "Natalie Mae Hair Extensions",
    location: "Dorset",
    industry: "Beauty & Hair",
    testimonial: "Nick and Dan have been amazing from start to finish. They've created exactly what I wanted and more.",
    logo: "/natalie_mae_logo.png"
  },
  // ... add other businesses
];

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
    <div className="flex flex-col items-center group">
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
          role="presentation"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </div>
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
          className="h-20 w-auto"
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
  const [activeBadge, setActiveBadge] = useState<number | null>(null);
  const [activeTech, setActiveTech] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Add useEffect to preload video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = "https://saunders-simmons.co.uk/wp-content/uploads/2024/09/jj_mob_testimonial.mov";
      videoRef.current.load();
    }
  }, []);

  // Update handlePlayPause to remove the source setting
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
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
                    <feature.icon className="w-6 h-6 text-white" role="presentation" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Success Story Section */}
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Recent Success Story
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text Column */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  JJ Mobile Valeting
                </h3>
                <h4 className="text-gray-400 text-lg mb-8">
                  A complete digital transformation for a local business, resulting in:
                </h4>
                <div className="space-y-4">
                  {[
                    "300% increase in online bookings",
                    "First page Google ranking",
                    "Mobile-first design",
                    "Integrated booking system"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1 shrink-0">
                        <FaCheck className="w-3 h-3 text-green-400" role="presentation" aria-hidden="true" />
                      </div>
                      <p className="text-gray-300 text-lg">{feature}</p>
                    </div>
                  ))}
                </div>

                <Link 
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
                    px-6 py-3 rounded-lg text-white font-semibold mt-8
                    transition-all duration-300"
                >
                  Get Similar Results
                  <span className="text-xl">→</span>
                </Link>
              </div>

              {/* Video Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative aspect-video bg-gray-950 rounded-xl overflow-hidden border border-gray-800 shadow-2xl"
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
                  <div className="bg-blue-500 p-4 rounded-full transform transition-transform duration-300 hover:scale-110 hover:bg-blue-600">
                    {isPlaying ? (
                      <FaPause className="w-8 h-8 text-white" role="presentation" aria-hidden="true" />
                    ) : (
                      <FaPlay className="w-8 h-8 text-white ml-1" role="presentation" aria-hidden="true" />
                    )}
                  </div>
                </button>

                {/* Video Description Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                    <h4 className="text-white text-xl font-semibold">
                      Hear from James about his experience
                    </h4>
                    <p className="text-gray-300 text-sm">
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
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Trust Badges - with hover hint */}
        <AnimatedSection className="py-16 px-4 bg-gray-950" id="trust">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-200 mb-2">
              <span className="hidden md:inline">Hover to learn more ✨</span>
              <span className="md:hidden">Tap to learn more ✨</span>
            </h2>
            
            <div className="flex flex-col md:flex-row md:flex-wrap gap-3 mt-8 justify-center">
              {trustBadges.map((badge: TrustBadge, index: number) => {
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
                        <Icon className="w-5 h-5 text-blue-400" role="presentation" aria-hidden="true" />
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
                      bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 rounded-lg bg-gray-950 
                      border border-gray-700 shadow-xl transition-opacity duration-200
                      pointer-events-none z-10 w-[240px]"
                    >
                      <p className="text-gray-200 text-sm">
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
                        role="heading"
                        aria-level={3}
                        aria-label={`Step ${index + 1}`}
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
                  className="relative group"
                >
                  <div className="flex flex-col items-center">
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
                      className="md:hidden absolute z-50 left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm 
                        rounded-xl p-4 shadow-xl border border-gray-700 mx-2"
                    >
                      <div className="text-white text-sm leading-relaxed">
                        <p>{tech.description}</p>
                      </div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 
                        bg-slate-800/95 border-l border-t border-gray-700">
                      </div>
                    </motion.div>
                  )}

                  {/* Desktop Hover Card */}
                  <div className="hidden md:block opacity-0 invisible group-hover:opacity-100 
                    group-hover:visible transition-all duration-300
                    absolute bottom-full left-1/2 -translate-x-1/2 w-72 bg-slate-800/95 backdrop-blur-sm 
                    rounded-xl p-4 shadow-xl border border-gray-700 z-50 mb-4 pointer-events-none"
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
              {websiteFeatures.map((category: { category: string; icon: any; features: string[] }, index: number) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      initial="initial"
                      animate="animate"
                      variants={category.icon === FaRocket ? rocketVariants : checkmarkVariants}
                      className={`${category.icon === FaRocket ? "text-blue-400" : "text-green-400"}
                        p-3 rounded-lg ${category.icon === FaRocket ? "bg-blue-500/10" : "bg-green-500/10"}`}
                    >
                      <category.icon className="w-8 h-8" role="presentation" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-white">{category.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {category.features.map((feature: string, featureIndex: number) => (
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
                          <FaCheck className="w-4 h-4" role="presentation" aria-hidden="true" />
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
              {industryTemplates.map((template: IndustryTemplate, index: number) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <template.icon className="w-8 h-8 text-blue-400" role="presentation" aria-hidden="true" />
                    <h3 className="text-2xl font-semibold">{template.industry}</h3>
                  </div>
                  <p className="text-gray-300 mb-6">{template.description}</p>
                  <ul className="space-y-3">
                    {template.features.map((feature: string, fIndex: number) => (
                      <li key={fIndex} className="flex items-center gap-2">
                        <FaCheck className="w-5 h-5 text-green-400 shrink-0" role="presentation" aria-hidden="true" />
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
                  <div className="mt-8 flex justify-center gap-4 text-gray-400" aria-hidden="true">
                    <span 
                      className="text-3xl" 
                      role="presentation" 
                      aria-hidden="true"
                    >💰</span>
                    <span 
                      className="text-3xl" 
                      role="presentation" 
                      aria-hidden="true"
                    >⚡</span>
                    <span 
                      className="text-3xl" 
                      role="presentation" 
                      aria-hidden="true"
                    >✍️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* After Templates */}
        <ScrollIndicator text="Meet some happy local businesses" />

        {/* Who We've Worked With Section */}
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Who We've Worked With
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {localBusinesses.map((business: LocalBusiness, index: number) => (
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
                    <h4 className="text-lg font-semibold text-white">{business.name}</h4>
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

        <ScrollIndicator text="Check out our latest project! ✨" />

        {/* Showcase Project Section - Moved here */}
        <AnimatedSection className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Featured Project
            </h2>
            
            <p className="text-center text-gray-400 mb-16">
              Take a look at one of our recent projects
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Preview Section */}
              <div className="relative group">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-700">
                  <Image
                    src="/website_example.png"
                    alt="Diamond Vision Website Preview"
                    fill
                    className="object-cover"
                  />
                  {/* Hover Overlay - Updated z-index and pointer-events */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <a 
                        href="https://www.diamondvisioncleaning.co.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white font-medium relative z-20"
                      >
                        Visit Website <FaExternalLinkAlt className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {[
                    { icon: <FaBolt />, label: "Performance", value: "98%" },
                    { icon: <FaMobile />, label: "Mobile Score", value: "100%" },
                    { icon: <FaSearch />, label: "SEO Score", value: "100%" },
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-gray-700
                        hover:border-blue-500/40 transition-colors duration-300"
                    >
                      <div className="text-2xl mb-2 text-blue-400">{stat.icon}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      <div className="text-lg font-semibold text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Diamond Vision Cleaning</h3>
                  <p className="text-gray-400">
                    A modern, high-performance website for a professional exterior cleaning service. 
                    This project showcases interactive elements, smooth animations, and a user-friendly 
                    interface that effectively converts visitors into customers.
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {[
                      "Interactive Map Integration",
                      "Service Area Visualisation",
                      "Before/After Gallery",
                      "Animated Sections",
                      "Mobile-First Design",
                      "Contact Form Integration"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <FaCheck className="w-4 h-4 text-green-400" role="presentation" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Built With</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js",
                      "React",
                      "Tailwind CSS",
                      "TypeScript",
                      "Mapbox",
                      "Particles.js"
                    ].map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 
                          border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button - Updated with better positioning and z-index */}
                <div className="pt-4 relative z-20">
                  <a 
                    href="https://www.diamondvisioncleaning.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
                      px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300
                      relative z-20 cursor-pointer"
                  >
                    View Live Site
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </a>
                </div>
              </div>
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
              {/* Column Headers */}
              <div className="grid grid-cols-3 p-4 border-b border-blue-500/20 bg-slate-800/50">
                <div className="text-gray-300 font-medium">Feature</div>
                <div className="text-gray-300 font-medium text-center">Traditional Agency</div>
                <div className="text-gray-300 font-medium text-right">
                  <span className="text-blue-400">Saunders & Simmons</span>
                </div>
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
                  <div className="grid grid-cols-3 items-center">
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-xl" 
                        role="presentation" 
                        aria-hidden="true"
                      >{point.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{point.feature}</h3>
                        <p className="text-sm text-gray-400">{point.description}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                        {point.traditional}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
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
                <h4 className="text-3xl font-bold mb-6">
                  £25/month <span className="text-sm font-normal text-gray-400">ex VAT</span>
                </h4>
                <ul className="space-y-4 mb-8">
                  {[
                    "Website Hosting",
                    "SSL Certificate",
                    "Regular Backups",
                    "Security Updates",
                    "Technical Support"
                  ].map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <FaCheck className="w-5 h-5 text-green-400 shrink-0" role="presentation" aria-hidden="true" />
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
                  answer: "Yes! While our free website package includes basic SEO setup, we offer comprehensive SEO services to help boost your online visibility. This includes keyword research, content optimisation, local SEO, and regular performance reporting. Get in touch to learn more about our SEO packages."
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
              <h3 className="text-lg mb-4">Have a question? We're just a message away!</h3>
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

