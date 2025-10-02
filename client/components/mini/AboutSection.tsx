'use client';

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import MiniServicesSection from "@/components/mini/Services";

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white text-[#004D4D] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Image */}
          <div className="relative">
            <Image
              src="https://html.rrdevs.net/morat/assets/img/images/about-img-8.png"
              alt="Faizuddin Shaikh"
              width={500}
              height={500}
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Right - Personal Info */}
          <div>
            <h4 className="text-[#004AAD] font-semibold mb-2">About Me</h4>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Hi, I’m Faizuddin Shaikh
            </h2>
            <p className="text-[#004D4D]/80 mb-6">
              I am a passionate IT professional and developer from Aurangabad (Chhatrapati Sambhajinagar). 
              I create modern, scalable, and efficient software solutions, including web apps, mobile apps, cloud integrations, and cybersecurity projects. 
              I love turning ideas into reality with clean, functional, and user-friendly technology.
            </p>

            {/* Skills / Highlights */}
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-[#FF7A00] h-5 w-5" />
                Web Development (React, Next.js)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-[#FF7A00] h-5 w-5" />
                Mobile App Development (Flutter, React Native)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-[#FF7A00] h-5 w-5" />
                Cloud Solutions & APIs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-[#FF7A00] h-5 w-5" />
                Cybersecurity & Data Protection
              </li>
            </ul>

            {/* Contact Info */}
            <div className="mt-8 space-y-2 text-sm text-[#004D4D]/90">
              <p><strong>Phone:</strong> +91 99606 69724</p>
              <p><strong>Email:</strong> faizuddinshaikh55@gmail.com</p>
              <p><strong>Website:</strong> <a href="https://shaikhfaiz.top" className="text-[#004AAD] hover:underline">shaikhfaiz.top</a></p>
            </div>
          </div>
        </div>
      </section>

     

      {/* Portfolio / Projects Highlight */}
      <section className="py-20 bg-white text-[#004D4D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Portfolio</h2>
          <p className="text-[#004D4D]/80 mb-12">
            Some of the projects I have built or contributed to, showcasing my skills and expertise.
          </p>
          {/* You can add a project grid here */}
        </div>
      </section>
    </>
  );
}
