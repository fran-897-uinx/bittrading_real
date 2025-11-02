"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { apiUrl } from "@/app/api/route";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [method, setMethod] = useState("Bitcoin");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // --- Confirm withdrawal (API call)
  const handleConfirmWithdraw = async () => {
    if (!amount || !wallet) {
      toast.error("Please fill in all fields.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}create_withdrawal/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          wallet_address: wallet,
          method,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          `💸 Withdrawal request submitted! Ref ID: ${data.reference_id}`
        );
        setAmount("");
        setWallet("");
      } else {
        toast.error(data.message || "Withdrawal failed. Try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
            Withdraw Your Funds
          </h1>
          <p className="text-center text-slate-500 mb-8">
            Choose your preferred withdrawal method and submit your request
            securely.
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
              {/* Method */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Withdrawal Method
                </label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="w-full border border-slate-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bitcoin">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="USDT">Tether (USDT - TRC20)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Wallet */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Wallet Address
                </label>
                <Input
                  type="text"
                  placeholder="Enter your wallet address"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="text-sm"
                />
              </div>

              {/* Amount */}
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
                onClick={() => setOpenDialog(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 text-sm font-semibold"
              >
                Proceed to Withdraw
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
            ⚠️ Double-check your wallet address — transactions are irreversible.
          </div>
        </motion.div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-800">
              Confirm Withdrawal
            </DialogTitle>
            <DialogDescription>
              Choose an account to connect and start syncing your data.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-slate-600">
            You’re about to withdraw{" "}
            <span className="font-semibold">${amount}</span> via{" "}
            <span className="font-semibold">{method}</span> to wallet:
            <p className="mt-2 break-all text-slate-800">{wallet}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmWithdraw}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
