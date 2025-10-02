import Home from "@/components/Home";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Shaikh Faiz | IT Solutions & Personal Portfolio",
  description:
    "Shaikh Faiz - Expert in IT solutions, web & mobile development, cloud solutions, and cybersecurity. Explore his work and portfolio online.",
  keywords: [
    "Shaikh Faiz",
    "Shaikh Faiz portfolio",
    "Shaikh Faiz IT solutions",
    "web developer Aurangabad",
    "mobile apps Aurangabad",
    "cloud solutions Aurangabad",
    "cybersecurity expert Aurangabad",
  ],
  openGraph: {
    title: "Shaikh Faiz | IT Solutions & Portfolio",
    description:
      "Explore Shaikh Faiz's portfolio and IT expertise in web development, mobile apps, cloud solutions, and cybersecurity.",
    url: "https://shaikhfaiz.top",
    siteName: "Inficom Solutions",
    type: "website",
    images: [
      {
        url: "https://shaikhfaiz.top/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Shaikh Faiz - IT Portfolio & Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaikh Faiz | IT Portfolio & Services",
    description:
      "Discover Shaikh Faiz’s expertise in IT services including web development, mobile apps, cloud solutions, and cybersecurity.",
    images: ["https://shaikhfaiz.top/og-home.jpg"],
  },
  metadataBase: new URL("https://shaikhfaiz.top"),
};

export default function HomePage() {
  return (
    <>
      <Home />

      {/* JSON-LD Structured Data */}
      <Script
        id="ld-json-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Shaikh Faiz",
            url: "https://inficomsolutions.in",
            image: "https://inficomsolutions.in/og-home.jpg",
            jobTitle: "IT Solutions Expert & Developer",
            sameAs: [
              "https://www.linkedin.com/in/shaikh-faiz/",
              "https://www.facebook.com/inficomsolutions/",
              "https://x.com/inficomsolution",
              "https://www.instagram.com/shaikhfaiz/",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Inficom Solutions",
              url: "https://inficomsolutions.in",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-8888795875",
              contactType: "Customer Service",
              areaServed: "IN",
              availableLanguage: ["en", "hi", "mr"],
            },
          }),
        }}
      />
    </>
  );
}
