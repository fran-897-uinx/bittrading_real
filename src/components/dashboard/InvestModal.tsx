// components/dashboard/InvestModal.tsx
"use client";

import React, { useEffect } from "react";
import { Dialog } from "@/components/ui/dialog"; // if you have dialog, otherwise simple panel
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Plan = { id: string; name: string; roi: string; range: string } | null;

export default function InvestModal({ plan, onClose }: { plan: Plan; onClose: () => void; }) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAmount("");
  }, [plan]);

  if (!plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call deposit API
    alert(`Investing ${amount} in ${plan.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 z-10">
        <h3 className="text-lg font-semibold mb-2">Invest in {plan.name}</h3>
        <p className="text-sm text-slate-500 mb-4">{plan.roi} · {plan.range}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Amount (USD)</label>
            <input value={amount} onChange={e => setAmount(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="1000" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Invest</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
