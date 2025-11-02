"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface Transaction {
  id: number;
  transaction_type: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function WithdrawalsTable() {
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/transactions/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Failed to fetch withdrawals:", res.statusText);
          return;
        }

        const data = await res.json();

        // 🔹 Filter only withdrawal transactions
        const filtered = data
          .filter(
            (tx: Transaction) =>
              tx.transaction_type &&
              tx.transaction_type.toUpperCase() === "WITHDRAWAL"
          )
          .sort(
            (a: Transaction, b: Transaction) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        setWithdrawals(filtered);
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
      }
    };

    if (token) fetchWithdrawals();
  }, [token]);

  const visibleWithdrawals = withdrawals.slice(0, 7);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return "text-green-600 bg-green-50 px-2 py-1 rounded-md";
      case "PENDING":
        return "text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md";
      case "FAILED":
      case "DECLINED":
        return "text-red-600 bg-red-50 px-2 py-1 rounded-md";
      default:
        return "text-gray-600 bg-gray-50 px-2 py-1 rounded-md";
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-indigo-600">
        Withdrawal History
      </h3>

      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100 rounded-xl">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50 z-10">
            <TableRow>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visibleWithdrawals.length > 0 ? (
              visibleWithdrawals.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <TableCell>${tx.amount}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(tx.status)}>
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(tx.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  No withdrawals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
