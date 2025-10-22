"use client";

import * as React from "react";

interface SpecialPlan {
  name: string;
  rate: string;
  min: string;
  max: string;
  referral: string;
}

const specials: SpecialPlan[] = [
  { name: "Company Shares", rate: "120% AFTER 3 Days", min: "$5,000", max: "$15,000", referral: "3%" },
  { name: "Real Estate", rate: "205% AFTER 7 Days", min: "$10,000", max: "$50,000", referral: "5%" },
];

export default function SpecialPlans() {
  return (
    <section id="special" className="py-20 bg-gradient-to-b from-gray-50 to-white text-center">
      <h2 className="text-4xl font-bold text-blue-800 mb-12">Special Plans</h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2  sm:grid-cols-2 gap-10 px-6">
        {specials.map((plan, i) => (
          <div
            key={i}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-5 rounded-lg mb-6 flex items-center justify-center">
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
            </div>

            {/* Rate */}
            <p className="text-xl font-bold text-blue-950/100 mb-3">{plan.rate}</p>
            <p className="text-gray-500 text-sm mb-6">Exclusive high-yield opportunity</p>

            {/* Details */}
            <ul className="text-gray-700 text-md space-y-3">
              <li className="border-t border-gray-200 pt-3">
                Minimum Investment: <span className="font-medium">{plan.min}</span>
              </li>
              <li className="border-t border-gray-200 pt-3">
                Maximum Investment: <span className="font-medium">{plan.max}</span>
              </li>
              <li className="border-t border-gray-200 pt-3 pb-2">
                Referral Bonus: <span className="font-medium">{plan.referral}</span>
              </li>
            </ul>

            {/* CTA */}
            <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
              Get Started
            </button>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent hover:border-blue-300 transition-all pointer-events-none" />

            {/* Badge (optional) */}
            <span className="absolute -top-3 right-5 bg-blue-700 text-white text-xs px-3 py-1 rounded-full shadow-sm">
              Featured
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
