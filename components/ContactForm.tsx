'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaBolt, FaLock, FaHeart } from 'react-icons/fa'

interface FormStep {
  question: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
}

interface FormData {
  name: string;
  businessName: string;
  businessDescription: string;
  email: string;
  phone: string;
}

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    businessDescription: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type FormDataKey = keyof FormData;

  const steps: FormStep[] = [
    {
      question: "First things first, what's your name?",
      type: 'text',
      placeholder: 'Type your name here...'
    },
    {
      question: `Lovely to meet you, ${formData.name}! Tell us your business name...`,
      type: 'text',
      placeholder: "What's your business called?"
    },
    {
      question: "Brilliant! And what does your business do?",
      type: 'textarea',
      placeholder: "Don't hold back - we love hearing about passionate business owners!"
    },
    {
      question: `${formData.businessName} sounds fantastic! What's the best email to reach you on?`,
      type: 'email',
      placeholder: 'your@email.com'
    },
    {
      question: "Last but not least, what's your phone number?",
      type: 'tel',
      placeholder: 'Your best contact number'
    }
  ];

  const stepToFieldMap: FormDataKey[] = ['name', 'businessName', 'businessDescription', 'email', 'phone'];

  const handleInputChange = (value: string) => {
    const currentField = stepToFieldMap[currentStep - 1];
    setFormData(prev => ({
      ...prev,
      [currentField]: value
    }));
  };

  const handleNextStep = () => {
    const currentField = stepToFieldMap[currentStep - 1];
    if (!formData[currentField]) {
      setError('Please fill in this field to continue');
      return;
    }
    setError(null);

    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setCurrentStep(steps.length + 1);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Sorry, something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Add decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />
      
      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/50 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
          }}
          style={{
            left: `${20 + (i * 30)}%`,
            top: `${10 + (i * 20)}%`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto relative">
        {currentStep === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-blue-500/20 p-12 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
          >
            <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12">
              Ready for a website that's as unique as your business? Let's have a chat!
            </p>
            
            <div className="flex justify-center gap-4 mb-12">
              {currentStep > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-gray-400 hover:text-white transition-colors duration-300 
                    flex items-center gap-2 px-6 py-5 rounded-xl border border-gray-700
                    hover:border-gray-600 text-xl"
                >
                  ← Previous
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentStep(1)}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 
                  px-10 py-5 rounded-xl text-2xl font-semibold text-white
                  transition-all duration-300 shadow-lg hover:shadow-blue-500/25 
                  hover:from-blue-600 hover:to-blue-700"
              >
                Yes, Let's Do This!
                <motion.span 
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>

            <div className="mt-12 flex justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <FaBolt className="text-yellow-400" />
                <span>Live in 7 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLock className="text-green-400" />
                <span>No Upfront Cost</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-400" />
                <span>100% Satisfaction</span>
              </div>
            </div>
          </motion.div>
        ) : currentStep === steps.length + 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-green-500/20 p-12 shadow-2xl"
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-500 text-3xl" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-center">Thanks {formData.name}!</h3>
            <p className="text-gray-400 text-center text-lg leading-relaxed">
              We're really excited to learn more about {formData.businessName}. 
              We'll be in touch within 24 hours to chat about your amazing business 
              and how we can help it grow online.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-blue-500/20 p-12 shadow-2xl"
          >
            <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-semibold">{steps[currentStep - 1].question}</h3>

              <div className="space-y-4">
                {steps[currentStep - 1].type === 'textarea' ? (
                  <textarea
                    value={formData[stepToFieldMap[currentStep - 1]]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={steps[currentStep - 1].placeholder}
                    className="w-full bg-white/10 rounded-xl px-6 py-4 border border-gray-700 h-32 
                      focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors
                      text-lg placeholder:text-gray-500"
                  />
                ) : (
                  <input
                    type={steps[currentStep - 1].type}
                    value={formData[stepToFieldMap[currentStep - 1]]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={steps[currentStep - 1].placeholder}
                    className="w-full bg-white/10 rounded-xl px-6 py-4 border border-gray-700 
                      focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors
                      text-lg placeholder:text-gray-500"
                  />
                )}
                
                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 
                        flex items-center gap-2 px-6 py-4 rounded-xl border border-gray-700
                        hover:border-gray-600"
                    >
                      ← Previous
                    </button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className={`${currentStep > 1 ? 'flex-1' : 'w-full'} 
                      bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                      text-white py-4 rounded-xl font-semibold text-lg
                      transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-lg hover:shadow-blue-500/25`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : currentStep === steps.length ? (
                      "Perfect, Let's Chat Soon!"
                    ) : (
                      'Next →'
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 