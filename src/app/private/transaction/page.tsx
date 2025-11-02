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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Transaction {
  id: number;
  transaction_type: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/transactions/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Failed to fetch transactions:", res.statusText);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setTransactions(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchTransactions();
  }, [token]);

  // 🔹 Filter by type or search
  useEffect(() => {
    let results = transactions;

    if (filterType !== "All") {
      results = results.filter(
        (t) => t.transaction_type.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (search.trim()) {
      results = results.filter((t) =>
        t.transaction_type.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(results);
  }, [filterType, search, transactions]);

  // 🔹 Status color function
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
    <div className="md:p-6 bg-gray-50 h-screen w-full p-3">
      <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm h-screen">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-2xl font-bold text-indigo-600">
            Transaction History
          </h2>

          <div className="flex flex-wrap gap-2">
            {["All", "Deposit", "Withdrawal"].map((type) => (
              <Button
                key={type}
                onClick={() => setFilterType(type)}
                variant={filterType === type ? "default" : "outline"}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 text-sm">
            View your deposit and withdrawal activity
          </p>
          <Input
            placeholder="Search transactions..."
            className="max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">
                      {tx.transaction_type}
                    </TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium">No transactions found 💸</p>
            <p className="text-sm text-gray-400 mt-2">
              Once you make deposits or withdrawals, they’ll appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
