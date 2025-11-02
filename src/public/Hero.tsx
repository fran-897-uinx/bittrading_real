"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";

export default function Hero() {
  const slides = [
    {
      title: "Best Place To Grow Your Business",
      subtitle: "Profitable investments for real investors.",
      img: "/concept.jpg",
    },
    {
      title: "Your Success Is Our Priority",
      subtitle: "We provide secure and reliable trading solutions.",
      img: "/bplant.jpg",
    },
    {
      title: "Build Wealth With Confidence",
      subtitle: "Join thousands of investors worldwide.",
      img: "/bit.jpg",
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // 🔁 Auto-slide forward & backward
  useEffect(() => {
    if (!api) return;

    let direction: "next" | "prev" = "next";
    const total = slides.length;

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

  // Track current slide for dot indicator
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    handleSelect();
  }, [api]);

  return (
    <section
      id="home"
      className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden pb-2"
    >
      <Carousel setApi={setApi} className="w-full mx-auto">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className="relative w-full h-[95vh] border-0 shadow-none">
                <CardContent
                  className="relative w-full h-full flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.img})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="relative z-10 max-w-2xl px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg mb-6 text-gray-200">
                      {slide.subtitle}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button className="bg-blue-600 px-6 py-3 rounded-4xl font-semibold hover:bg-blue-700 cursor-pointer">
                        <Link href="/signup">Get Started</Link>
                      </button>
                      <button className="border border-white px-6 py-3 rounded-4xl font-semibold hover:bg-white hover:text-blue-600 cursor-pointer">
                        <Link href="/login">Login</Link>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots navigation (bottom-right corner) */}
        <div className="absolute md:bottom-70 md:right-10 flex gap-2 z-20 md:grid  bottom-10 right-35">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                current === index
                  ? "bg-blue-600 scale-110"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
