"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TransferPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  // Mock user balance (later replace with real API data)
  const [balance, setBalance] = useState(1240.75);

  const handleTransfer = () => {
    if (!recipient || !amount) {
      alert("Please fill all required fields");
      return;
    }

    const transferAmount = parseFloat(amount);

    if (transferAmount > balance) {
      alert("Insufficient balance");
      return;
    }

    // Simulate transfer
    setBalance((prev) => prev - transferAmount);
    alert(`Transfer of $${amount} sent to ${recipient}`);
    setRecipient("");
    setAmount("");
    setNote("");
  };

  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Transfer Money
          </h1>
        </motion.div>

        <p className="text-center text-slate-500 mb-10">
          Send funds securely to another user within the platform.
        </p>

        {/* Account Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-xl rounded-2xl p-6 mb-10 text-center">
            <h2 className="text-lg font-semibold">Available Balance</h2>
            <p className="text-4xl font-bold mt-2">${balance.toFixed(2)}</p>
            <p className="text-sm opacity-90 mt-1">Updated just now</p>
          </div>
        </motion.div>

        {/* Transfer Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white border border-slate-200 shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Recipient Username or Email
                </label>
                <Input
                  type="text"
                  placeholder="Enter recipient username or email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
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
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Note (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="Add a note or reference"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <Button
                onClick={handleTransfer}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 text-sm font-semibold"
              >
                Send Transfer
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="mt-10 text-center text-sm text-slate-500">
            ⚠️ Please ensure the recipient details are correct before confirming
            your transfer. Transactions cannot be reversed once completed.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
