"use client"

import React, { useState } from 'react';
import { Smartphone, Monitor, Headphones, Repeat, X } from 'lucide-react';
import Image from 'next/image';

export default function MobileShop() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);


  interface Category  {
      id: number;
      name: string;
      icon: React.RefAttributes<SVGSVGElement>
      gradient: string;
      items: string,
      dropdown: {
        image: string;
        categories: 
          { 
            name: string;
            desc: string;
            link: string;
          }[]
      }
  }
  const categories = [
    {
      id: 1,
      name: 'iPhones',
      icon: Smartphone,
      gradient: 'from-[#fb8c14] to-[#ff6b35]',
      items: '50+ models',
      dropdown: {
        image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=300&fit=crop",
        categories: [
          { name: "Brand New", desc: "Latest sealed devices", link: "#new-iphones" },
          { name: "UK Used", desc: "Premium pre-owned", link: "#uk-iphones" },
          { name: "Nigerian Used", desc: "Certified like-new", link: "#refurb-iphones" },
          { name: "Trade-In", desc: "Upgrade your device", link: "#trade-iphones" },
        ]
      }
    },
    {
      id: 2,
      name: 'Android',
      icon: Monitor,
      gradient: 'from-[#282358] to-[#4a3f8f]',
      items: '100+ models',
      dropdown: {
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
        categories: [
          { name: "Brand New", desc: "Factory sealed phones", link: "#new-android" },
          { name: "UK Used", desc: "Quality pre-owned", link: "#uk-android" },
          
          { name: "Trade-In", desc: "Exchange your phone", link: "#trade-android" },
        ]
      }
    },
    {
      id: 3,
      name: 'Swap',
      icon: Repeat,
      gradient: 'from-[#8b4a9e] to-[#fb8c14]',
      items: 'Trade devices',
      dropdown: {
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
        categories: [
          { name: "iPhone Swap", desc: "Exchange your iPhone", link: "#swap-iphone" },
          { name: "Android Swap", desc: "Trade Android devices", link: "#swap-android" },
          { name: "Upgrade Program", desc: "Easy upgrade options", link: "#upgrade" },
          { name: "Value Calculator", desc: "Check device worth", link: "#calculator" },
        ]
      }
    },
    {
      id: 4,
      name: 'Accessories',
      icon: Headphones,
      gradient: 'from-[#fb8c14] via-[#8b4a9e] to-[#282358]',
      items: '200+ items',
      fullWidth: true,
      dropdown: {
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        categories: [
          { name: "Cases & Protection", desc: "Keep devices safe", link: "#cases" },
          { name: "Chargers & Cables", desc: "Power solutions", link: "#chargers" },
          { name: "Audio", desc: "Headphones & speakers", link: "#audio" },
          { name: "Screen Protection", desc: "Tempered glass & films", link: "#screen" },
        ]
      }
    }
  ];

  const handleCategoryClick = (category: Category) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(category);
    }, 400);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setIsAnimating(false);
  };

  const getScatterClass = (index: number) => {
    const directions = [
      '-translate-x-[200%] -translate-y-[200%] rotate-[-45deg]',
      'translate-x-[200%] -translate-y-[200%] rotate-[45deg]',
      '-translate-x-[200%] translate-y-[100%] rotate-[45deg]',
      'translate-x-[200%] translate-y-[100%] rotate-[-45deg]'
    ];
    return directions[index];
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-[#1a1640] to-[#0f0d2e] flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-500 ${isAnimating ? 'opacity-0 -translate-y-10' : 'opacity-100'}`}>
           <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-none">
                Alkab Gadgets
              </h1>
          <p className="text-gray-400 text-sm">Choose your category</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* First Row - iPhones, Android, Swap */}
          {categories.slice(0, 3).map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${category.gradient} p-4 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl
                  ${isAnimating ? `opacity-0 scale-50 ${getScatterClass(index)}` : 'opacity-100 scale-100'}`}
              >
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  <h2 className="text-sm font-bold text-white text-center leading-tight">{category.name}</h2>
                  <p className="text-white/80 text-[10px] font-medium">{category.items}</p>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </button>
            );
          })}

          {/* Second Row - Accessories (Full Width) */}
          {categories.slice(3).map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id+index}
                onClick={() => handleCategoryClick(category)}
                className={`group col-span-3 relative overflow-hidden rounded-2xl bg-linear-to-br ${category.gradient} p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl
                  ${isAnimating ? `opacity-0 scale-50 ${getScatterClass(3)}` : 'opacity-100 scale-100'}`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    <div className="text-left">
                      <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                      <p className="text-white/80 text-xs font-medium mt-1">{category.items}</p>
                    </div>
                  </div>
                  <div className="text-white/60">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </button>
            );
          })}
        </div>

        {/* Dropdown Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-linear-to-br from-[#282358] to-[#1a1640] rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
              {/* Header with Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  fill
                  src={selectedCategory.dropdown.image} 
                  alt={selectedCategory.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#282358] to-transparent" />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 flex items-center space-x-3">
                  {React.createElement(selectedCategory.icon, { className: "w-8 h-8 text-white", strokeWidth: 2.5 })}
                  <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
                </div>
              </div>

              {/* Categories List */}
              <div className="p-6 space-y-3">
                {selectedCategory.dropdown.categories.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="block bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 hover:translate-x-2 border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-base">{item.name}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                      </div>
                      <svg className="w-5 h-5 text-[#fb8c14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}