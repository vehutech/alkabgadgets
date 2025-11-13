import type { Metadata } from "next";

import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import localFont from "next/font/local";

const quickSandFont = localFont({
  src: [
    {
      path: "../public/fonts/Quicksand_Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Quicksand_Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Quicksand_Bold.otf",
      weight: "700",
      style: "normal",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quickSandFont.variable}>
      <body className="antialiased -tracking-[0.1em]">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
