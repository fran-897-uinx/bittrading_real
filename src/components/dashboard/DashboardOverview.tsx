// components/dashboard/DashboardOverview.tsx
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/private/layout";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { apiUrl } from "@/app/api/route";

// const kpi = [
//   { title: "Balance", value: "$12,354", diff: "+3.2%" },
//   { title: "Investments", value: "243,175", diff: "+1.1%" },
//   { title: "Deposits", value: "$6,715,101", diff: "+2.5%" },
//   { title: "Withdrawals", value: "$754,169,518", diff: "-0.2%" },
//   { title: "Referral", value: "$754", diff: "-0.2%" },
// ];

// const chartData = [
//   { name: "Jan", $: 4000 },
//   { name: "Feb", $: 3000 },
//   { name: "Mar", $: 5000 },
//   { name: "Apr", $: 4000 },
//   { name: "May", $: 6000 },
//   { name: "Jun", $: 7000 },
// ];

interface ActiveInvestment {
  id: number;
  plan: number;
  plan_name?: string;
  amount: number;
  roi: string;
  status: string;
  start_date?: string;
  end_date?: string;
}

interface ChartPoint {
  month: string;
  earning: number;
}

interface DashboardData {
  available_balance: number;
  total_earnings: number;
  total_withdrawals: number;
  total_investments: number;
  active_investments: ActiveInvestment[];
  total_deposits: number;
  chart_data: ChartPoint[];
}

export default function DashboardOverview() {
  const { user, loading } = useAuth();
  // const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loadingData, setLoadingData] = useState(true);

  // ✅ Show welcome popup once per session
  useEffect(() => {
    const shown = sessionStorage.getItem("welcome_shown");
    if (!shown) {
      setOpen(true);
      sessionStorage.setItem("welcome_shown", "true");
    }
  }, []);

  // ✅ Fetch Dashboard Data
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${apiUrl}dashboard-stats/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data: DashboardData = await res.json();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load dashboard data.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboard();
  }, []);

  // ✅ Loading state
  if (loading || loadingData) {
    return (
      <p className="p-6 text-center text-slate-600">Loading dashboard...</p>
    );
  }

  // ✅ Handle no user
  if (!user) {
    return (
      <div className="p-6 text-center text-slate-600">
        Could not load your account. Please{" "}
        <a href="/login" className="text-blue-600 underline">
          log in again
        </a>
        .
      </div>
    );
  }

  // ✅ Referral link
  // const referralLink = `${
  //   typeof window !== "undefined" ? window.location.origin : ""
  // }/referral?code=${user?.username}`;

  // const CopyToClipboard = async () => {
  //   try {
  //     await navigator.clipboard.writeText(referralLink);
  //     setCopied(true);
  //     toast.success("Referral link copied!");
  //     setTimeout(() => setCopied(false), 2000);
  //   } catch {
  //     toast.error("Failed to copy referral link.");
  //   }
  // };

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {dashboardData && (
        <>
          <Card className="p-4">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-500 ">Balance</div>
                  <div className="text-xl font-semibold text-green-700">
                    ${dashboardData.available_balance.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-green-500 border w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-orange-500 ">Investments</div>
                  <div className="text-xl font-semibold text-orange-700">
                    ${dashboardData.total_investments.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-green-500 border w-3 h-3 bg-orange-600 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-500">Deposit</div>
                  <div className="text-xl font-semibold text-blue-800">
                    ${dashboardData.total_deposits.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-green-500 border w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-red-500">Withdrawal</div>
                  <div className="text-xl font-semibold text-red-600">
                    ${dashboardData.total_withdrawals.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-green-500 border w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Chart card spans columns on small screens */}
      <Card className="md:col-span-4 col-span-full mt-2">
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={
                  dashboardData?.chart_data?.map((item) => ({
                    name: item.month,
                    earning: item.earning,
                  })) || []
                }
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="earning"
                  stroke="#3b82f6"
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
