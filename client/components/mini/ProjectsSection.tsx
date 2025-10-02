"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import Header from "@/components/Header";
import { useGetProjectsQuery } from "@/redux/apis/projectsApi";
// import { useGetProjectsQuery } from "@/redux/apis/projectApi";

export default function ProjectsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useGetProjectsQuery();

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

    const cards = sectionRef.current?.querySelectorAll(".project-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <section
        id="projects"
        ref={sectionRef}
        className="relative py-20 sm:py-24 lg:py-32 bg-white text-gray-900"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-700 mb-4">
              My Projects
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg">
              Explore my portfolio of IT projects, including web apps, mobile solutions, cloud platforms, and more.
            </p>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data?.map((project, index) => (
              <CometCard key={project._id}>
                <article
                  data-index={index}
                  className="project-card group relative rounded-2xl p-5 sm:p-6 bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  {project.image && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Header */}
                  <header className="mb-3">
                    <h3 className="text-lg font-semibold text-indigo-800">{project.name}</h3>
                  </header>

                  {/* Short Description */}
                  <p className="text-gray-600 text-sm mb-3">{project.shortDesc}</p>

                  {/* Long Description (truncated) */}
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">{project.longDesc}</p>

                  {/* CTA */}
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-indigo-700 font-medium hover:underline"
                  >
                    View Project →
                  </Link>
                </article>
              </CometCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}