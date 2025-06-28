// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import ExpenseTracker from './ExpenseTracker';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

export default function Home() {
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondLine(true);
    }, 3000); // let the first typewriter mostly finish

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-24 px-6 text-center space-y-8 animate-fade-up">
      {/* Welcome Header */}
      <h1 className="text-5xl font-light tracking-tight neon-glow">
        <Typewriter
          words={['Welcome to NeonTron.']}
          cursor
          cursorStyle="_"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1000}
          loop={1}
        />
      </h1>

      {/* Friendly Subheading */}
      {showSecondLine && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="opacity-80 text-lg"
        >
          <Typewriter
            words={['Track your expenses. Stay in control. Do it in style.']}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={500}
            loop={1}
          />
        </motion.p>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="neumorphic-btn px-8 py-3 mt-4 transition-transform duration-200"
      >
        Let’s Get Started
      </motion.button>

      <div className="mt-12">
        <ExpenseTracker />
      </div>
    </section>
  );
}
