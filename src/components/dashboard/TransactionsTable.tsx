// components/dashboard/TransactionsTable.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const sample = [
  { id: "TXN001", type: "Deposit", amount: 500, status: "Completed", date: "2025-10-10" },
  { id: "TXN002", type: "Investment", amount: 2000, status: "Pending", date: "2025-10-12" },
  { id: "TXN003", type: "Withdrawal", amount: 300, status: "Completed", date: "2025-10-15" },
];

export default function TransactionsTable() {
  const [search, setSearch] = useState("");
  const transactions = useMemo(() => sample.filter(t => t.id.includes(search) || t.type.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <div className="flex items-center gap-2">
          <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-2 py-1 text-sm" />
          <Button variant="ghost">Export</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Txn ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(tx => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>${tx.amount.toLocaleString()}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>{tx.date}</TableCell>
              <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
