import React from 'react';
import { Smartphone, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import Image from 'next/image';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="min-h-70vh bg-gray-900 text-gray-300">
      <div className="pt-10 max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                className='bg-yellow-100 p-4 rounded-2xl'
                src="/images/logo_m.png"
                width={200}
                height={100}
                alt='logo'
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted destination for genuine iPhones, Android devices, and premium accessories across Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">iPhones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Android Devices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trade-In</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  Sule Oyidi St, opposite Federal University Lokoja, Lokoja 260101, Kogi
                  </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+234 806 253 6372">+234 806 253 6372</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+234 905 838 5160">+234 905 838 5160</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:sales@alkabgadgets.com"></a>
                <span>sales@alkabgadgets.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} PhoneStore. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;