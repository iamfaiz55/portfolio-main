// import ProjectsSection from "@/components/mini/ProjectsSection";
import ProjectsSection from "@/components/mini/ProjectsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Faizuddin Shaikh",
  description:
    "Explore the IT projects by Faizuddin Shaikh — web development, mobile apps, cloud solutions, and more.",
  keywords: [
    "Faizuddin Shaikh",
    "IT projects Aurangabad",
    "web development",
    "mobile apps",
    "cloud solutions",
    "portfolio",
    "projects",
  ],
  openGraph: {
    title: "Faizuddin Shaikh | Projects",
    description:
      "Discover IT projects by Faizuddin Shaikh: web, mobile, cloud, and more.",
    url: "https://shaikhfaiz.top/pages/projects",
    siteName: "Faizuddin Shaikh Portfolio",
    type: "website",
    images: [
      {
        url: "https://shaikhfaiz.top/og-projects.jpg", // replace with your image
        width: 1200,
        height: 630,
        alt: "Faizuddin Shaikh - Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faizuddin Shaikh | Projects",
    description:
      "Discover IT projects by Faizuddin Shaikh — web, mobile, cloud, and more.",
    images: ["https://shaikhfaiz.top/og-projects.jpg"],
  },
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}