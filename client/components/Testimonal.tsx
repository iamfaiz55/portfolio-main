"use client";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { GlareCard } from "./ui/glare-card";
import { BLUE, CENTER, ORANGE } from "@/lib/theme";
import { useGetTestimonialsQuery } from "@/redux/apis/testimonialsApi";

export default function MultiCarousel() {
  const { data } = useGetTestimonialsQuery();

  return (
    <section className="relative py-24 overflow-hidden bg-white text-teal-900">
      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-teal-200 via-teal-50 to-teal-400 opacity-40`}
      />

      {/* Animated subtle dots */}
      <div aria-hidden className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-teal-300/30 opacity-50"
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

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-20px) translateX(0);
            opacity: 0.5;
          }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h4 className="text-teal-600 text-sm md:text-base font-medium uppercase mb-3 tracking-wider">
            What Clients Say
          </h4>
          <h2 className="text-teal-900 text-3xl md:text-4xl font-bold leading-snug">
            Testimonials About My Work
          </h2>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          loop={true}
          grabCursor={true}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          centeredSlides={true}
          breakpoints={{
            0: { slidesPerView: "auto" },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!flex justify-center pb-12"
        >
          {data &&
            data.map((testimonial) => (
              <SwiperSlide
                key={testimonial._id}
                className="!flex justify-center !w-auto"
              >
                <GlareCard
                  className="flex flex-col justify-between p-6 md:p-8 
                    rounded-3xl shadow-xl transition hover:scale-[1.03] duration-300 
                    bg-teal-50/20 backdrop-blur-md max-w-xs w-full"
                >
                  {/* Stars Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <ul className="flex text-teal-600 text-lg">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const full = i < Math.floor(testimonial.stars);
                        const half =
                          i === Math.floor(testimonial.stars) &&
                          testimonial.stars % 1 !== 0;

                        return (
                          <li key={i}>
                            {full ? (
                              <FaStar />
                            ) : half ? (
                              <FaStarHalfAlt />
                            ) : (
                              <FaRegStar className="text-teal-300" />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    <span className="text-teal-700 text-sm">
                      ({testimonial.stars.toFixed(1)} / 5)
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="text-teal-600 text-4xl mb-4">“</div>

                  {/* Testimonial Text */}
                  <p className="text-teal-800/80 text-base mb-6">
                    {testimonial.text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${testimonial.image}`}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover border-2 border-teal-600"
                    />
                    <div>
                      <h3 className="text-teal-900 font-semibold">
                        {testimonial.name}
                      </h3>
                      <span className="text-teal-700 font-medium text-sm">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </GlareCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
