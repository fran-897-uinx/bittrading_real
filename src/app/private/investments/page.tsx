"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gem, Building, BarChart3, Coins, Crown } from "lucide-react";

export default function InvestmentPlans() {
  const plans = [
    {
      id: 1,
      name: "Silver Plan",
      desc: "Perfect for beginners starting their investment journey.",
      icon: <Gem className="w-8 h-8 text-gray-400" />,
      color: "from-gray-200 to-gray-400",
      price: "$500 - $2,000",
      roi: "5% Monthly",
      shadow: "shadow-gray-300/40",
    },
    {
      id: 2,
      name: "Gold Plan",
      desc: "Grow your wealth with steady, high-yield gold-backed returns.",
      icon: <Coins className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-300 to-yellow-600",
      price: "$2,000 - $10,000",
      roi: "8% Monthly",
      shadow: "shadow-yellow-400/50",
    },
    {
      id: 3,
      name: "Forex Plan",
      desc: "Tap into dynamic forex markets with expert-managed portfolios.",
      icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
      color: "from-blue-300 to-blue-700",
      price: "$5,000 - $20,000",
      roi: "12% Monthly",
      shadow: "shadow-blue-500/50",
    },
    {
      id: 4,
      name: "Company Shares",
      desc: "Own a piece of fast-growing companies with real equity stakes.",
      icon: <Building className="w-8 h-8 text-green-400" />,
      color: "from-green-300 to-emerald-700",
      price: "$10,000 - $50,000",
      roi: "15% Monthly",
      shadow: "shadow-green-400/50",
    },
    {
      id: 5,
      name: "Real Estate Plan",
      desc: "Premium access to high-value real estate investment projects.",
      icon: <Crown className="w-8 h-8 text-purple-400" />,
      color: "from-purple-400 via-pink-500 to-red-500",
      price: "$50,000+",
      roi: "20% Monthly",
      shadow: "shadow-purple-500/60",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          💠 Investment Plans
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Choose from our range of curated investment opportunities — the more advanced the plan, the more refined and “crystalized” it becomes.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card
                className={`relative overflow-hidden bg-gradient-to-br ${plan.color} text-white border-none ${plan.shadow} rounded-2xl transition-all hover:scale-[1.03] hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                <CardHeader className="relative z-10">
                  <div className="flex justify-center mb-4">{plan.icon}</div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-100">{plan.desc}</CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-2">
                  <p className="font-semibold">Investment Range: <span className="text-white/90">{plan.price}</span></p>
                  <p className="font-semibold">ROI: <span className="text-white/90">{plan.roi}</span></p>
                </CardContent>

                <CardFooter className="relative z-10 flex justify-center">
                  <Button
                    variant="secondary"
                    className="bg-white/90 text-slate-900 hover:bg-white"
                  >
                    Invest Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
