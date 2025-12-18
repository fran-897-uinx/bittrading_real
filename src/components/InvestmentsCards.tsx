"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import InvestModal from "./dashboard/InvestModal";
import { useState } from "react";

interface InvestmentPlan {
  name: string;
  rate: string; // e.g. "20.00 USD" or "120%"
  duration: string; // e.g. "Every 48 Hours"
  min: string | number;
  max: string | number;
  times: string | number;
  capital: string;
  affiliate: string[]; // e.g. ["5%", "10%", "15%", "20%", "25%"]
}

interface InvestmentCardProps {
  plan: InvestmentPlan;
  index: number;
}

export function InvestmentCard({ plan, index }: InvestmentCardProps) {
  // const [selected, setSelected] = useState<(typeof )[0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-center ">
        <div className="relative bg-white border border-slate-200 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all w-full max-w-sm">
          {/* Header badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow text-center">
            {plan.name}
          </div>

          {/* Card content */}
          <div className="p-6 pt-20 text-center">
            <p className="text-2xl font-bold text-blue-600">{plan.rate}</p>
            <p className="text-gray-500 mb-4">{plan.duration}</p>

            <div className="text-sm space-y-1 mb-4 text-slate-700">
              <p>
                <strong>Min:</strong> {plan.min}
              </p>
              <p>
                <strong>Max:</strong> {plan.max}
              </p>
              <p>
                <strong>For:</strong> {plan.times}
              </p>
              <p>
                <strong>Capital Back:</strong> {plan.capital}
              </p>
            </div>

            {/* Affiliate bonus */}
            <div className="mb-6">
              <p className="font-semibold text-sm text-slate-600 mb-2">
                Affiliate Bonus
              </p>
              <div className="flex justify-center gap-2 text-xs text-slate-700 flex-wrap">
                {plan.affiliate.map((bonus, i) => (
                  <span key={i} className="bg-slate-100 px-2 py-1 rounded">
                    {bonus}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                Invest Now
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                Invest using Balance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
