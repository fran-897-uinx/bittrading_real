"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { apiUrl } from "@/app/api/route";

interface DepositOption {
  name: string;
  image: string;
  description: string;
}

const depositOptions: DepositOption[] = [
  {
    name: "BITCOIN",
    image: "/bitcoin.jpg",
    description:
      "Secure and fast crypto payment — fund your wallet with Bitcoin and start earning instantly.",
  },
  {
    name: "USDT",
    image: "/usdt.jpg",
    description:
      "Stable and reliable — deposit in USDT to keep your investment steady against market volatility.",
  },
];

export default function DepositPage() {
  const [selected, setSelected] = useState<DepositOption | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}create_deposit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`💰 Deposit successful! Ref ID: ${data.reference_id}`);
        setAmount("");
        setSelected(null);
      } else {
        toast.error(data.message || "Deposit failed. Try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
          Fund Your Account
        </h1>
        <p className="text-slate-600 mb-12 text-lg">
          Choose your preferred payment option and start growing your
          investments today.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {depositOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden">
                <div className="relative w-full h-52">
                  <Image
                    src={option.image}
                    alt={option.name}
                    fill
                    className="object-contain p-6 scale-110"
                  />
                </div>

                <div className="p-6 text-center">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                    {option.name}
                  </h2>
                  <p className="text-slate-600 mb-6">{option.description}</p>
                  <Button
                    onClick={() => setSelected(option)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  >
                    Deposit with {option.name}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🪟 Deposit Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Deposit via {selected?.name}
            </DialogTitle>
            <DialogDescription className="text-slate-500 mt-1">
              Enter the amount you wish to deposit and confirm to proceed.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Input
              type="number"
              placeholder="Enter amount (USD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border-gray-300"
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleConfirmDeposit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              {loading ? "Processing..." : "Confirm Deposit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
