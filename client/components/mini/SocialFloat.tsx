import { motion } from "framer-motion";

type Item = {
  name: string;
  href: string;
  bg: string;        // Tailwind color class
  delay: number;     // small staggering for the bob
  icon: JSX.Element; // inline SVG
};

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="h-9 w-9 rounded-full flex items-center justify-center text-white shadow-lg shadow-black/20 hover:shadow-xl transition-transform duration-200 group-hover:scale-105">
    {children}
  </div>
);

export default function SocialFloat() {
  const items: Item[] = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/shaikh.faiz.606952#",
      bg: "bg-[#1877F2]",
      delay: 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.01 3.66 9.16 8.44 9.93v-7.02H7.9v-2.9h2.4V9.41c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.9h-2.21V22c4.78-.77 8.44-4.92 8.44-9.93Z"/>
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/9960669724", // replace with your WhatsApp number
      bg: "bg-[#25D366]",
      delay: 0.15,
      icon: (
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M16 .396C7.163.396.007 7.55.007 16.396c0 2.883.756 5.715 2.192 8.201L.396 31.604l7.242-1.873c2.397 1.31 5.096 2.002 7.937 2.002h.008c8.837 0 15.993-7.154 15.993-16 0-4.266-1.664-8.276-4.685-11.295C24.277 2.06 20.266.396 16 .396zm0 29.21c-2.516 0-4.965-.675-7.098-1.953l-.51-.301-4.298 1.111 1.145-4.19-.28-.528c-1.378-2.596-2.106-5.53-2.106-8.349 0-8.268 6.729-14.996 14.998-14.996 3.998 0 7.757 1.558 10.584 4.385 2.827 2.827 4.383 6.586 4.383 10.584 0 8.269-6.728 14.997-14.998 14.997zm8.207-10.802c-.45-.225-2.664-1.313-3.076-1.463-.411-.15-.71-.225-1.009.226-.3.45-1.159 1.463-1.422 1.763-.263.3-.525.338-.975.113-.45-.226-1.9-.7-3.623-2.231-1.338-1.192-2.24-2.662-2.502-3.112-.262-.45-.028-.693.197-.918.202-.201.45-.525.676-.788.225-.263.3-.45.45-.75.15-.3.075-.563-.038-.788-.112-.226-1.008-2.427-1.382-3.325-.364-.876-.736-.757-1.008-.772-.263-.012-.563-.015-.863-.015s-.788.113-1.2.563c-.412.45-1.575 1.538-1.575 3.75s1.611 4.35 1.836 4.65c.225.3 3.169 4.836 7.689 6.783 1.074.464 1.911.741 2.563.947 1.076.343 2.054.295 2.829.179.863-.129 2.664-1.088 3.04-2.138.376-1.05.376-1.95.263-2.138-.113-.188-.413-.3-.863-.525z"/>
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://x.com/Iamfaiz55",
      bg: "bg-black",
      delay: 0.3,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M18.244 2H21l-6.49 7.41L22 22h-6.828l-4.67-6.088L4.96 22H2.2l6.94-7.92L2 2h6.913l4.218 5.632L18.244 2Zm-1.197 18.4h1.69L7.03 3.52H5.26l11.787 16.88Z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/iamfaizz55",
      bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
      delay: 0.45,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "linkedin.com/in/shaikh-faiz-3b7119270/",
      bg: "bg-[#0A66C2]",
      delay: 0.6,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.238-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.75 20h-2.5v-11h2.5v11zm-1.25-12.268c-.828 0-1.5-.674-1.5-1.5s.672-1.5 1.5-1.5c.826 0 1.5.674 1.5 1.5s-.674 1.5-1.5 1.5zm14.25 12.268h-2.5v-5.604c0-1.337-.025-3.061-1.865-3.061-1.867 0-2.153 1.459-2.153 2.963v5.702h-2.5v-11h2.4v1.505h.034c.334-.633 1.15-1.298 2.368-1.298 2.532 0 3.216 1.668 3.216 3.835v6.958z"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      className="fixed right-4 bottom-4 z-[60] flex flex-col gap-3 overflow-hidden p-5"
      aria-label="Social links"
    >
      {items.map((item) => (
        <motion.a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className={`group ${item.bg} rounded-full`}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: [0, -4, 0], opacity: [0.9, 1, 0.9] }}
          transition={{
            duration: 2.2,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          whileHover={{
            y: -6,
            scale: 1.05,
            opacity: 1,
            transition: { duration: 0.15 },
          }}
        >
          <IconWrap>{item.icon}</IconWrap>
        </motion.a>
      ))}
    </div>
  );
}
