"use client";

import { CodeXmlIcon, FileLock, Globe2Icon, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: Globe2Icon,
    title: "Available Worldwide",
    desc: "Our platform enables global cryptocurrency transactions, allowing anyone, anywhere, to invest seamlessly.",
  },
  {
    icon: FileLock,
    title: "Safe and Secure",
    desc: "We prioritize safety and reliability — every transaction and withdrawal is encrypted and fully protected.",
  },
  {
    icon: CodeXmlIcon,
    title: "Instant Withdrawal",
    desc: "Withdrawals are processed instantly with zero delays, giving you access to your funds anytime you need them.",
  },
  {
    icon: TrendingUp,
    title: "Steady Income",
    desc: "Smart trading strategies and risk management tools help ensure consistent profits and sustainable growth.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h5
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="capitalize text-amber-400 font-semibold tracking-wider mb-2"
        >
          Our Features
        </motion.h5>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-14"
        >
          Why People Choose Us
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                whileHover={{
                  scale: 1.07,
                  rotateX: 10,
                  rotateY: -5,
                  backgroundColor: "rgb(37 99 235)", // Tailwind: bg-blue-600
                  color: "#f9fafb", // text-gray-100
                  transition: { duration: 0.4, type: "spring" },
                }}
                className="group relative bg-gray-100 p-8 rounded-2xl shadow-md text-gray-800 
                cursor-pointer hover:shadow-2xl transform-gpu hover:-translate-y-2 transition-all duration-500"
              >
                {/* glowing ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                  bg-gradient-to-tr from-blue-400/20 via-amber-300/10 to-transparent blur-xl transition-opacity duration-500"
                />

                <motion.div
                  className="relative z-10 flex flex-col items-center text-center"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                    {feature.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
