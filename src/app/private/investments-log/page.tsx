"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface InvestmentLog {
  id: number;
  method: string;
  amount: number;
  wallet: string;
  date: string;
  status: "Pending" | "Completed" | "Failed";
}

export default function InvestmentLogsPage() {
  const [logs] = useState<InvestmentLog[]>([
    {
      id: 1,
      method: "Bitcoin",
      amount: 120,
      wallet: "bc1qxy...93kd",
      date: "2025-10-20",
      status: "Completed",
    },
    {
      id: 2,
      method: "USDT (TRC20)",
      amount: 85,
      wallet: "TA9sd...39Dk",
      date: "2025-10-19",
      status: "Pending",
    },
    {
      id: 3,
      method: "Bitcoin",
      amount: 50,
      wallet: "bc1r8...s9dE",
      date: "2025-10-15",
      status: "Failed",
    },
  ]);

  const statusColor = (status: InvestmentLog["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-50";
      case "Pending":
        return "text-yellow-600 bg-yellow-50";
      case "Failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBlockEnd: "2rem", textAlign: "center" }}
          //   className="mb-8 text-center"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Investment Logs
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Track all your investment requests and their statuses.
          </p>
        </motion.div>

        {/* Logs Table (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          //   className="hidden md:block"
        >
          <div className="hidden md:block">
            <div className="bg-white border border-slate-200 shadow-md rounded-2xl overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                  <tr>
                    <th className="py-3 px-6">Method</th>
                    <th className="py-3 px-6">Wallet</th>
                    <th className="py-3 px-6">Amount (USD)</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          style={{borderBlockStart: "1px", borderBlockColor:"slategray", transition :"all"}}
                    >
                      <td className="py-3 px-6 font-semibold text-slate-700">
                        {log.method}
                      </td>
                      <td className="py-3 px-6 text-slate-600">{log.wallet}</td>
                      <td className="py-3 px-6 font-medium text-blue-600">
                        ${log.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-slate-500">{log.date}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                            log.status
                          )}`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {logs.length === 0 && (
                <div className="text-center py-10 text-slate-500">
                  No Investments history found.
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Mobile Cards (Responsive) */}
        <div className="md:hidden space-y-4">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="border border-slate-200 rounded-xl shadow-sm p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-slate-700">{log.method}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                      log.status
                    )}`}
                  >
                    {log.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  <strong>Wallet:</strong> {log.wallet}
                </p>
                <p className="text-sm text-slate-600">
                  <strong>Amount:</strong> ${log.amount}
                </p>
                <p className="text-sm text-slate-500">
                  <strong>Date:</strong> {log.date}
                </p>
              </div>
            </motion.div>
          ))}

          {logs.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              No Investment history found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
