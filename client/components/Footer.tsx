'use client';

import { useMemo } from 'react';
import { Phone, Mail, MapPin, ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import logo from "@/public/logo-shaikhfaiz.png"

const TEAL = '#008080'; // teal accent

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-white text-black">
      {/* Subtle teal overlay */}
      <div className="absolute inset-0 bg-teal-500/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 4-column grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand / About */}
          <div>
            <Image width={200} height={200} src={logo} alt='logo' />
            <p className="mt-4 text-gray-700 leading-relaxed">
              Empowering businesses with innovative technology and exceptional IT services.
              Your trusted partner for digital transformation and growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-black">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-gray-700">
              {['#home', '#services', '#about', '#contact'].map((href) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="hover:text-teal-600 transition-colors"
                  >
                    {href.replace('#', '').replace(/^\w/, c => c.toUpperCase())}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-black">Services</h4>
            <ul className="mt-5 space-y-3 text-gray-700">
              {['Web Development', 'Mobile Apps', 'Cloud Solutions', 'Cybersecurity', 'Custom Software', 'Data Analytics'].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-teal-600 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-black">Contact</h4>
            <div className="mt-5 space-y-3 text-sm">
              <p className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-700" />
                <a href="tel:+919960669724" className="hover:text-teal-600 transition-colors">
                  +91 99606 69724
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-700" />
                <a href="mailto:faizuddinshaikh55@gmail.com" className="hover:text-teal-600 transition-colors">
                  faizuddinshaikh55@gmail.com
                </a>
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-700" />
                <span>AN-13, Prozone Trade Center, CIDCO, Chhatrapati Sambhajinagar</span>
              </p>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 text-gray-700 hover:text-teal-600 hover:border-teal-400 hover:scale-105 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-300 pt-6">
      
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Terms of Service</a>

            <button
              onClick={scrollToTop}
              className="group grid h-10 w-10 place-items-center rounded-full border border-gray-300 bg-gray-50 text-black hover:bg-teal-100 transition"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
