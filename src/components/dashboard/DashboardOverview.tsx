// components/dashboard/DashboardOverview.tsx
"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const kpi = [
  { title: "Balance", value: "$12,354", diff: "+3.2%" },
  { title: "Investments", value: "243,175", diff: "+1.1%" },
  { title: "Deposits", value: "$6,715,101", diff: "+2.5%" },
  { title: "Withdrawals", value: "$754,169,518", diff: "-0.2%" },
  { title: "Referral", value: "$754", diff: "-0.2%" },
];

const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 7000 },
];

export default function DashboardOverview() {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {kpi.map((k) => (
        <Card key={k.title} className="p-4">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">{k.title}</div>
                <div className="text-xl font-semibold">{k.value}</div>
              </div>
              <div className="text-sm text-green-500">{k.diff}</div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Chart card spans columns on small screens */}
      <Card className="md:col-span-4 col-span-full mt-2">
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
