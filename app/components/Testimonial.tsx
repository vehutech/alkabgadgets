import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Testimonials() {
  const testimonials = [
    {
        quote:
        "I was skeptical about buying my Samsung Galaxy S24 Ultra online, but their customer service was top-notch. Fast delivery to Abuja and the phone came with all original accessories. Very reliable!",
      name: "Amina Bello",
      designation: "Content Creator in Abuja",
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I got my iPhone 15 Pro Max from them and the experience was amazing. Genuine products, great prices, and they even helped me set it up. Best phone store in Lagos!",
      name: "Chidi Okonkwo",
      designation: "Business Owner in Victoria Island",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Their accessories are quality and affordable. Got AirPods Pro, phone cases, and screen protectors all at once. They threw in a free charger as a bonus. These guys know how to treat customers!",
      name: "Tunde Adeleke",
      designation: "Software Developer in Lekki",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Bought three iPhones for my staff and the bulk discount was generous. Plus, they offer warranty and after-sales support. This is the kind of professionalism we need in Nigeria.",
      name: "Ngozi Eze",
      designation: "CEO at a Tech Startup",
      src: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "My Google Pixel 8 arrived in Port Harcourt within 24 hours! The packaging was secure and the phone is 100% original. I've recommended them to all my friends and family.",
      name: "Ibrahim Yusuf",
      designation: "Digital Marketer in Port Harcourt",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true}/>;
}