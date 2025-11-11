"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Smartphone, Headphones } from "lucide-react";
import Image from "next/image";

export default function Nav() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const navItems = [
    {
      name: "iPhones",
      link: "#iphone",
      icon: Smartphone,
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
      name: "Android",
      link: "#android",
      icon: Smartphone,
      dropdown: {
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
        categories: [
          { name: "Brand New", desc: "Factory sealed phones", link: "#new-android" },
          { name: "UK Used", desc: "Quality pre-owned", link: "#uk-android" },
          { name: "Samsung Galaxy", desc: "Premium Galaxy series", link: "#samsung" },
          { name: "Trade-In", desc: "Exchange your phone", link: "#trade-android" },
        ]
      }
    },
    {
      name: "Accessories",
      link: "#accessories",
      icon: Headphones,
      dropdown: {
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        categories: [
          { name: "Cases & Protection", desc: "Keep devices safe", link: "#cases" },
          { name: "Chargers & Cables", desc: "Power solutions", link: "#chargers" },
          { name: "Audio", desc: "Headphones & speakers", link: "#audio" },
          { name: "Screen Protection", desc: "Tempered glass & films", link: "#screen" },
        ]
      }
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full mt-16">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          
          {/* Custom Nav Items with Dropdowns */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`nav-${idx}`}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(idx)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <a
                    href={item.link}
                    className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors py-2 font-medium"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </a>

                  {/* Dropdown Mega Menu */}
                  {hoveredItem === idx && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden w-[500px]">
                        <div className="grid grid-cols-2 gap-0">
                          {/* Image Section */}
                          <div className="relative h-full min-h-[280px] bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                            <Image
                              src={item.dropdown.image}
                              alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                              <h3 className="text-xl font-bold">{item.name}</h3>
                              <p className="text-sm text-white/80">Explore our collection</p>
                            </div>
                          </div>

                          {/* Categories Section */}
                          <div className="p-6 space-y-1">
                            {item.dropdown.categories.map((category, catIdx) => (
                              <a
                                key={catIdx}
                                href={category.link}
                                className="block p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                              >
                                <div className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {category.name}
                                </div>
                                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                                  {category.desc}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <NavbarButton variant="primary">Shop Now</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Shop
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}