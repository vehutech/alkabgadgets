"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ThreeDMarqueeDemo() {
  const images = [
    "/images/iphone-17.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphones.avif",
    "/images/android.jpg",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/android.jpg",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/android.jpg",
    "/images/android.jpg",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
    "/images/iphone-17.png",
  ];
  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
