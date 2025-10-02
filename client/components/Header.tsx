'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../public/logo-shaikhfaiz.png';

type NavItem = { name: string; href: string };

// Theme colors
const TEAL = '#0d9488';      // teal-600
const TEAL_LIGHT = '#14b8a6'; // teal-500
const TEAL_DARK = '#0f766e'; // dark teal for menu button

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Sidebar: close on ESC
  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSidebarOpen]);

  // Lock scroll when sidebar open
  useEffect(() => {
    if (!isSidebarOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isSidebarOpen]);

  // Close sidebar on backdrop click
  const onBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Our Services', href: '/pages/services' },
    { name: 'Projects', href: '/pages/projects' },
    { name: 'About', href: '/pages/about' },
    { name: 'Contact', href: '/pages/contact' },
  ];

  // Handle nav
  const handleNav = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsSidebarOpen(false);
      return;
    }
    router.push(href);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed left-1/2 z-50 w-[92%] max-w-7xl transform -translate-x-1/2 
          transition-all duration-300 rounded-2xl border 
          ${isScrolled ? 'bg-white/70 border-teal shadow-lg' : 'bg-white/10 border-teal shadow-sm'}`}
        style={{ WebkitBackdropFilter: 'blur(12px)', top: '16px' }}
      >
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                height={200}
                width={200}
                alt="Logo"
                className="h-12 w-auto sm:h-9 md:h-10 lg:h-12 transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {navItems.map((item) => {
                  const isActivePath = pathname === item.href;
                  return (
                    <li key={item.name} className="relative group">
                      <motion.button
                        onClick={() => handleNav(item.href)}
                        aria-current={isActivePath ? 'page' : undefined}
                        className={`relative font-semibold tracking-[0.01em] focus:outline-none
                          ${isScrolled ? 'text-teal-600' : 'text-white'}`}
                        whileHover={{ y: -2, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {item.name}
                        <motion.span
                          aria-hidden
                          className="absolute left-0 -bottom-1 h-[2px] w-full"
                          initial={{ scaleX: isActivePath ? 1 : 0 }}
                          animate={{ scaleX: isActivePath ? 1 : 0 }}
                          whileHover={{ scaleX: 1 }}
                          style={{
                            transformOrigin: 'left',
                            background: isScrolled
                              ? `linear-gradient(90deg, ${TEAL}, ${TEAL_LIGHT})`
                              : 'linear-gradient(90deg, rgba(255,255,255,0), #fff, rgba(255,255,255,0))',
                          }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                        />
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right side: contact + CTA */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:+918888795875"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <Phone size={18} />
              </a>
              <a
                href="https://wa.me/918888795875"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-green-500 hover:bg-white/20 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.001 2.002c-5.514 0-10 4.486-10 10 0 1.766.464 3.49 1.345 5.01L2 22l5.104-1.335c1.47.801 3.125 1.223 4.897 1.223h.001c5.514 0 10-4.486 10-10s-4.486-9.998-10.001-9.998zm5.479 14.646c-.229.647-1.345 1.229-1.85 1.308-.496.072-1.109.104-1.792-.111-.413-.132-.943-.307-1.633-.6-2.873-1.242-4.739-4.146-4.88-4.34-.143-.193-1.163-1.545-1.163-2.946 0-1.401.737-2.091.998-2.379.26-.288.57-.361.76-.361.191 0 .382.002.548.01.178.007.414-.067.647.493.229.55.777 1.901.846 2.04.07.14.117.303.023.497-.094.193-.141.303-.276.464-.14.164-.295.366-.421.493-.14.14-.285.293-.122.574.163.28.725 1.195 1.557 1.933 1.07.953 1.973 1.249 2.254 1.388.28.14.445.117.61-.07.166-.188.7-.82.889-1.099.188-.28.377-.233.637-.14.26.094 1.647.776 1.928.916.28.14.467.21.537.328.07.117.07.682-.159 1.329z" />
                </svg>
              </a>
              <button
                onClick={() => handleNav('/pages/contact')}
                className="px-5 py-2 rounded-full text-white font-semibold shadow-md transition hover:shadow-lg hover:scale-[1.02] bg-gradient-to-r from-teal to-teal-light"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-md transition-colors text-white`}
              style={{ color: TEAL_DARK }}
              aria-label="Open menu"
              aria-expanded={isSidebarOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={onBackdropClick}
            />

            {/* Sidebar */}
            <motion.aside
              ref={panelRef}
              className="pointer-events-auto absolute left-0 right-0 top-16 mx-4 rounded-2xl border border-teal bg-white/90 backdrop-blur-xl shadow-2xl max-h-[70vh] overflow-y-auto"
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* Close button */}
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <Image src={logo} width={200} height={200} alt="logo" />
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition">
                  <X size={22} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="px-3 py-2">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li key={item.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * index }}>
                      <button
                        onClick={() => handleNav(item.href)}
                        className="group w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3 hover:bg-gray-50 transition-all"
                      >
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile actions */}
              <div className="px-5 pb-6 pt-2 space-y-3 border-t">
                <a href="tel:+919960669724" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <Phone size={20} className="text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-600">Call us</p>
                    <p className="font-semibold text-gray-900 truncate">+91 9960669724</p>
                  </div>
                </a>
                <a href="mailto:info@inficomsolutions.com" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <Mail size={20} className="text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900 truncate">faizuddinshaikh55@gmail.com</p>
                  </div>
                </a>
                <button
                  onClick={() => handleNav('/pages/contact')}
                  className="w-full text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-[1.015] bg-gradient-to-r from-teal to-teal-light"
                >
                  Get Free Consultation
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
