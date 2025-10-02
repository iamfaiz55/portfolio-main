// app/services/[id]/page.tsx
import { notFound } from "next/navigation";
import ServiceDetails from "@/components/ServicesDetails";
import type { Metadata } from "next";

const base = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function generateStaticParams() {
  if (!base) return [];
  try {
    const res = await fetch(`${base}/services`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const list: Array<{ _id: string }> = await res.json();
    return list.map((s) => ({ id: s._id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  if (!base || !params.id) return {};

  try {
    const res = await fetch(`${base}/services/${params.id}`, { next: { revalidate: 60 } });
    if (!res.ok) return {};

    const service = await res.json();

    const title = service.title ? `${service.title} | Inficom Solutions` : "IT Services | Inficom Solutions";
    const description =
      service.description ||
      `Explore professional IT services offered by Inficom Solutions in Aurangabad (Chhatrapati Sambhajinagar), including web development, mobile apps, cloud solutions, and cybersecurity.`;
    const image = service.image || "https://shaikhfaiz.top/default-service.jpg";
    const url = `https://shaikhfaiz.top/services/${service._id}`;

    return {
      title,
      description,
      keywords: [
        service.title ? `${service.title} Aurangabad` : "IT Services Aurangabad",
        service.title ? `${service.title} Chhatrapati Sambhajinagar` : "Software Company Chhatrapati Sambhajinagar",
        "Inficom Solutions",
        "IT Services",
        "Web Development",
        "Mobile Apps",
        "Cloud Solutions",
        "Cybersecurity",
      ],
      openGraph: {
        title,
        description,
        url,
        siteName: "Inficom Solutions",
        type: "article",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {};
  }
}

export default function Page({ params }: { params: { id: string } }) {
  if (!params.id) notFound();
  return <ServiceDetails id={params.id} />;
}
