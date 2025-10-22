// app/private/dashboard/page.tsx

"use client";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import InvestmentsPanel from "@/components/dashboard/InvestmentsPanel";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
export default function DashboardPage() {
  
  const [copied, setCopied] = useState(false);
  const referralLink = "https://bittrading.com/refefrral?code=user"
    // const referralLink = `${window.location.origin}/referral?code=${user.refcode}`
  return (
    <div className="space-y-8">
      <DashboardOverview />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <InvestmentsPanel />
          <TransactionsTable/>
        </div>
        <div className="space-y-6">
          {/* Right column: stats + quick actions */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <button className="btn-primary">New Deposit</button>
              <button className="btn-ghost">Request Withdrawal</button>
              <button className="btn-ghost">Open Support</button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Account</h3>
            <p className="text-sm text-slate-600">Balance: <strong>$12,354.00</strong></p>
            <p className="text-sm text-slate-600">Active investments: <strong>3</strong></p>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Your Referral Link:</h3>
            <div>
              <span>{referralLink}</span> 
              <CopyToClipboard text={referralLink} onCopy={() => setCopied(true)}>
                <button>
                  {copied? "Copied!" : "copy"}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
