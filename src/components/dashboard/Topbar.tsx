// components/dashboard/Topbar.tsx
"use client";

import React, { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  return (
    <header className="w-full border-b bg-white dark:bg-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-700 dark:text-slate-200">Dashboard</div>
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 rounded-md px-3 py-1">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search transactions, users..."
              className="bg-transparent ml-2 outline-none text-sm w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer" onClick={() => router.push("/private/profile")}>
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold">B</div>
            <div className="hidden md:block text-sm">
              <div>John Doe</div>
              <div className="text-xs text-slate-500">Pro</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
