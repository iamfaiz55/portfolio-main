"use client";

import Image from "next/image";

export function MountLoader() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle Teal Accent Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom left, rgba(20,184,166,0.1), white)`,
        }}
      />

      {/* Aurora effect overlay */}
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay">
        <div
          className="absolute inset-0 animate-[aurora_16s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(600px 300px at 15% 25%, rgba(20,184,166,0.08), transparent 60%),
              radial-gradient(500px 260px at 85% 70%, rgba(20,184,166,0.05), transparent 60%)
            `,
          }}
        />
      </div>

      {/* Glint overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay">
        <div
          className="absolute inset-0 animate-[glint_12s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(1.2px 1.2px at 12% 20%, rgba(0,0,0,0.15), transparent 55%),
              radial-gradient(1.2px 1.2px at 46% 76%, rgba(0,0,0,0.1), transparent 55%),
              radial-gradient(1.2px 1.2px at 80% 30%, rgba(0,0,0,0.15), transparent 55%),
              radial-gradient(1.2px 1.2px at 30% 88%, rgba(0,0,0,0.1), transparent 55%)
            `,
          }}
        />
      </div>

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-4">
        {/* Logo */}
        <div className="grid place-items-center h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white border border-black/10 shadow-md">
          <Image
            src="/logo-shaikhfaiz.png"
            alt="Shaikh Faiz | Inficom Solutions"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Loading bar */}
        <div className="h-2 w-36 sm:w-48 rounded-full bg-black/10 overflow-hidden">
          <div className="h-full w-1/2 bg-teal-500/60 animate-[loaderbar_1.6s_ease-in-out_infinite]" />
        </div>

        {/* Loading text */}
        <p className="text-black text-sm sm:text-base tracking-wide">
          Preparing your personalized experience…
        </p>
      </div>

      <style jsx>{`
        @keyframes aurora {
          0% {
            background-position: 0% 0%, 100% 0%;
          }
          50% {
            background-position: 30% 10%, 70% 20%;
          }
          100% {
            background-position: 0% 0%, 100% 0%;
          }
        }
        @keyframes glint {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(8px) translateY(-6px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes loaderbar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
