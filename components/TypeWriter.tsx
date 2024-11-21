'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const words = [
  "Websites",
  "E-commerce",
  "Web Apps",
  "Branding"
]

export default function TypeWriter() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')
  const [delta, setDelta] = useState(150)

  const tick = useCallback(() => {
    const currentIndex = currentWord % words.length
    const fullWord = words[currentIndex]
    const updatedText = isDeleting 
      ? fullWord.substring(0, text.length - 1)
      : fullWord.substring(0, text.length + 1)

    setText(updatedText)

    if (!isDeleting && updatedText === fullWord) {
      setIsDeleting(true)
      setDelta(100)
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false)
      setCurrentWord(currentWord + 1)
      setDelta(150)
    }
  }, [currentWord, isDeleting, text])

  useEffect(() => {
    const ticker = setInterval(() => {
      tick()
    }, delta)

    return () => clearInterval(ticker)
  }, [text, delta, tick])

  return (
    <motion.div 
      className="h-[5rem] flex items-center justify-center text-[5rem] leading-none font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.div>
  )
} 