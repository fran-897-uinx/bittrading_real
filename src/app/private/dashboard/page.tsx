// app/private/dashboard/page.tsx

"use client";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import InvestmentsPanel from "@/components/dashboard/InvestmentsPanel";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { useState } from "react";
import { set } from "zod";
export default function DashboardPage() {
  async function CopyTOClipBoard() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
  const [copied, setCopied] = useState(false);
  const referralLink = "https://bittrading.com/refefrral?code=user";
  // const referralLink = `${window.location.origin}/referral?code=${user.refcode}`
  return (
    <div className="space-y-8">
      <DashboardOverview />

      <div className="lg:col-span-2 space-y-2 overflow-scroll overflow-y-hidden w-full md:overflow-hidden">
        <div className="space-y-0.5 pb-7 grid md:grid-cols-3 space-x-3 gap-2.5 items-center">
          {/* Right column: stats + quick actions */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-3xl font-semibold mb-2 font-mono">Account</h3>
            <p className="text-lg text-slate-600">
              Balance: <strong>$12,354.00</strong>
            </p>
            <p className="text-md text-slate-600">
              Active investments: <strong>3</strong>
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <button className="btn-primary cursor-pointer">
                New Deposit
              </button>
              <button className="btn-ghost cursor-pointer">
                Request Withdrawal
              </button>
              <button className="btn-ghost cursor-pointer">Open Support</button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow h-50 grid gap-3.5">
            <h3 className="text-lg font-semibold mb-2">Your Referral Link:</h3>
            <div className="gap-2">
              <span className="border p-2 mb-2.5">{referralLink}</span>
              <button
                className="btn-ghost btn-sm self-end mt-4 w-full cursor-copy"
                onClick={CopyTOClipBoard}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
        <InvestmentsPanel />
        <TransactionsTable />
      </div>
    </div>
  );
}
