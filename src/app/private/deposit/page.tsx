"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface DepositOption {
  name: string;
  image: string;
}

const depositOptions: DepositOption[] = [
  {
    name: "BITCOIN",
    image: "/bitcoin1.jpg", // replace with your actual image path
  },
  {
    name: "USDT",
    image: "/usdt.jpg", // replace with your actual image path
  },
];

export default function DepositPage() {
  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Deposit Options
        </h1>

        {/* Deposit Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {depositOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition-all text-center overflow-hidden">
                {/* Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={option.image}
                    alt={option.name}
                    fill
                    className="object-contain p-6 scale-130"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4">
                    {option.name}
                  </h2>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer">
                    Pay Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
