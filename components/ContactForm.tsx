'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

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
      question: `Lovely to meet you, ${formData.name}! Tell us about your business dream...`,
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
    <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 p-8">
      {currentStep === 0 ? (
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Create Something Amazing</h2>
          <p className="text-gray-400 mb-8">Ready for a website that's as unique as your business? Let's have a chat!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep(1)}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold"
          >
            Yes, Let's Do This! →
          </motion.button>
        </div>
      ) : currentStep === steps.length + 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="text-green-500 text-2xl" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Thanks {formData.name}!</h3>
          <p className="text-gray-400">
            We're really excited to learn more about {formData.businessName}. 
            We'll be in touch within 24 hours to chat about your amazing business 
            and how we can help it grow online.
          </p>
        </motion.div>
      ) : (
        <div>
          <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">{steps[currentStep - 1].question}</h3>

            <div className="space-y-4">
              {steps[currentStep - 1].type === 'textarea' ? (
                <textarea
                  value={formData[stepToFieldMap[currentStep - 1]]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={steps[currentStep - 1].placeholder}
                  className="w-full bg-white/10 rounded-lg px-4 py-3 border border-gray-700 h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              ) : (
                <input
                  type={steps[currentStep - 1].type}
                  value={formData[stepToFieldMap[currentStep - 1]]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={steps[currentStep - 1].placeholder}
                  className="w-full bg-white/10 rounded-lg px-4 py-3 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              )}
              
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold mt-4 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="text-gray-400 hover:text-white transition-colors duration-300 mt-4 flex items-center gap-2"
              >
                ← Previous
              </button>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
} 