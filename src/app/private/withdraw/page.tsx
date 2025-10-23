"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [method, setMethod] = useState("Bitcoin");

  const handleWithdraw = () => {
    if (!wallet || !amount) {
      alert("Please fill in all fields");
      return;
    }
    alert(`Withdrawal of $${amount} requested via ${method}`);
    setAmount("");
    setWallet("");
    setMethod("Bitcoin");
  };

  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Withdraw Funds
          </h1>
          <p className="text-center text-slate-500 mb-8">
            Choose your preferred withdrawal method and confirm your request.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Withdrawal Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full border border-slate-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Bitcoin">Bitcoin (BTC)</option>
                  <option value="USDT">Tether (USDT - TRC20)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Wallet Address
                </label>
                <Input
                  type="text"
                  placeholder="Enter wallet address"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Amount (USD)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-sm"
                />
              </div>

              <Button
                onClick={handleWithdraw}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 text-sm font-semibold"
              >
                Withdraw Now
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="mt-10 text-center text-sm text-slate-500">
            ⚠️ Please double-check your wallet address before submitting your
            withdrawal. Transactions are irreversible.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
