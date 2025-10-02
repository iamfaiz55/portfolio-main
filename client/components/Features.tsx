import React from "react";
import { motion } from "framer-motion";
import { Handshake, MonitorSmartphone, PieChart, TrendingUp } from "lucide-react";
import Image from "next/image";
import { BLUE, CENTER, ORANGE } from '@/lib/theme'; // optional, can remove if unused

// Features data
const features = [
  {
    id: 1,
    title: "Full-Stack Development",
    description: "Building web apps, backend services, and APIs for scalable solutions.",
    iconColor: "#14b8a6", // teal
    icon: <PieChart size={28} />,
  },
  {
    id: 2,
    title: "Mobile Apps",
    description: "Developing cross-platform mobile applications with Flutter & React Native.",
    iconColor: "#0f766e",
    icon: <MonitorSmartphone size={28} />,
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Creating modern and responsive user interfaces with clean UX.",
    iconColor: "#5eead4",
    icon: <Handshake size={28} />,
  },
  {
    id: 4,
    title: "Tech Research",
    description: "Continuous learning and integration of latest technologies.",
    iconColor: "#2dd4bf",
    icon: <TrendingUp size={28} />,
  },
];

// 3D Icon Orb Component
function IconOrb({
  color = "#14b8a6",
  icon,
  size = 72,
}: {
  color?: string;
  icon: React.ReactNode;
  size?: number;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full shadow-xl"
        style={{
          background: `
            radial-gradient(120% 120% at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 18%, rgba(255,255,255,0.12) 34%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0.18) 100%),
            radial-gradient(100% 100% at 70% 75%, ${color} 0%, ${color}CC 45%, ${color}99 72%, ${color}66 100%)
          `,
        }}
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-white/50" />
      <div className="absolute -top-1 -left-1 h-10 w-10 rounded-full bg-white/60 blur-md opacity-80" />
      <div className="absolute inset-0 grid place-items-center text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]">
        {icon}
      </div>
    </div>
  );
}

// Feature Section Component
const FeatureSection: React.FC = () => {
  return (
 <section className="relative py-16 sm:py-20 md:py-24 bg-white text-teal-900 overflow-hidden">
  {/* Animated Dots */}
  <div aria-hidden className="absolute inset-0">
    {[...Array(40)].map((_, i) => (
      <span
        key={i}
        className={`absolute block rounded-full bg-teal-300/40 opacity-50`}
        style={{
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${5 + Math.random() * 10}s ease-in-out infinite alternate`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>

  {/* soft backdrop */}
  <div className="absolute inset-0 bg-teal-50/50" />

  {/* subtle pattern */}
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "radial-gradient(1px 1px at 12% 20%, #14b8a6 1px, transparent 1px), radial-gradient(1px 1px at 76% 68%, #14b8a6 1px, transparent 1px)",
      backgroundSize: "42px 42px",
    }}
  />

  <style jsx>{`
    @keyframes float {
      0% { transform: translateY(0) translateX(0); opacity: 0.5; }
      50% { transform: translateY(-10px) translateX(5px); opacity: 0.7; }
      100% { transform: translateY(-20px) translateX(0); opacity: 0.5; }
    }
  `}</style>

  <div className="relative container mx-auto px-4">
    {/* Heading */}
    <div className="text-center mb-10 sm:mb-14 md:mb-16">
      <h4 className="text-teal-600 text-xs sm:text-sm font-semibold tracking-wide">
        My Skills
      </h4>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mt-2 text-teal-900">
        What I Can Build
      </h2>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {features.map((feature, index) => {
        const color = feature.iconColor || "#14b8a6";
        const iconNode = feature.icon;

        return (
          <motion.article
            key={feature.id}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -3 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.05,
            }}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-teal-50/20 backdrop-blur-md 
                       ring-1 ring-teal-100/40 p-4 sm:p-6 md:p-7 text-center shadow-lg md:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 sm:h-28 sm:w-28 rounded-full opacity-25 blur-2xl"
              style={{ backgroundColor: color }}
            />

            <div className="mb-4 sm:mb-5 flex justify-center">
              <IconOrb color={color} icon={iconNode} size={56} />
            </div>

            <h3 className="text-lg sm:text-xl md:text-[22px] font-bold leading-snug">
              {feature.title}
            </h3>
            <p className="mt-2 text-teal-900/70 text-xs sm:text-sm md:text-[15px] leading-relaxed">
              {feature.description}
            </p>
          </motion.article>
        );
      })}
    </div>

    {/* CTA */}
    <div className="text-center mt-10 sm:mt-12">
      <a
        href="/portfolio"
        className="inline-flex items-center justify-center rounded-lg sm:rounded-xl 
                   bg-teal-600 px-5 py-2.5 sm:px-7 sm:py-3 
                   text-sm sm:text-base text-white font-semibold shadow-md sm:shadow-lg transition hover:bg-teal-700"
      >
        View My Projects
        <svg
          viewBox="0 0 24 24"
          className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>

  );
};

export default FeatureSection;
