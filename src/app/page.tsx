"use client";
import { useEffect, useState } from "react";
import About from "@/public/About";
import Features from "@/public/Features";
import Footer from "@/public/Footer";
import Hero from "@/public/Hero";
import HowItWorks from "@/public/Howitworks";
import MarketTable from "@/public/Market";
import Navbar from "@/public/Navbar";
import Plans from "@/public/Plans";
import SpecialPlans from "@/public/Splans";
import Team from "@/public/Teams";
import Testimonials from "@/public/Testimonial";
import { ArrowUpCircle, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Show scroll button
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Plans />
      <SpecialPlans />
      <MarketTable />
      <Testimonials />
      <Team />
      <Footer />

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-blue-600 hover:bg-blue-500 transition-all text-white p-3 rounded-full shadow-lg z-50 animate-pulse mb-4"
        >
          <ArrowUpCircle size={26} />
        </button>
      )}
    </div>
  );
}
