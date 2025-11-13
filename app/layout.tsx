import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Geist Mono — default global font
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Quicksand — for special headings only
const quickSandFont = localFont({
  src: [
    {
      path: "../public/fonts/Quicksand_Light.otf",
      weight: "300",
      style: "normal"
    },
    {
      path: "../public/fonts/Quicksand_Book.otf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/Quicksand_Bold.otf",
      weight: "700",
      style: "normal"
    },
  ],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alkab Gadgets",
  description: "Your one-stop shop for premium smartphones and accessories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${quickSandFont.variable}`}
    >
      <body className="antialiased font-[var(--font-geist-mono)]">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
