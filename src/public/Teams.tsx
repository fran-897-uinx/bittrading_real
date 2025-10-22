"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Member {
  name: string;
  position: string;
  img: string;
}

interface Achievement {
  icon: React.ElementType;
  count: string;
  detail: string;
}

const team: Member[] = [
  { name: "John Smith", position: "CEO", img: "/ceo.jpg" },
  { name: "Sarah Johnson", position: "Marketing Lead", img: "/woman.jpg" },
  { name: "Alex Brown", position: "CTO", img: "/cv.jpg" },
  { name: "Michael Lee", position: "Support Manager", img: "/ceo.jpg" },
];

const achievements: Achievement[] = [
  { icon: Users, count: "243,175", detail: "ACTIVE INVESTORS" },
  { icon: DollarSign, count: "$6,715,101.00", detail: "TOTAL DEPOSIT" },
  { icon: TrendingUp, count: "$754,169,518.00", detail: "TOTAL WITHDRAWALS" },
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-white text-center overflow-hidden">
      <p className="text-black font-light mb-11">Note: There is no withdrawals fee</p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-700 mb-12"
      >
        Our Dedicated Team
      </motion.h2>

      {/* Team Members */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8 px-6">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col items-center group"
          >
            <div className="relative">
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 rounded-sm mb-4 bg-cover border-4 border-transparent transition-all duration-500 scale-120"
              />
              <div className="absolute inset-0 rounded-sm bg-blue-600/10 opacity-0 transition-all duration-500"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <p className="text-gray-500 text-sm">{member.position}</p>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-6 mt-16"
      >
        {achievements.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card className="shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="flex flex-col items-center justify-center py-8 gap-3">
                  <div className="bg-blue-600/10 p-4 rounded-full">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{item.count}</h2>
                  <p className="text-gray-500 text-sm font-medium tracking-wide">
                    {item.detail}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
