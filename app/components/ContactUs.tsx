"use client"

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-3">Get in Touch</h2>
          <p className="text-gray-500">We&apos; d love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                <div className='flex flex-col'>
                <a href="tel:+234 806 253 6372">+234 806 253 6372</a>
                <a href="tel:+234 905 838 5160">+234 905 838 5160</a>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                <a href="mailto:sales@alkabgadgets.com">sales@alkabgadgets.com</a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">Sule Oyidi St</p>
                <p className="text-gray-600">Opposite Federal University Lokoja, Lokoja 260101, Kogi</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 group"
              >
                <span>{isSubmitted ? 'Message Sent!' : 'Send Message'}</span>
                <Send className={`w-4 h-4 transition-transform ${isSubmitted ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}