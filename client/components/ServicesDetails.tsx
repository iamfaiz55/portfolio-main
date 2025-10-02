'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Info, AlertTriangle, Check, ChevronLeft, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import { getIcon } from '@/lib/IconsRegistery';
import { useGetServiceQuery } from '@/redux/apis/servicesApi';
import { MountLoader } from './mini/MountLoader';

type TabType = 'overview' | 'features' | 'includes' | 'faqs';

const TEAL = '#14b8a6';

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-sm text-black/80">
    <Sparkles className="h-3.5 w-3.5 text-teal/50" />
    {children}
  </span>
);

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-2xl bg-white p-4 border border-black/10">
    <p className="text-xs uppercase tracking-wider text-black/50">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-black">{value}</p>
  </div>
);

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-xl md:text-2xl font-semibold text-black flex items-center gap-2">
      <Info className="h-5 w-5 text-teal/50" />
      {title}
    </h2>
    {subtitle && <p className="text-black/60 mt-1">{subtitle}</p>}
  </div>
);

export default function ServiceDetails({ id }: { id: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { data: service, isLoading, error } = useGetServiceQuery(id);

  if (isLoading) return <MountLoader />;
  if (error || !service) return <div className="min-h-screen flex items-center justify-center text-black">Service not found.</div>;

  const Icon = getIcon(service.iconKey);
  const bookNow = () => router.push(`/contact?intent=booking&id=${id}`);

  return (
    <>
      <Header />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-white" />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-6 pt-16">
        <button
          onClick={() => router.push('/services')}
          className="group inline-flex items-center gap-2 text-black/60 hover:text-black transition"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Services
        </button>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-black/5 flex items-center justify-center shadow-sm">
                <Icon className="h-7 w-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">{service.title}</h1>
                <p className="mt-2 text-black/70 max-w-full sm:max-w-2xl">{service.description}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>High Performance</Badge>
              <Badge>Modern Stack</Badge>
              <Badge>Scalable & Secure</Badge>
            </div>

            {/* Benefits */}
            <div className="mt-8 rounded-3xl border border-black/10 bg-white p-4 sm:p-6">
              <SectionTitle title="Benefits of this Service" subtitle="Why this solution adds value to your business" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Boosts productivity with streamlined workflows",
                  "Ensures security and reliability",
                  "Scales easily with your business",
                  "Delivers modern user experiences",
                  "Backed by expert support",
                  "Reduces long-term costs",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl border border-black/10 bg-white p-3">
                    <Check className="h-5 w-5 text-teal/50 flex-shrink-0 mt-0.5" />
                    <span className="text-black/90">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-6 mt-6 lg:mt-0">
            <div className="space-y-4">
              <div className="rounded-3xl border border-black/10 bg-white p-4 sm:p-6">
                <h3 className="text-black font-semibold text-lg">Quick Actions</h3>
                <p className="text-black/70 text-sm mt-1">Share requirements & get a plan within 24h.</p>

                <ul className="mt-4 space-y-2 text-black/80">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal/50" /> Clear roadmap</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal/50" /> Dedicated manager</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal/50" /> Quality-assured delivery</li>
                </ul>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button onClick={bookNow} className="w-full sm:flex-1 rounded-xl border border-teal/20 px-4 py-2.5 font-medium text-black hover:bg-teal/10 transition">Book Now</button>
                  <button onClick={() => router.push('/contact?intent=talk')} className="w-full sm:flex-1 rounded-xl border border-black/10 px-4 py-2.5 font-medium text-black/80 hover:bg-black/5 transition">Talk to us</button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-black/50">
                  <AlertTriangle className="h-4 w-4" />
                  No hidden fees. Scope approved before build.
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Stat label="Uptime" value="99.9%" />
                <Stat label="Avg. NPS" value="9.1/10" />
                <Stat label="Projects" value="250+" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Tabs & Details */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-6 mt-8 sm:mt-12">
        <div className="rounded-2xl border border-black/10 bg-white p-2">
          <div className="flex flex-wrap gap-2">
            {(['overview','features','includes','faqs'] as const).map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${activeTab===t?'border border-teal/20 text-black':'text-black/70 hover:bg-black/5'}`}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 rounded-xl border border-black/10 bg-white p-4 sm:p-6">
            {activeTab==='overview' && <p className="text-black/80">{service.details || service.description}</p>}
            {activeTab==='features' && <ul className="space-y-2 text-black/90">{service.features?.map((f:string)=> <li key={f}>• {f}</li>)}</ul>}
            {activeTab==='includes' && <ul className="space-y-2 text-black/90">{service.included?.map((f:string)=> <li key={f}>• {f}</li>)}</ul>}
            {activeTab==='faqs' && <ul className="space-y-2 text-black/90">{service.faqs?.map((faq:any,i:number)=><li key={i}><strong>Q:</strong> {faq.q}<br/><strong>A:</strong> {faq.a}</li>)}</ul>}
          </div>
        </div>
      </section>
    </>
  );
}
