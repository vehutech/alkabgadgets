"use client";

import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      category: "iPhones",
      tagline: "Elegance Redefined",
      image: "/images/iphones.avif"
    },
    {
      category: "Android",
      tagline: "Innovation Unleashed",
      image: "images/android.jpg"
    },
    {
      category: "Accessories",
      tagline: "Perfect Companions",
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Subtle gradient clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-800/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-400/3 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/5 rounded-full">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-slate-600 tracking-wider uppercase">
                  {slides[currentSlide].category}
                </span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-slate-900 tracking-tight leading-none">
                {slides[currentSlide].tagline}
              </h1>
            </div>

            <p className="text-lg text-slate-600 max-w-md font-light leading-relaxed">
              Discover premium quality gadgets that blend seamlessly with your lifestyle
            </p>

            <div className="flex items-center gap-6">
              <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20">
                Shop Now
              </button>
              
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative lg:h-[600px] h-[400px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-slate-900/10 rounded-3xl" />
                  <img
                    src={slide.image}
                    alt={slide.category}
                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-3xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Minimal Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? 'w-12 h-1 bg-slate-900'
                : 'w-8 h-1 bg-slate-300 hover:bg-slate-400'
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
      `}</style>
    </div>
  );
};

export default HeroSlider;