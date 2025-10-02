'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle, Star, Briefcase, Award, Play } from 'lucide-react';
import myImage from "../public/profile-faiz.png";
import { motion } from "framer-motion";
import { Code2, ShieldCheck, Cloud, Rocket } from "lucide-react"; 

interface CounterItem {
  count: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  color?: string;
}

// Portfolio Counters
const counterData: CounterItem[] = [
  { count: 56, label: 'Projects Completed', icon: <Briefcase size={32} /> },
  { count: 32, label: 'Happy Clients', icon: <CheckCircle size={32} />, suffix: '+' },
  { count: 15, label: 'Awards Won', icon: <Award size={32} />, color: '#1dd1a1' },
  { count: 120, label: 'Positive Feedbacks', icon: <Star size={32} />, color: '#00cec9' },
];

export default function PortfolioCounter() {
  const [counters, setCounters] = useState(counterData.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) animateCounters();
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    counterData.forEach((item, index) => {
      let current = 0;
      const increment = item.count / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= item.count) {
          current = item.count;
          clearInterval(timer);
        }
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, stepDuration);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-teal-50 text-teal-900 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

       {/* Left Content */}
<div className="space-y-6">
  <h4 className="text-teal-600 font-medium">About Me</h4>
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
    Building Complete Software Solutions
  </h2>
  <p className="text-teal-800/80">
    I am a Full-Stack Software Developer with expertise in building web applications, backend services, and mobile apps. I turn ideas into fully functional and modern digital solutions.
  </p>
  <ul className="space-y-2 text-teal-800">
    <li className="flex items-center gap-2">
      <span className="text-teal-600">&#10003;</span> Expert in Frontend, Backend & Mobile Development
    </li>
    <li className="flex items-center gap-2">
      <span className="text-teal-600">&#10003;</span> Skilled in React, Next.js, Node.js, Flutter & Tailwind CSS
    </li>
    <li className="flex items-center gap-2">
      <span className="text-teal-600">&#10003;</span> Passionate about clean design, usability & performance
    </li>
  </ul>

  {/* Profile Card */}
  <div className="flex items-center gap-4 mt-6 p-4 bg-white border-l-4 border-teal-600 shadow-md">
    <Image
      src={myImage}
      alt="Profile Image"
      width={100}
      height={100}
      className="rounded-full border-2 border-teal-600"
    />
    <h4 className="text-lg font-semibold text-teal-900">
      Faiz Shaikh <span className="font-normal text-teal-700">/ Full-Stack Developer</span>
    </h4>
  </div>

  {/* Buttons */}
  <div className="flex items-center gap-4 mt-4">
    <a
      href="/contact"
      className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition"
    >
      Contact Me
    </a>

    <a
      href="https://youtu.be/iyd7qUH3oH0"
      target="_blank"
      className="flex items-center gap-2 relative"
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full bg-teal-300 opacity-30 animate-wave"></div>
        <div className="absolute w-full h-full rounded-full bg-teal-300 opacity-30 animate-wave delay-200"></div>
        <div className="absolute w-full h-full rounded-full bg-teal-300 opacity-30 animate-wave delay-400"></div>
        <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-teal-600 rounded-full">
          <Play className="text-white" size={20} />
        </div>
      </div>
      Watch Video
    </a>
  </div>

  <style jsx>{`
    @keyframes wave {
      0% { transform: scale(0.5); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    .animate-wave { animation: wave 1.5s infinite; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-400 { animation-delay: 0.4s; }
  `}</style>
</div>

          {/* Right Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {counterData.map((item, index) => {
              const fallbackIcons = [<Rocket size={28} />, <ShieldCheck size={28} />, <Cloud size={28} />, <Code2 size={28} />];
              const icon = item.icon ?? fallbackIcons[index % fallbackIcons.length];

              return (
                <CounterCard
                  key={item.label}
                  label={item.label}
                  value={counters[index]}
                  suffix={item.suffix}
                  color={item.color || "#009688"}
                  icon={icon}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CounterCard({
  label,
  value,
  suffix = "",
  color = "#009688",
  icon = <Code2 size={28} />,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-md border border-white/15 p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
    >
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0.02), rgba(255,255,255,0.18))",
          filter: "blur(10px)",
        }}
      />

      <div className="relative mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20">
        <div
          className="absolute inset-0 rounded-full shadow-lg"
          style={{
            background: `radial-gradient(120% 120% at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 18%, rgba(255,255,255,0.1) 32%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0.18) 100%), radial-gradient(100% 100% at 70% 75%, ${color} 0%, ${color}CC 40%, ${color}99 70%, ${color}66 100%)`,
          }}
        />
        <div className="absolute inset-0 rounded-full ring-1 ring-white/40" />
        <div className="absolute -top-1 -left-1 h-8 w-8 rounded-full bg-white/60 blur-md opacity-70" />
        <div className="absolute inset-0 grid place-items-center text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
          {icon}
        </div>
      </div>

      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-teal-900">
          {value}
          <span className="ml-0.5">{suffix}</span>
        </div>
        <p className="mt-1 text-teal-800/80 text-sm sm:text-base">{label}</p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 translate-y-10 bg-gradient-to-t from-white/10 to-transparent group-hover:translate-y-0 transition-transform duration-500" />
    </motion.div>
  );
}
