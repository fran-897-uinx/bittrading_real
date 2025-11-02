"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  name: string;
  role: string;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Hugo Ruithno",
    role: "Investor",
    comment: "BitTrading has completely changed my financial strategy!",
  },
  {
    name: "Mirko Rades",
    role: "Trader",
    comment:
      "Secure, fast withdrawals and excellent support. Highly recommend!",
  },
  {
    name: "Aisha Bello",
    role: "Entrepreneur",
    comment:
      "I’ve doubled my investments safely and quickly. Amazing platform!",
  },
  {
    name: "Aisha Bello",
    role: "Entrepreneur",
    comment:
      "I’ve doubled my investments safely and quickly. Amazing platform!",
  },
  {
    name: "Aisha Bello",
    role: "Entrepreneur",
    comment:
      "I’ve doubled my investments safely and quickly. Amazing platform!",
  },
  {
    name: "Aisha Bello",
    role: "Entrepreneur",
    comment:
      "I’ve doubled my investments safely and quickly. Amazing platform!",
  },
  {
    name: "Aisha Bello",
    role: "Entrepreneur",
    comment:
      "I’ve doubled my investments safely and quickly. Amazing platform!",
  },
  {
    name: "Aisha Bello",
    role: "Entrepreneur",
    comment:
      "I’ve doubled my investments safely and quickly. Amazing platform!",
  },
];

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // 🔁 Auto-slide forward & backward
  useEffect(() => {
    if (!api) return;

    let direction: "next" | "prev" = "next";
    const total = testimonials.length;

    const interval = setInterval(() => {
      const currentIndex = api.selectedScrollSnap();

      if (direction === "next") {
        if (currentIndex === total - 1) {
          direction = "prev";
          api.scrollPrev();
        } else {
          api.scrollNext();
        }
      } else {
        if (currentIndex === 0) {
          direction = "next";
          api.scrollNext();
        } else {
          api.scrollPrev();
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  // 🔘 Track current slide for indicators
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", handleSelect);
    handleSelect();
  }, [api]);
  useEffect(() => {
    const canvas = document.getElementById("dots-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    let animationFrame: number;

    const dots = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1.5, // slightly larger
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.x += dot.dx;
        dot.y += dot.dy;

        // bounce effect on edges
        if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;

        // glowing white dot
        const gradient = ctx.createRadialGradient(
          dot.x,
          dot.y,
          0,
          dot.x,
          dot.y,
          dot.r * 3
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-20 text-white text-center overflow-hidden bg-[url('/map.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply"
    >
      {/* 🔵 Dark overlay blend for dim effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 opacity-90 mix-blend-multiply"></div>

      {/* subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10 mix-blend-soft-light"></div>

      <div className="relative z-10">
        <h5 className="text-blue-400 font-semibold uppercase tracking-widest mb-2">
          Our Clients
        </h5>
        <h2 className="text-3xl font-bold mb-12">What People Say About Us</h2>

        {/* Animated Dots Canvas Background */}
        <canvas
          id="dots-canvas"
          className="absolute inset-0 w-full h-full"
        ></canvas>
        <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto relative">
          <CarouselContent>
            {testimonials.map((t, i) => (
              <CarouselItem key={i}>
                <AnimatePresence mode="wait">
                  {current === i && (
                    // <motion.div
                    //   key={i}
                    //   initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    //   animate={{ opacity: 1, scale: 1, y: 0 }}
                    //   exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    //   transition={{ duration: 0.6 }}
                    // >
                    <div className="bg-blue-800/40 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-2xl shadow-lg max-w-3xl mx-auto">
                      <p className="italic text-lg md:text-xl mb-6">
                        “{t.comment}”
                      </p>
                      <h4 className="font-semibold text-xl">{t.name}</h4>
                      <span className="text-sm text-gray-300">{t.role}</span>
                    </div>
                    // </motion.div>
                  )}
                </AnimatePresence>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* dots */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === i
                    ? "bg-blue-500 scale-125"
                    : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
