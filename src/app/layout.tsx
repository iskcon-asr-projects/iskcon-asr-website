import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google";
import "./globals.css";

import ErrorBoundary from "@/Components/ErrorBoundary";
import Footer from "@/Components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISKCON Amritsar",
  description: "Official Website of ISKCON Amritsar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cinzel.variable} antialiased`}
    >
      <body className="font-sans w-full bg-[#050505] text-white selection:bg-[#C5A059]/30 selection:text-[#C5A059]">
        <ErrorBoundary>
          {children}
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
