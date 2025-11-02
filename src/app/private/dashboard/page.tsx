"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/private/layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import InvestmentsPanel from "@/components/dashboard/InvestmentsPanel";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { toast } from "sonner";
import { apiUrl } from "@/app/api/route";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

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

interface DashboardData {
  available_balance: number;
  total_earnings: number;
  total_withdrawals: number;
  total_investments: number;
  active_investments: ActiveInvestment[];
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [copied, setCopied] = useState(false);
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
  const referralLink = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/referral?code=${user?.username}`;

  const CopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy referral link.");
    }
  };

  return (
    <div>
      <div className="space-y-10 pb-16">
        {/* ✅ Welcome dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                Welcome back, {user?.username} 👋
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 mt-2">
                Here’s your account summary and latest activity.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => setOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ✅ Stat cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Account Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                $
                {dashboardData
                  ? dashboardData.available_balance.toLocaleString()
                  : "0.00"}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Active Investments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-blue-600">
                {dashboardData ? dashboardData.active_investments.length : 0}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-green-600">
                  $
                  {dashboardData
                    ? dashboardData.total_earnings.toLocaleString()
                    : "0.00"}
                </div>
                <ArrowUpRight className="text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Total Withdrawals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-red-500">
                  $
                  {dashboardData
                    ? dashboardData.total_withdrawals.toLocaleString()
                    : "0.00"}
                </div>
                <ArrowDownRight className="text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Quick Actions + Referral */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                <Link href="/private/deposit">
                  New Deposit
                </Link>
              </Button>
              <Button variant="outline" className="rounded-full">
                Request Withdrawal
              </Button>
              <Button variant="outline" className="rounded-full">
                Transfer Funds
              </Button>
              <Button variant="outline" className="rounded-full">
                Open Support
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">
                Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="border rounded-md p-2 text-sm text-slate-600 truncate">
                {referralLink}
              </div>
              <Button
                onClick={CopyToClipboard}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-full"
              >
                {copied ? "Copied!" : "Copy Referral Link"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Additional Panels */}
        <DashboardOverview />
        <InvestmentsPanel />
        <TransactionsTable />
      </div>
    </div>
  );
}
