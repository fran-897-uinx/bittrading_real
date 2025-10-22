"use client";

import { BookUserIcon, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: BookUserIcon,
      title: "Create Your Account",
      desc: "Register a free account and start your first step to passive income.",
    },
    {
      icon: Wallet,
      title: "Make Your Deposit",
      desc: "Invest your preferred amount and get a stable daily income.",
    },
    {
      icon: TrendingUp,
      title: "Withdraw Profits",
      desc: "Withdraw your earnings whenever it is due.",
    },
  ];

  // animation containers
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateY: 15 },
    show: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 text-center overflow-hidden relative">
      <motion.h5
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="capitalize text-blue-500 font-bold font-mono text-sm"
      >
        Our Working Process
      </motion.h5>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-14 font-mono mt-2"
      >
        How It Works
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 gap-10 px-8 relative"
      >
        {/* Connecting line for large screens */}
        <div className="hidden md:block absolute top-24 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 z-0 px-12"></div>

        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative z-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              {/* Number bubble */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="w-15 h-15 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 text-white font-bold rounded-full absolute -top-2 right-1/12 transform -translate-x-1/2 shadow-md "
              >
                {`0${i + 1}`}
              </motion.div>

              {/* Icon */}
              <motion.div
                className="flex justify-center items-center mb-4 mt-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <Icon className="w-12 h-12 text-blue-600" />
              </motion.div>

              {/* Text */}
              <h3 className="text-xl font-semibold mb-3 uppercase text-gray-800">
                {s.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
