"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import Header from "@/components/Header";
import { useGetServicesQuery } from "@/redux/apis/servicesApi";
import { getIcon } from "@/lib/IconsRegistery";

export default function ServicesPageClient() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useGetServicesQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".service-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <section
        id="services"
        ref={sectionRef}
        className="relative py-20 sm:py-24 lg:py-32 bg-white text-gray-900"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-700 mb-4">
              My IT Services
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg">
              I provide end-to-end IT solutions including web development, mobile apps,
              cloud solutions, and cybersecurity projects tailored for modern businesses.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data?.map((service, index) => {
              const Icon = getIcon(service.iconKey);
              return (
                <CometCard key={service._id}>
                  <article
                    data-index={index}
                    className="service-card group relative rounded-2xl p-5 sm:p-6 bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Header */}
                    <header className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-teal-100 text-teal-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                    </header>

                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-2 text-gray-700 text-sm">
                          <span className="h-2 w-2 bg-teal-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href={`/pages/services/${service._id}`}
                      className="inline-block text-teal-700 font-medium hover:underline"
                    >
                      Learn More →
                    </Link>
                  </article>
                </CometCard>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
