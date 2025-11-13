"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor: string;
  textColor: string;
}

export function PhoneSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      subtitle: "Titanium. So strong. So light. So Pro.",
      description: "Forged in titanium with an all-new design. Now in Nigeria.",
      image: "https://images.unsplash.com/photo-1696446702780-da0c91cb4304?q=80&w=2787&auto=format&fit=crop",
      bgColor: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Google Pixel 8 Pro",
      subtitle: "The best of Google. In a phone.",
      description: "AI-powered photography meets premium design. Available now.",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2787&auto=format&fit=crop",
      bgColor: "bg-gradient-to-br from-blue-50 via-white to-blue-50",
      textColor: "text-gray-900"
    },
    {
      id: 3,
      title: "Samsung Galaxy S24 Ultra",
      subtitle: "Galaxy AI is here.",
      description: "Experience the power of AI in your hands. Premium quality guaranteed.",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2787&auto=format&fit=crop",
      bgColor: "bg-gradient-to-br from-violet-900 via-purple-900 to-violet-900",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "iPhone 14 Pro",
      subtitle: "Pro. Beyond.",
      description: "Dynamic Island. 48MP Main camera. A16 Bionic. Best value today.",
      image: "https://images.unsplash.com/photo-1663499482523-1e752cbcb078?q=80&w=2787&auto=format&fit=crop",
      bgColor: "bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950",
      textColor: "text-white"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          } ${slide.bgColor}`}
        >
          <div className="container mx-auto h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
            {/* Text Content */}
            <div className={`lg:w-1/2 text-center lg:text-left z-10 mt-20 lg:mt-0 ${slide.textColor}`}>
              <h1 className="text-5xl lg:text-7xl font-semibold mb-4 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-2xl lg:text-3xl font-light mb-6 opacity-90">
                {slide.subtitle}
              </p>
              <p className="text-lg lg:text-xl mb-8 opacity-75 max-w-lg mx-auto lg:mx-0">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-all">
                  Shop Now
                </button>
                <button className={`px-8 py-3 border-2 ${slide.textColor === 'text-white' ? 'border-white' : 'border-gray-900'} rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-all`}>
                  Learn More
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full max-w-md lg:max-w-xl h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white bg-opacity-50 hover:bg-opacity-75'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}