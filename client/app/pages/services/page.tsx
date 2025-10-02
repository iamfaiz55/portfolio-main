// app/pages/services/page.tsx
import ServicesSection from "@/components/mini/ServicesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Services & Projects | Faizuddin Shaikh",
  description:
    "Explore the IT projects and services by Faizuddin Shaikh — web development, mobile apps, cloud solutions, and cybersecurity.",
  keywords: [
    "Faizuddin Shaikh",
    "IT services Aurangabad",
    "web development",
    "mobile apps",
    "cloud solutions",
    "cybersecurity",
    "portfolio",
  ],
  openGraph: {
    title: "Faizuddin Shaikh | IT Services & Projects",
    description:
      "Discover IT services and projects by Faizuddin Shaikh: web, mobile, cloud, and cybersecurity solutions.",
    url: "https://shaikhfaiz.top/pages/services",
    siteName: "Faizuddin Shaikh Portfolio",
    type: "website",
    images: [
      {
        url: "https://shaikhfaiz.top/og-services.jpg", // replace with your image
        width: 1200,
        height: 630,
        alt: "Faizuddin Shaikh - IT Services & Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faizuddin Shaikh | IT Services & Projects",
    description:
      "Discover software and IT services by Faizuddin Shaikh — web, mobile, cloud, and cybersecurity solutions.",
    images: ["https://shaikhfaiz.top/og-services.jpg"],
  },
};

export default function ServicesPage() {
  return <ServicesSection />;
}
