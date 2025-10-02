'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypingEffect from './AnimatedTyping';
import Sparkle from './ui/Sparkle';
import { motion } from "framer-motion";
import heroImage from '../public/hero.png';
import Image from 'next/image';
import { FlipWords } from './ui/flip-words';
import ScrollSpeedController from './ui/smoothScroll';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Flip words for portfolio
  const badgeWords = [
    'Frontend Developer',
    'UI/UX Enthusiast',
    'React.js Specialist',
    'Next.js Developer',
    'Creative Engineer',
  ];

  const buildWords = [
    'Clean Interfaces',
    'Responsive Designs',
    'Modern Web Apps',
    'Interactive UIs',
  ];

  const solutionWords = [
    'Built with Passion.',
    'Optimized for Speed.',
    'Accessible by Design.',
    'Future-Ready Code.',
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollSpeedController multiplier={0.1} friction={0.1} />
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-10 md:pt-7 bg-gradient-to-br from-white via-teal-50 to-white"
      >
        {/* Floating Blobs (Teal theme) */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-2xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-teal-100/40 to-transparent rounded-full animate-pulse-slow" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div
              className={`space-y-8 transition-all duration-1000 text-center lg:text-left flex flex-col items-center lg:items-start ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Badge with FlipWords */}
              <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-800 rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                <FlipWords words={badgeWords} className="text-sm font-medium" />
              </div>

              {/* Heading */}
              <h1 className="relative text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                <div className="inline-flex items-center relative z-10">
                  <FlipWords words={buildWords} className="inline-block text-md" />
                  <Sparkle className="w-8 h-8 ml-2 text-teal-500 opacity-80" />
                </div>
                <br />
                <span className="relative block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                  <FlipWords words={solutionWords} className="inline-block text-black" />
                </span>
              </h1>

              {/* Typing line under heading */}
              <TypingEffect />

              <p className="sm:text-xl text-gray-700 max-w-2xl leading-relaxed">
                Hi, I’m <span className="font-semibold text-teal-600">Shaikh faiz</span>, a passionate developer crafting
                elegant, user-friendly, and scalable digital experiences.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto px-6 py-3 font-semibold rounded-xl text-white
                    bg-teal-600 hover:bg-teal-700 transition-all hover:scale-[1.02] shadow-lg"
                >
                  Let’s Work Together
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 200 },
                }}
                className="relative"
              >
                <Image
                  src={heroImage}
                  alt="hero"
                  width={600}
                  height={600}
                  className="w-72 sm:w-96 md:w-[500px] lg:w-[600px] xl:w-[650px] h-auto mx-auto lg:mx-0 drop-shadow-xl rounded-2xl"
                  priority
                />

                {/* Glowing animated accent behind image */}
                <motion.div
                  aria-hidden
                  className="absolute -inset-10 rounded-full bg-gradient-to-r from-teal-300/40 via-transparent to-teal-500/40 blur-3xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Animation helpers */}
        <style jsx global>{`
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 9.5s ease-in-out 0.6s infinite;
          }
          .animate-pulse-slow {
            animation: pulser 6s ease-in-out infinite;
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-14px);
            }
          }
          @keyframes pulser {
            0%,
            100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }
        `}</style>
      </section>
    </>
  );
}
