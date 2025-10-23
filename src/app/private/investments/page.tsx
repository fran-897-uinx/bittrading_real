"use client";

import { motion } from "framer-motion";
import { InvestmentCard } from "@/components/InvestmentsCards";

export default function InvestmentPage() {
  const plans = [
    {
      id: 1,
      name: "Real Estate Plan",
      rate: "20.00 USD",
      duration: "Every 48 Hours",
      min: "6,000.00 USD",
      max: "1,000,000.00 USD",
      times: "7 Times",
      capital: "Yes",
      affiliate: ["5%", "10%", "15%", "20%", "25%"],
    },
    {
      id: 2,
      name: "Company Shares",
      rate: "120.00 %",
      duration: "Every 72 Hours",
      min: "2,000.00 USD",
      max: "5,999.00 USD",
      times: "1 Time",
      capital: "Yes",
      affiliate: ["10%", "20%", "30%", "40%", "50%"],
    },
    {
      id: 3,
      name: "Forex Plan",
      rate: "80.00 %",
      duration: "Every 96 Hours",
      min: "1,000.00 USD",
      max: "3,000.00 USD",
      times: "1 Time",
      capital: "Yes",
      affiliate: ["5%", "10%", "15%", "20%", "30%"],
    },
    {
      id: 4,
      name: "Gold Plan",
      rate: "35.00 %",
      duration: "Every 48 Hours",
      min: "500.00 USD",
      max: "999.00 USD",
      times: "1 Time",
      capital: "Yes",
      affiliate: ["2%", "5%", "8%", "10%", "15%"],
    },
    {
      id: 5,
      name: "Silver Plan",
      rate: "20.00 %",
      duration: "Every Day",
      min: "30.00 USD",
      max: "499.00 USD",
      times: "1 Time",
      capital: "Yes",
      affiliate: ["8%", "12%", "16%", "20%", "30%"],
    },
  ];

  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-12">
            💠 Investment Plans
          </h1>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <InvestmentCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
