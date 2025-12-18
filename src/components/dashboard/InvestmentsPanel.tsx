// components/dashboard/InvestmentsPanel.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gem, Coins, BarChart3, Building, Crown } from "lucide-react";
import InvestModal from "./InvestModal";

const plans = [
  {
    id: "silver",
    name: "Silver",
    roi: "20% AFTER 2 Days",
    range: "$100 - $999",
    icon: <Gem />,
  },
  {
    id: "gold",
    name: "Gold",
    roi: "33% AFTER 2 Days",
    range: "$1000 - $4999",
    icon: <Coins />,
  },
  {
    id: "forex",
    name: "Forex",
    roi: "80% AFTER 4 Days",
    range: "$5000 - $10000",
    icon: <BarChart3 />,
  },
  {
    id: "company",
    name: "Company Shares",
    roi: "120% AFTER 3 Days",
    range: "$5,000 - $15,000",
    icon: <Building />,
  },
  {
    id: "realestate",
    name: "Real Estate",
    roi: "205% AFTER 7 Days",
    range: "$10,000 - $50,000",
    icon: <Crown />,
  },
];

export default function InvestmentsPanel() {
  const [selected, setSelected] = useState<(typeof plans)[0] | null>(null);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Investment Plans</h3>
        <Button variant="ghost">View All</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      {p.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-slate-500">{p.roi}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">{p.range}</div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setSelected(p)}>Invest</Button>
                  <Button variant="ghost">Details</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <InvestModal plan={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
