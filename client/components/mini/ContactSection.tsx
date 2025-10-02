'use client';

import { useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '@/components/Header';

const TEAL = 'rgba(0, 128, 128, 0.1)'; // 10% teal
const BLACK = '#000';
const WHITE = '#fff';

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  name: yup.string().trim().min(2, 'Please enter your full name').required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().optional().max(20, 'Too long'),
  service: yup.string().required('Please pick a service'),
  message: yup.string().trim().min(10, 'Please describe your project (10+ chars)').required('Message is required'),
});

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', service: '', message: '' },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 2500);
  };

  const fieldBase = `w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-${TEAL} bg-white text-black placeholder-black/40 focus:ring-2 focus:ring-offset-0 focus:ring-${TEAL} outline-none`;
  const errorText = 'mt-1 text-xs sm:text-sm text-red-600';

  return (
    <>
      <Header />
      <section className="relative py-20 sm:py-20 bg-white overflow-hidden ">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black">
              Contact Us Directly
            </h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-black/70 max-w-2xl mx-auto">
              Share your requirements, and we’ll get back to you immediately.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5 sm:space-y-7 text-sm sm:text-base"
            >
              {[
                {
                  icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-black" />,
                  title: 'Call Us Now',
                  line1: <a href="tel:+919960669724" className="hover:text-black/80">+19 9960669724</a>,
                  note: 'Available 24/7',
                },
                {
                  icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black" />,
                  title: 'Email Us',
                  line1: <a href="mailto:faizuddinshaikh55@gmail.com" className="hover:text-black/80">faizuddinshaikh55@gmail.com</a>,
                  note: 'Respond within 2 hours',
                },
                {
                  icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black" />,
                  title: 'Visit Office',
                  line1: <>Chhatrapati Sambhajinagar (Aurangabad)</>,
                  note: 'New York, NY 10001',
                },
                {
                  icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-black" />,
                  title: 'Business Hours',
                  line1: <>Mon–Fri: 9 AM – 6 PM</>,
                  note: 'Sat: 10 AM – 4 PM • Sun: Closed',
                },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-teal-50 border border-teal-100">
                    {row.icon}
                  </div>
                  <div>
                    <h3 className="text-black font-semibold">{row.title}</h3>
                    <p className="text-black/90">{row.line1}</p>
                    <p className="text-black/70 text-xs sm:text-sm mt-0.5">{row.note}</p>
                  </div>
                </div>
              ))}

              <div className="pt-3 grid sm:grid-cols-2 gap-3 sm:gap-4">
                <a href="tel:+919960669724">
                  <button className="w-full py-2 sm:py-3 rounded-lg font-semibold bg-black text-white hover:bg-black/90 transition shadow">Call Now</button>
                </a>
                <a href="#contact-form">
                  <button className="w-full py-2 sm:py-3 rounded-lg font-semibold border-2 border-teal-200 text-black hover:bg-teal-50 transition">Free Consultation</button>
                </a>
              </div>
            </motion.div>

            {/* Form panel */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="relative rounded-xl border border-teal-100 bg-white p-4 sm:p-6 overflow-hidden"
            >
              <form id="contact-form" ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <input {...register('name')} placeholder="Full Name" className={fieldBase} />
                    {errors.name && <p className={errorText}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...register('email')} type="email" placeholder="Email" className={fieldBase} />
                    {errors.email && <p className={errorText}>{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <input {...register('phone')} placeholder="Phone (optional)" className={fieldBase} />
                    {errors.phone && <p className={errorText}>{errors.phone.message}</p>}
                  </div>
                  <div>
                    <select {...register('service')} defaultValue="" className={fieldBase}>
                      <option value="" className="text-black">Select Service</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-apps">Mobile Apps</option>
                      <option value="cloud-solutions">Cloud Solutions</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="custom-software">Custom Software</option>
                      <option value="data-analytics">Data Analytics</option>
                    </select>
                    {errors.service && <p className={errorText}>{errors.service.message}</p>}
                  </div>
                </div>

                <textarea {...register('message')} placeholder="Your message..." rows={4} className={`${fieldBase} resize-none`} />
                {errors.message && <p className={errorText}>{errors.message.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                    isSubmitting ? 'bg-black/40 text-black cursor-not-allowed' : 'bg-black'
                  }`}
                >
                  {isSubmitting ? 'Sending…' : <span className="flex items-center justify-center gap-2">Send <Send size={16} /></span>}
                </button>

                {sent && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-black font-semibold text-sm">
                      ✅ Message sent! We’ll contact you soon.
                    </span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
