"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Plan = {
  id: number;
  name: string;
  amount: number;
  profit: number;
  duration: string;
  status: string;
};

export default function ActivePlansPage() {
  // Simulated user plans (replace with API later)
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 1,
      name: "Starter Plan",
      amount: 200,
      profit: 260,
      duration: "7 days",
      status: "Active",
    },
    {
      id: 2,
      name: "Pro Plan",
      amount: 500,
      profit: 750,
      duration: "14 days",
      status: "Active",
    },
  ]);

  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Active Investment Plans
            </h1>
            <p className="text-slate-500">
              Below are your currently active investment plans and their
              progress.
            </p>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.length > 0 ? (
              plans.map((plan, index) => (
                <div
                  key={plan.id}>
                  <Card className="border border-slate-200 shadow-md hover:shadow-xl rounded-2xl transition-all">
                    <CardHeader className="bg-blue-50 rounded-t-2xl">
                      <CardTitle className="text-lg text-slate-800">
                        {plan.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Amount Invested:</span>
                        <span className="font-semibold text-slate-700">
                          ${plan.amount}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Expected Profit:</span>
                        <span className="font-semibold text-green-600">
                          ${plan.profit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Duration:</span>
                        <span className="font-semibold text-slate-700">
                          {plan.duration}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Status:</span>
                        <span
                          className={`font-semibold ${
                            plan.status === "Active"
                              ? "text-blue-600"
                              : "text-slate-400"
                          }`}
                        >
                          {plan.status}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4 rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 py-10">
                You don’t have any active investments yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
