"use client";

import { motion } from "framer-motion";
import {
  GitCompareIcon,
  MessagesSquareIcon,
  UserRoundCheckIcon,
} from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
            About Us
          </h2>

          <p className="text-gray-600 leading-relaxed">
            BitTrading specializes in forex and cryptocurrency trading. Our
            expert team of analysts and strategists use modern AI-powered
            trading tools and deep market insights to generate consistent
            results. Over the years, we’ve built a reputation for trust,
            transparency, and performance in the digital financial world.
          </p>

          <p className="text-gray-600 leading-relaxed">
            With a legally registered status, excellent customer support, and
            transparent operations, BitTrading is committed to providing
            investors with sustainable profits and a seamless trading
            experience.
          </p>

          {/* Mini Cards / Icons */}
          <div className="grid sm:grid-cols-2 gap-8 pt-6">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start p-5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg"
            >
              <GitCompareIcon className="text-blue-600 w-8 h-8 mb-3" />
              <h3 className="font-semibold text-gray-800 text-lg">
                Registered Company
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mt-2">
                We are a legally registered company in Finland, providing
                professional investment services globally.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start p-5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg"
            >
              <MessagesSquareIcon className="text-blue-600 w-8 h-8 mb-3" />
              <h3 className="font-semibold text-gray-800 text-lg">
                Great Customer Support
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mt-2">
                Our support team is available 24/7 to assist you with any
                inquiries or technical issues.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center items-center"
        >
          {/* Main image */}
          <motion.img
            src="/bit.jpg"
            alt="About BitTrading"
            className="rounded-2xl shadow-2xl w-full h-92 max-w-md object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />

          {/* Overlay small image */}
          <motion.img
            src="/bplant.jpg"
            alt="Investment strategy"
            className="hidden md:block absolute -bottom-10 -right-10 w-48 h-40 object-cover rounded-xl shadow-xl border-4 border-white"
            whileHover={{ rotate: 2, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50 via-transparent to-blue-100 opacity-40" />
    </section>
  );
}
