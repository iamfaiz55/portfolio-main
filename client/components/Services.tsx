'use client';

import { useState, useEffect, useRef } from 'react';
import { CometCard } from './ui/comet-card';
import Link from 'next/link';
import { useGetServicesQuery } from '@/redux/apis/servicesApi';
import { getIcon } from '@/lib/IconsRegistery';

export default function Services() {
  const { data } = useGetServicesQuery();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-28 bg-white" ref={sectionRef}>
      {/* Background teal overlay */}
      <div className="absolute inset-0 bg-teal-500/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-100/20 rounded-full px-3 py-1.5 mb-4">
            <div className="w-2 h-2 bg-teal-400 rounded-full" />
            <span className="text-teal-800 font-medium text-xs sm:text-sm">Our Services</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            Comprehensive IT Solutions
          </h2>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
            We deliver end-to-end technology solutions that help businesses thrive in the digital age.
            From web development to cloud infrastructure, we’ve got you covered.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data?.map((service, index) => {
            const Icon = getIcon(service.iconKey);

            return (
              <CometCard key={service._id}>
                <article
                  data-index={index}
                  className="service-card group relative h-full rounded-xl p-4 sm:p-5 bg-white ring-1 ring-gray-200 shadow-md w-full transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Top-right soft teal orb accent */}
                  <span
                    aria-hidden
                    className="absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-20 blur-xl bg-teal-400/30"
                  />

                  {/* Header: Icon + Title */}
                  <header className="flex items-start gap-3">
                    <div className="relative">
                      <div className="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-gray-200 shadow bg-teal-50">
                        <Icon className="h-5 w-5 text-teal-600 drop-shadow" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-black leading-snug">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </header>

                  {/* Features */}
                  <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-800 text-xs sm:text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <footer className="mt-4 sm:mt-5 pt-3 border-t border-gray-200">
                    <Link
                      href={`pages/services/${service._id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-500 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white transition-colors"
                    >
                      Learn More
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </footer>
                </article>
              </CometCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
