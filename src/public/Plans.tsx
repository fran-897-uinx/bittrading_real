"use client";

import { DollarSign, Gem, BarChart3, Coins } from "lucide-react";
import * as React from "react";

interface Plan {
  icon: React.ElementType;
  name: string;
  rate: string;
  duration: string;
  min: string;
  max: string;
  referral: string;
}

const plans: Plan[] = [
  {
    icon: Gem,
    name: "Silver Plan",
    rate: "20% AFTER 2 Days",
    duration: "2 Days",
    min: "$100",
    max: "$999",
    referral: "2%",
  },
  {
    icon: Coins,
    name: "Gold Plan",
    rate: "35% AFTER 2 Days",
    duration: "2 Days",
    min: "$1000",
    max: "$4999",
    referral: "3%",
  },
  {
    icon: BarChart3,
    name: "Forex Plan",
    rate: "80% AFTER 4 Days",
    duration: "4 Days",
    min: "$5000",
    max: "$10000",
    referral: "15%",
  },
];

export default function Plans() {
  return (
    <section
      id="plans"
      className="py-20 bg-gradient-to-b from-white to-blue-50 text-center"
    >
      <h2 className="text-4xl font-bold text-blue-800 mb-12">
        Investment Plans
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 gap-10 px-6">
        {plans.map((plan, i) => {
          const Icon = plan.icon;
          return (
            <div
              key={i}
              className="relative border border-gray-200 rounded-2xl p-8 shadow-sm bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <span className="flex items-center justify-center text-center mb-2.5 p-2 bg-blue-700 rounded-lg w-10 h-10 text-white absolute top-5 right-5">
                <Icon className="w-10 h-10 text-white" />
              </span>

              <div className="bg-blue-950 text-white py-4 px-5 rounded-lg mb-6">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
              </div>

              {/* Rate */}
              <p className="md:text-3xl text-xl font-bold text-blue-950 mb-4">
                {plan.rate}
              </p>
              {/* <p className="text-gray-500 text-sm mb-6">
              Duration: {plan.duration}
            </p> */}

              {/* Details */}
              <ul className="text-gray-700 text-md space-y-3 font-thin">
                <li className="border-t border-gray-200 pt-3">
                  Minimum :<span>{plan.min}</span>
                </li>
                <li className="border-t border-gray-200 pt-3">
                  Maximum :<span>{plan.max}</span>
                </li>
                <li className="border-y border-gray-200 pt-3 pb-3 ">
                  Referral Bonus: <span>{plan.referral}</span>
                </li>
              </ul>

              {/* CTA */}
              <button className="mt-8  bg-blue-600 text-white py-3 rounded-3xl font-semibold hover:bg-blue-700 transition-colors w-fit px-5">
                Get Started
              </button>

              {/* Highlight glow for premium look */}
              <div className="absolute inset-0 rounded-2xl border border-transparent hover:border-blue-300 transition-all pointer-events-none" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
