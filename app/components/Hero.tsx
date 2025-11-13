"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Slide {
  category: string;
  tagline: string;
  video: string;
  poster: string;
}

const HeroVideoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const slides: Slide[] = [
    {
      category: "iPhones",
      tagline: "Power. Precision. Perfection.",
      video: "/videos/iphone17.mp4",
      poster: "/images/iphones.avif"
    },
    {
      category: "Android",
      tagline: "Smart. Fast. Bold.",
      video: "/videos/pixel9_vid.mp4",
      poster: "/images/android.jpg"
    },
    {
      category: "Accessories",
      tagline: "Perfect Your Setup.",
      video: "/videos/headset.mp4",
      poster: "/images/accessories.jpg"
    }
  ];

  // Handle video playback on slide change
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch((err: Error) => console.log('Video play failed:', err));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentSlide]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number): void => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Subtle gradient clouds */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 right-0 w-96 h-96 md:w-[600px] md:h-[600px] bg-orange-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 md:w-[500px] md:h-[500px] bg-slate-800/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[400px] md:h-[400px] bg-orange-400/3 rounded-full blur-3xl" />
      </div>

      {/* Main Content - Column Layout */}
      <div className="relative flex-1 w-full flex flex-col justify-center items-center z-20 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Text Content - Above Video */}
        <div className="w-full max-w-7xl mx-auto text-center space-y-6 md:space-y-8 mb-8 md:mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/5 rounded-full">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-600 tracking-wider uppercase">
                {slides[currentSlide].category}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-slate-900 tracking-tight leading-none px-4">
              {slides[currentSlide].tagline}
            </h1>
          </div>

          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Discover premium quality gadgets that blend seamlessly with your lifestyle
          </p>

          <div className="flex items-center justify-center gap-6">
            <a 
              href="#shop"
              className="px-6 md:px-8 py-2.5 md:py-3 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 inline-flex items-center gap-2"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Video - Full Width */}
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-95 z-0'
                }`}
              >
                <div className="relative w-full h-full">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-slate-900/10 rounded-2xl md:rounded-3xl z-10" />
                  
                  {/* Video element */}
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-2xl"
                    poster={slide.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={slide.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl md:rounded-3xl z-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Minimal Slide Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? 'w-10 md:w-12 h-1 bg-slate-900'
                : 'w-6 md:w-8 h-1 bg-slate-300 hover:bg-slate-400'
            }`} />
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 30px);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        /* Ensure smooth video transitions on mobile */
        @media (max-width: 768px) {
          video {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroVideoSlider;